import {postsDBRepository} from '../repositories/posts-db-repository'
import {PostViewModelType} from "../repositories/db";
import {bloggersDBRepository} from "../repositories/bloggers-db-repository";
import {bloggersService} from "./bloggers-service";
//ВИДИМО, НЕВЕРНО ИМПОРТИТЬ ИЗ БД, КОТОРАЯ В ПАМЯТИ



export const postsService = {
    async getPosts(): Promise<PostViewModelType[]> {
        return postsDBRepository.getPosts()
    },
    /*Не уверена, можно ли там либо объект, либо модельку*/
    async createPost(title: string, shortDescription: string, content: string, bloggerId: number): Promise <PostViewModelType | boolean | null> {
        const blogger = await bloggersService.getBloggerById(bloggerId)
        if (!blogger) {
            return null
        }
        const newPost = {
            id: +(new Date()),
            title: title,
            shortDescription: shortDescription,
            content: content,
            bloggerId: bloggerId,
            bloggerName: blogger.name
        }
        const isCreated = await postsDBRepository.createPost(newPost)
        if (isCreated) {
            return newPost
        } else {
            return null
        }
    },
    async getPostById(id: number): Promise <PostViewModelType | null> {
        return await postsDBRepository.getPostById(id)
    },
    async updatePost(id: number, title: string, shortDescription: string, content: string, bloggerId: number): Promise <boolean | null> {
        //const blogger = bloggers.find(bl => bl.id === bloggerId)
        const blogger = await bloggersService.getBloggerById(bloggerId)
        if (!blogger) {
            return null
        }
        return await postsDBRepository.updatePost(id, title, shortDescription, content, bloggerId)
    },
    async deletePost(id: number): Promise <boolean>{
        return await postsDBRepository.deletePost(id)
    },
    async getPostsForSpecificBlogger (bloggerId: number): Promise <PostViewModelType[]>{
        return postsDBRepository.getPostsForSpecificBlogger(bloggerId)
    },
    // async createPostForSpecificBlogger (title: string, shortDescription: string, content: string, bloggerId: number): Promise <PostViewModelType | boolean | null > {
    //     const blogger = await bloggersService.getBloggerById(bloggerId)
    //     if (!blogger) {
    //         return null
    //     }
    //     const newPost = {
    //         id: +(new Date()),
    //         title: title,
    //         shortDescription: shortDescription,
    //         content: content,
    //         bloggerId: bloggerId,
    //         bloggerName: blogger.name
    //     }
    //
    //     const createdPost = postsDBRepository.createPostForSpecificBlogger(newPost)
    //     return createdPost
    // }
}

