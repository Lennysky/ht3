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
exports.bloggersRouter = void 0;
const express_1 = require("express");
const bloggers_service_1 = require("../domain/bloggers-service");
const auth_middleware_1 = require("../middlewares/auth-middleware");
const posts_service_1 = require("../domain/posts-service");
exports.bloggersRouter = (0, express_1.Router)({});
const errorsCollect = (message, field, errors) => {
    const error = {
        message: message,
        field: field
    };
    errors.push(error);
};
const errorResult = (errorsMessages, res, status) => {
    const errorResult = {
        errorsMessages: errorsMessages
    };
    res.status(status).send(errorResult);
};
exports.bloggersRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const foundBloggers = yield bloggers_service_1.bloggersService.getBloggers();
    res.send(foundBloggers);
}));
exports.bloggersRouter.post('/', auth_middleware_1.authValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let errors = [];
    const body = req.body;
    const reg = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");
    if (!body.name || typeof body.name !== 'string' || !body.name.trim() || body.name.length > 15) {
        errorsCollect('You should enter the valid name', 'name', errors);
    }
    if (!body.youtubeUrl || typeof body.youtubeUrl != 'string' || !body.youtubeUrl.trim() || body.youtubeUrl.length > 100 || !reg.test(body.youtubeUrl)) {
        errorsCollect('You should enter the valid youtube url', 'youtubeUrl', errors);
    }
    if (errors.length > 0) {
        errorResult(errors, res, 400);
    }
    else {
        const newBlogger = yield bloggers_service_1.bloggersService.createBlogger(body.name, body.youtubeUrl);
        res.status(201).send(newBlogger);
    }
}));
exports.bloggersRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const blogger = yield bloggers_service_1.bloggersService.getBloggerById(id);
    if (!id) {
        res.sendStatus(404);
        return;
    }
    if (!blogger) {
        res.sendStatus(404);
    }
    else {
        res.status(200).send(blogger);
    }
}));
exports.bloggersRouter.put('/:id', auth_middleware_1.authValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const errors = [];
    const body = req.body;
    const reg = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");
    const blogger = yield bloggers_service_1.bloggersService.updateBlogger(id, body.name, body.youtubeUrl);
    if (!body.name || !body.name.trim() || typeof body.name !== "string" || body.name.length > 15) {
        errorsCollect("You should enter the correct name", "name", errors);
    }
    if (!body.youtubeUrl || !body.youtubeUrl.trim() || typeof body.youtubeUrl !== 'string' || body.youtubeUrl.length > 100 || !reg.test(body.youtubeUrl)) {
        errorsCollect("You should enter the correct youtube url", "youtubeUrl", errors);
    }
    if (errors.length > 0) {
        errorResult(errors, res, 400);
    }
    if (!blogger) {
        res.sendStatus(404);
    }
    else {
        res.sendStatus(204);
    }
}));
exports.bloggersRouter.delete('/:id', auth_middleware_1.authValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const blogger = yield bloggers_service_1.bloggersService.deleteBlogger(id);
    if (!id) {
        res.sendStatus(404);
        return;
    }
    if (!blogger) {
        res.sendStatus(404);
        return;
    }
    else {
        res.sendStatus(204);
    }
}));
exports.bloggersRouter.get('/:bloggerId/posts', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bloggerId = parseInt(req.params.bloggerId);
    const posts = yield posts_service_1.postsService.getPostsForSpecificBlogger(bloggerId);
    res.send(posts);
    /*let bloggerId = bloggers.find*/
}));
exports.bloggersRouter.post('/:bloggerId/posts', auth_middleware_1.authValidationMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bloggerId = parseInt(req.params.bloggerId);
    const body = req.body;
    const newPost = yield posts_service_1.postsService.createPost(body.title, body.shortDescription, body.content, 
    //сюда нужно как-то всатвить из урльки блогер айди
    bloggerId);
    //TODO: доделать метод
    if (!newPost)
        return;
}));
//# sourceMappingURL=bloggers-router.js.map