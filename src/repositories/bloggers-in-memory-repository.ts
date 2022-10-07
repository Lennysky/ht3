export let bloggers: BloggerViewModelType[] = [
    {id: 1, name: "Lenko", youtubeUrl: "https://www.youtube.com/channel/UCkgXcNSMktRtfMiv64Pxo5g/videos"},
    {id: 2, name: "Dimych", youtubeUrl: "https://www.youtube.com/c/ITKAMASUTRA/videos"},
    {id: 3, name: "Humberman", youtubeUrl: "https://www.youtube.com/c/AndrewHubermanLab/videos"},
    {id: 4, name: "Goblin", youtubeUrl: "https://www.youtube.com/c/DmitryPuchkov/videos"},
    {id: 5, name: "Yamshchikov", youtubeUrl: "https://www.youtube.com/channel/UCQMteJvING2dzFIFbBYdipw/videos"}
]

const getLastId = (bloggersArray: BloggerViewModelType[]) => {
    let lastIndex = 0;
    bloggersArray.forEach(el => {
            if (el.id > lastIndex) {
                lastIndex = el.id
            }
        })
    return lastIndex
}

export const bloggersInMemoryRepository = {
    async getBloggers(): Promise <BloggerViewModelType[]> {
        return bloggers
    },
    async createBlogger(name: string, youtubeUrl: string): Promise <BloggerViewModelType> {
        const newBlogger: BloggerViewModelType = {
            id: getLastId(bloggers) + 1,
            name: name,
            youtubeUrl: youtubeUrl
        }
        bloggers.push(newBlogger)
        return newBlogger
    },
    /*НЕ УВЕРЕНА, ЧТО ПРАВИЛЬНО СДЕЛАЛА, КОГДА НАПИСАЛА UNDEFINED*/
    async getBloggerById(id: number): Promise <BloggerViewModelType | undefined> {
        const blogger = bloggers.find(bl => bl.id === id)
        return blogger
    },
    async updateBlogger(id: number, name: string, youtubeUrl: string): Promise <boolean> {
        const blogger = bloggers.find(bl => bl.id === id)
        if (!blogger) {
            return false
        } else {
            blogger.name = name
            blogger.youtubeUrl = youtubeUrl
            return true
        }
    },
    async deleteBlogger(id: number): Promise <boolean> {
        const blogger = bloggers.find(bl => bl.id === id)
        if (!blogger) {
            return false
        } else {
            const newBloggersArray = bloggers.filter(bl => bl.id !== id)
            if (bloggers.length > newBloggersArray.length) {
                bloggers = newBloggersArray
                return true
            }
            return false
        }
    }
}

type BloggerViewModelType = {
    id: number
    name: string
    youtubeUrl: string
}