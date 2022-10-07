import {Router, Request, Response} from "express";
import { bloggersService} from "../domain/bloggers-service";
import {authValidationMiddleware} from "../middlewares/auth-middleware";
import {postsService} from "../domain/posts-service";
import {postsRouter} from "./posts-router";


export const bloggersRouter = Router({})

const errorsCollect = (message: string, field: string, errors: FieldErrorType[]) => {
    const error: FieldErrorType = {
        message: message,
        field: field
    }
    errors.push(error)
}

const errorResult = (errorsMessages: FieldErrorType[], res:Response, status:number) => {
    const errorResult: APIErrorResultType = {
        errorsMessages: errorsMessages
    }
    res.status(status).send(errorResult)
}

bloggersRouter.get('/',
    async (req: Request, res: Response) => {
    const foundBloggers = await bloggersService.getBloggers()
    res.send(foundBloggers)
})

bloggersRouter.post ('/',
    authValidationMiddleware,
    async (req: Request, res: Response) => {
    let errors: FieldErrorType[] = []
    const body = req.body

    const reg = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?")
    if (!body.name || typeof body.name !== 'string' || !body.name.trim() || body.name.length > 15) {
        errorsCollect('You should enter the valid name', 'name', errors)
    }
    if (!body.youtubeUrl || typeof  body.youtubeUrl != 'string' || !body.youtubeUrl.trim() || body.youtubeUrl.length > 100 || !reg.test(body.youtubeUrl)) {
        errorsCollect('You should enter the valid youtube url', 'youtubeUrl', errors)
    }
    if (errors.length > 0) {
        errorResult(errors, res, 400)
    } else {
        const newBlogger = await bloggersService.createBlogger(body.name, body.youtubeUrl)
        res.status(201).send(newBlogger)
    }
})

bloggersRouter.get('/:id',
    async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    const blogger = await bloggersService.getBloggerById(id)
    if (!id) {
        res.sendStatus(404)
        return
    }
    if (!blogger) {
        res.sendStatus(404)
    } else {
       res.status(200).send(blogger)
    }
})

bloggersRouter.put('/:id',
    authValidationMiddleware,
    async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    const errors: FieldErrorType[] = []
    const body = req.body
    const reg = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?")
    const blogger = await bloggersService.updateBlogger(id, body.name, body.youtubeUrl)
    if (!body.name || !body.name.trim() || typeof body.name !== "string" || body.name.length > 15) {
        errorsCollect("You should enter the correct name", "name", errors)
    }
    if (!body.youtubeUrl || !body.youtubeUrl.trim() || typeof body.youtubeUrl !== 'string' || body.youtubeUrl.length > 100 || !reg.test(body.youtubeUrl)) {
        errorsCollect("You should enter the correct youtube url", "youtubeUrl", errors)
    }
    if (errors.length > 0) {
        errorResult(errors, res, 400)
    }
    if (!blogger) {
        res.sendStatus(404)
    } else {
        res.sendStatus(204)
    }
})

bloggersRouter.delete ('/:id',
    authValidationMiddleware,
    async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    const blogger = await bloggersService.deleteBlogger(id)
    if (!id) {
        res.sendStatus(404)
        return
    }
    if (!blogger) {
        res.sendStatus(404)
        return
    } else {
        res.sendStatus(204)
    }
})

bloggersRouter.get('/:bloggerId/posts',
    async (req: Request, res: Response) => {
        const bloggerId = parseInt(req.params.bloggerId);
        const posts = await postsService.getPostsForSpecificBlogger(bloggerId)
        res.send(posts)
        /*let bloggerId = bloggers.find*/
    })

bloggersRouter.post('/:bloggerId/posts',
    authValidationMiddleware,
    async (req: Request, res: Response) => {
        const bloggerId = parseInt(req.params.bloggerId);
        const body = req.body;
        const newPost = await postsService.createPost(
            body.title,
            body.shortDescription,
            body.content,
            //сюда нужно как-то всатвить из урльки блогер айди
            bloggerId)
        //TODO: доделать метод
        if (!newPost) return
    })

type FieldErrorType = {
    message: string
    field: string
}

type APIErrorResultType = {
    errorsMessages: FieldErrorType[]
}