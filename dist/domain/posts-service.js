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
exports.postsService = void 0;
const posts_db_repository_1 = require("../repositories/posts-db-repository");
const bloggers_service_1 = require("./bloggers-service");
//ВИДИМО, НЕВЕРНО ИМПОРТИТЬ ИЗ БД, КОТОРАЯ В ПАМЯТИ
exports.postsService = {
    getPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            return posts_db_repository_1.postsDBRepository.getPosts();
        });
    },
    /*Не уверена, можно ли там либо объект, либо модельку*/
    createPost(title, shortDescription, content, bloggerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const blogger = yield bloggers_service_1.bloggersService.getBloggerById(bloggerId);
            if (!blogger) {
                return null;
            }
            const newPost = {
                id: +(new Date()),
                title: title,
                shortDescription: shortDescription,
                content: content,
                bloggerId: bloggerId,
                bloggerName: blogger.name
            };
            const isCreated = yield posts_db_repository_1.postsDBRepository.createPost(newPost);
            if (isCreated) {
                return newPost;
            }
            else {
                return null;
            }
        });
    },
    getPostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield posts_db_repository_1.postsDBRepository.getPostById(id);
        });
    },
    updatePost(id, title, shortDescription, content, bloggerId) {
        return __awaiter(this, void 0, void 0, function* () {
            //const blogger = bloggers.find(bl => bl.id === bloggerId)
            const blogger = yield bloggers_service_1.bloggersService.getBloggerById(bloggerId);
            if (!blogger) {
                return null;
            }
            return yield posts_db_repository_1.postsDBRepository.updatePost(id, title, shortDescription, content, bloggerId);
        });
    },
    deletePost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield posts_db_repository_1.postsDBRepository.deletePost(id);
        });
    },
    getPostsForSpecificBlogger(bloggerId) {
        return __awaiter(this, void 0, void 0, function* () {
            return posts_db_repository_1.postsDBRepository.getPostsForSpecificBlogger(bloggerId);
        });
    },
    // async createPostForSpecificBlogger (title: string, shortDescription: string, content: string, bloggerId: number): Promise <PostViewModelType | boolean | null > {
    //     const blogger = await bloggersService.getBloggerById(bloggerId)
    //     if (!blogger) {
    //         return null
    //     }
    //     const newPost = {
    //         id: +(new Date()),
    //         title: title,
    //         shortDescription: shortDescription,
    //         content: content,
    //         bloggerId: bloggerId,
    //         bloggerName: blogger.name
    //     }
    //
    //     const createdPost = postsDBRepository.createPostForSpecificBlogger(newPost)
    //     return createdPost
    // }
};
//# sourceMappingURL=posts-service.js.map