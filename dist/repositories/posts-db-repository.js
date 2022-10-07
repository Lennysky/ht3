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
exports.postsDBRepository = void 0;
const db_1 = require("./db");
exports.postsDBRepository = {
    getPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            return db_1.postsCollection.find({}).toArray();
        });
    },
    /*Не уверена, можно ли там либо объект, либо модельку*/
    createPost(newPost) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield db_1.postsCollection.insertOne(newPost);
                return true;
            }
            catch (e) {
                return false;
            }
        });
    },
    getPostById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let post = yield db_1.postsCollection.findOne({ id: id });
            if (post) {
                return post;
            }
            else {
                return null;
            }
        });
    },
    updatePost(id, title, shortDescription, content, bloggerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield db_1.postsCollection
                .updateOne({ id: id }, { $set: {
                    title: title,
                    shortDescription: shortDescription,
                    content: content,
                    bloggerId: bloggerId
                } });
            return post.matchedCount === 1;
        });
    },
    deletePost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.postsCollection.deleteOne({ id });
            return result.deletedCount === 1;
        });
    },
    getPostsForSpecificBlogger(bloggerId) {
        return __awaiter(this, void 0, void 0, function* () {
            return db_1.postsCollection.find({ bloggerId }).toArray();
        });
    },
    createPostForSpecificBlogger(newPost) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.postsCollection.insertOne(newPost);
            return newPost;
        });
    }
};
//# sourceMappingURL=posts-db-repository.js.map