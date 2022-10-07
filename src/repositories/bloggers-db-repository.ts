import {bloggersCollection, BloggerViewModelType} from "./db";

export const bloggersDBRepository = {
    async getBloggers(): Promise<BloggerViewModelType[]> {
        return bloggersCollection.find({}).toArray()
    },
    async createBlogger(newBlogger: BloggerViewModelType): Promise<BloggerViewModelType> {
        const result = bloggersCollection.insertOne(newBlogger)
        console.log(result)
        return newBlogger
    },
    /*НЕ УВЕРЕНА, ЧТО ПРАВИЛЬНО СДЕЛАЛА, КОГДА НАПИСАЛА UNDEFINED*/
    async getBloggerById(id: number): Promise<BloggerViewModelType | undefined | null> {
        let blogger: BloggerViewModelType | null = await bloggersCollection.findOne({id: id})
        return blogger
    },
    async updateBlogger(id: number, name: string, youtubeUrl: string): Promise<boolean> {
        const result = await bloggersCollection
            .updateOne({id: id}, {$set: {name: name, youtubeUrl: youtubeUrl}})
        return result.matchedCount === 1
    },
    async deleteBlogger(bloggerId: number): Promise<boolean> {
        const result = await bloggersCollection.deleteOne({id:bloggerId})
        return result.deletedCount === 1
    }
}

