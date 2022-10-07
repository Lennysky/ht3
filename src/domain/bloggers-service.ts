import {bloggersDBRepository} from '../repositories/bloggers-db-repository'
import {BloggerViewModelType} from "../repositories/db";


export const bloggersService = {
    async getBloggers(): Promise<BloggerViewModelType[]> {
        return bloggersDBRepository.getBloggers()
    },
    async createBlogger(name: string, youtubeUrl: string): Promise<BloggerViewModelType> {
        const newBlogger: BloggerViewModelType = {
            id: +(new Date()),
            name: name,
            youtubeUrl: youtubeUrl
        }
        const createdBlogger = bloggersDBRepository.createBlogger(newBlogger)
        return createdBlogger
    },
    /*НЕ УВЕРЕНА, ЧТО ПРАВИЛЬНО СДЕЛАЛА, КОГДА НАПИСАЛА UNDEFINED*/
    async getBloggerById(id: number): Promise<BloggerViewModelType | undefined | null> {
        return bloggersDBRepository.getBloggerById(id)
    },
    async updateBlogger(id: number, name: string, youtubeUrl: string): Promise<boolean> {
        return bloggersDBRepository.updateBlogger(id, name, youtubeUrl)
    },
    async deleteBlogger(id: number): Promise<boolean> {
        return bloggersDBRepository.deleteBlogger(id)
    }
}

