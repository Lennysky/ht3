import {Router, Request, Response} from "express";
import {postsService} from "../domain/posts-service";
import {type} from "os";
import {authValidationMiddleware} from "../middlewares/auth-middleware";
import {bloggersRouter} from "./bloggers-router";
import {bloggersService} from "../domain/bloggers-service";

export const postsRouter = Router({})

const errorsCollect = (message: string, field: string, errors: FieldErrorType[]) => {
    const error: FieldErrorType = {
        message: message,
        field: field
    }
    errors.push(error)
}

const errorsResponse = (res: Response, errorsMessages: FieldErrorType[], status: number) => {
    const errorResponse: APIErrorResultType = {
        errorsMessages: errorsMessages
    }
    res.status(status).send(errorResponse)
}


postsRouter.get('/', async (req: Request, res: Response) => {
    const posts = await postsService.getPosts()
    res.send(posts)
})

postsRouter.post('/',
    authValidationMiddleware,
    async (req: Request, res: Response) => {
        const errors: FieldErrorType[] = []
        const body = req.body
        if (!body.title || !body.title.trim() || typeof body.title !== 'string' || body.title.length > 30) {
            errorsCollect("Your title should be correct", "title", errors)
        }
        if (!body.shortDescription || !body.shortDescription.trim() || typeof body.shortDescription !== 'string' || body.shortDescription.length > 100) {
            errorsCollect("You short description should be correct", "shortDescription", errors)
        }
        if (!body.content || !body.content.trim() || typeof body.content !== 'string' || body.content.length > 1000) {
            errorsCollect("You should enter the correct content", "content", errors)
        }
        if (body.bloggerId) {
            const isBloggerCreated = await bloggersService.getBloggerById(body.bloggerId)
            if (!isBloggerCreated) {
                errorsCollect("You should enter the correct bloggerId", "bloggerId", errors)
            }
        }
        if (errors.length > 0) {
            errorsResponse(res, errors, 400)
        }
        else {
            const newPost = await postsService
                .createPost(
                    body.title,
                    body.shortDescription,
                    body.content,
                    body.bloggerId)
            if (!newPost) {
                res.send(404)
                console.log("dfs")

                /*errorsCollect("You should enter correct blogger Id", "bloggerId", errors)
                errorsResponse(res, errors, 400)*/
            }
            // if (newPost === null) {
            //     errorsCollect("You should enter correct blogger Id", "bloggerId", errors)
            //     errorsResponse(res, errors, 400)
            // }
            //
            // res.status(201).send(newPost)
        }
    })

postsRouter.get('/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    const post = await postsService.getPostById(id)
    if (!id) {
        res.sendStatus(404)
        return
    }
    if (!post) {
        res.sendStatus(404)
    } else {
        res.status(200).send(post)
    }
})

postsRouter.put('/id',
    authValidationMiddleware,
    async (req: Request, res: Response) => {
        const id = parseInt(req.params.id)
        const body = req.body
        const errors: FieldErrorType[] = []
        const isUpdated = await postsService.updatePost(id, body.title, body.shortDescription, body.content, body.bloggerId)
        if (id) {
            res.sendStatus(404)
            return
        }
        if (!body.title || !body.title.trim() || typeof body.title !== 'string' || body.title.length > 30) {
            errorsCollect("You should enter the correct title", "title", errors)
        }
        if (!body.shortDescription || !body.shortDescription.trim() || typeof body.shortDescription !== 'string' || body.shortDescription > 100) {
            errorsCollect("You should enter the correct short description", "shortDescription", errors)
        }
        if (!body.content || !body.content.trim() || typeof body.content !== 'string' || body.content.length > 1000) {
            errorsCollect("You shold enter the correct content", "content", errors)
        }
        if (errors.length > 0) {
            errorsResponse(res, errors, 400)
        }
        if (isUpdated === false) {
            res.sendStatus(404)
            return;
        }
        if (isUpdated === null) {
            errorsCollect("Your should enter the correct blogger Id", "bloggerId", errors)
            errorsResponse(res, errors, 400)
        } else {
            res.status(204).send()
        }
    })

postsRouter.delete('/:id',
    authValidationMiddleware,
    async (req: Request, res: Response) => {
        const id = parseInt(req.params.id)
        if (!id) {
            res.sendStatus(404)
            return
        }
        const isDeleted = await postsService.deletePost(id)
        if (!isDeleted) {
            res.sendStatus(404)
        }
        res.sendStatus(204)
    })


type FieldErrorType = {
    message: string
    field: string
}

type APIErrorResultType = {
    errorsMessages: FieldErrorType[]
}


