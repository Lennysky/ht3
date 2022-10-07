import {MongoClient} from 'mongodb'

const mongoUri =
    process.env.mongoURI || "mongodb://0.0.0.0:27017/?maxPoolSize=20$w=majority";

const client = new MongoClient(mongoUri);
const db = client.db("myApp");
export const bloggersCollection = db.collection<BloggerViewModelType>("bloggers")
export const postsCollection = db.collection<PostViewModelType>("posts")

export async function runDb() {
    try {
        // Подключить клиента к серверу
        await client.connect();
        // Установить и проверить связь
        await client.db("").command({ ping: 1 });
        console.log("Connected successfully to mongo server")
    } catch {
        console.log("Can't connect to db");
        // Убеждаемся, что клиент закроется, когда мы закончим, либо будет ошибка
        await client.close();
    }
}

export type BloggerViewModelType = {
    id: number
    name: string
    youtubeUrl: string
}

export type PostViewModelType = {
    id: number
    title: string
    shortDescription: string
    content: string
    bloggerId: number
    bloggerName: string
}