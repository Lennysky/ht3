"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRouter = void 0;
const express_1 = require("express");
const posts_service_1 = require("../domain/posts-service");
const auth_middleware_1 = require("../middlewares/auth-middleware");
const bloggers_service_1 = require("../domain/bloggers-service");
exports.postsRouter = (0, express_1.Router)({});
const errorsCollect = (message, field, errors) => {
    const error = {
        message: message,
        field: field
    };
    errors.push(error);
};
const errorsResponse = (res, errorsMessages, status) => {
    const errorResponse = {
        errorsMessages: errorsMessages
    };
    res.status(status).send(errorResponse);
};
exports.postsRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield posts_service_1.postsService.getPosts();
    res.send(posts);
}));
exports.postsRouter.post('/', auth_middleware_1.authValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = [];
    const body = req.body;
    if (!body.title || !body.title.trim() || typeof body.title !== 'string' || body.title.length > 30) {
        errorsCollect("Your title should be correct", "title", errors);
    }
    if (!body.shortDescription || !body.shortDescription.trim() || typeof body.shortDescription !== 'string' || body.shortDescription.length > 100) {
        errorsCollect("You short description should be correct", "shortDescription", errors);
    }
    if (!body.content || !body.content.trim() || typeof body.content !== 'string' || body.content.length > 1000) {
        errorsCollect("You should enter the correct content", "content", errors);
    }
    if (body.bloggerId) {
        const isBloggerCreated = yield bloggers_service_1.bloggersService.getBloggerById(body.bloggerId);
        if (!isBloggerCreated) {
            errorsCollect("You should enter the correct bloggerId", "bloggerId", errors);
        }
    }
    if (errors.length > 0) {
        errorsResponse(res, errors, 400);
    }
    else {
        const newPost = yield posts_service_1.postsService
            .createPost(body.title, body.shortDescription, body.content, body.bloggerId);
        if (!newPost) {
            res.send(404);
            console.log("dfs");
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
}));
exports.postsRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const post = yield posts_service_1.postsService.getPostById(id);
    if (!id) {
        res.sendStatus(404);
        return;
    }
    if (!post) {
        res.sendStatus(404);
    }
    else {
        res.status(200).send(post);
    }
}));
exports.postsRouter.put('/id', auth_middleware_1.authValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const body = req.body;
    const errors = [];
    const isUpdated = yield posts_service_1.postsService.updatePost(id, body.title, body.shortDescription, body.content, body.bloggerId);
    if (id) {
        res.sendStatus(404);
        return;
    }
    if (!body.title || !body.title.trim() || typeof body.title !== 'string' || body.title.length > 30) {
        errorsCollect("You should enter the correct title", "title", errors);
    }
    if (!body.shortDescription || !body.shortDescription.trim() || typeof body.shortDescription !== 'string' || body.shortDescription > 100) {
        errorsCollect("You should enter the correct short description", "shortDescription", errors);
    }
    if (!body.content || !body.content.trim() || typeof body.content !== 'string' || body.content.length > 1000) {
        errorsCollect("You shold enter the correct content", "content", errors);
    }
    if (errors.length > 0) {
        errorsResponse(res, errors, 400);
    }
    if (isUpdated === false) {
        res.sendStatus(404);
        return;
    }
    if (isUpdated === null) {
        errorsCollect("Your should enter the correct blogger Id", "bloggerId", errors);
        errorsResponse(res, errors, 400);
    }
    else {
        res.status(204).send();
    }
}));
exports.postsRouter.delete('/:id', auth_middleware_1.authValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    if (!id) {
        res.sendStatus(404);
        return;
    }
    const isDeleted = yield posts_service_1.postsService.deletePost(id);
    if (!isDeleted) {
        res.sendStatus(404);
    }
    res.sendStatus(204);
}));
//# sourceMappingURL=posts-router.js.map