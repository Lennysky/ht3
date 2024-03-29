import {bloggers} from './bloggers-in-memory-repository'

let posts: PostViewModelType[] = [
    {
        id: 1,
        title: 'Some awesome video',
        shortDescription: "New awesome video",
        content: 'Some content2',
        bloggerId: 2,
        bloggerName: 'Lenko'
    },
    {
        id: 2,
        title: 'Back video',
        shortDescription: 'New video about back',
        content: 'Some content1',
        bloggerId: 1,
        bloggerName: 'Dimych'
    },
    {
        id: 3,
        title: 'Health video',
        shortDescription: 'New video about health',
        content: 'Some content3',
        bloggerId: 3,
        bloggerName: 'Huberman'
    },
    {
        id: 4,
        title: 'History video',
        shortDescription: 'New video about history',
        content: 'Some content4',
        bloggerId: 4,
        bloggerName: 'Goblin'
    },
    {
        id: 5,
        title: 'AI video',
        shortDescription: 'New AI video',
        content: 'Some content5',
        bloggerId: 5,
        bloggerName: 'Yamshchikov'
    }
]

const getLastId = (bloggersArray: PostViewModelType[]) => {
    let lastIndex = 0;
    bloggersArray.forEach(el => {
        if(el.id > lastIndex){
            lastIndex = el.id
        }
    })
    return lastIndex
}

export const postsDBRepository = {
    getPosts() {
        return posts
    },
    createPost(title: string, shortDescription: string, content: string, bloggerId: number) {
        const blogger = bloggers.find(bl => bl.id === bloggerId)
        if (!blogger) {
            return false
        }
        const newPost = {
            id: getLastId(posts) + 1,
            title: title,
            shortDescription: shortDescription,
            content: content,
            bloggerId: bloggerId,
            bloggerName: blogger.name
        }
        posts.push(newPost)
        return newPost
    },
    getPostById(id: number) {
        const post = posts.find(p => p.id === id)
        return post;
    },
    updatePost(id: number, title: string, shortDescription: string, content: string, bloggerId: number) {
        const blogger = bloggers.find(bl => bl.id === bloggerId)
        const post = posts.find(p => p.id === id)
        if (!blogger) {
            return null
        }
        if (!post) {
            return false
        }
        post.title = title;
        post.shortDescription = shortDescription;
        post.content = content;
        post.bloggerId = bloggerId;
        post.bloggerName = blogger.name;
        return true
    },
    deletePost(id: number){
        const post = posts.find(p => p.id === id)
        if (!post) {
            return false
        }
        const newPostsArray = posts.filter(p => p.id !== id)
        if (newPostsArray < posts) {
            posts = newPostsArray
            return true
        }
        return false
    }
}

type PostViewModelType = {
    id: number
    title: string
    shortDescription: string
    content: string
    bloggerId: number
    bloggerName: string
}