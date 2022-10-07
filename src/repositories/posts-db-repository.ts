import {bloggersCollection, BloggerViewModelType, postsCollection, PostViewModelType} from "./db";

export const postsDBRepository = {
    async getPosts(): Promise<PostViewModelType[]> {
        return postsCollection.find({}).toArray()
    },
    /*Не уверена, можно ли там либо объект, либо модельку*/
        async createPost(newPost: PostViewModelType): Promise <PostViewModelType | boolean> {
        try {
            await postsCollection.insertOne(newPost)
            return true
        } catch (e) {
            return false
        }



    },
    async getPostById(id: number): Promise <PostViewModelType | null> {
        let post = await postsCollection.findOne({id:id})
        if (post) {
            return post
        } else {
            return null
        }
    },
    async updatePost(id: number, title: string, shortDescription: string, content: string, bloggerId: number): Promise <boolean | null> {
        const post = await postsCollection
            .updateOne({id: id}, { $set: {
                    title: title,
                    shortDescription: shortDescription,
                    content: content,
                    bloggerId: bloggerId
                } })
        return post.matchedCount ===1
    },
    async deletePost(id: number): Promise <boolean>{
        const result = await postsCollection.deleteOne({id})
        return result.deletedCount === 1
    },
    async getPostsForSpecificBlogger (bloggerId: number): Promise<PostViewModelType[]>{
        return postsCollection.find({bloggerId}).toArray()
    },
    async createPostForSpecificBlogger (newPost: PostViewModelType): Promise<PostViewModelType | boolean> {
        const result = await postsCollection.insertOne(newPost)
        return newPost
    }

}

