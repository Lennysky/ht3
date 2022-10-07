import express, { Request, Response } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import {bloggersRouter} from "./routes/bloggers-router";
import {postsRouter} from "./routes/posts-router";
import {runDb} from "./repositories/db";

// создать экспресс-приложение
const app = express()

const corsMiddleware = cors();
app.use(corsMiddleware)
const jsonBodyMiddleware = bodyParser.json()
app.use(jsonBodyMiddleware)


const port = process.env.PORT || 3001

app.get('/', (req: Request, res: Response ) => {
    res.send('Hello: World!')
})

app.use('/bloggers', bloggersRouter)
app.use('/posts', postsRouter)


const startApp = async () => {
    await runDb()
    // стартануть приложение
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}

startApp()