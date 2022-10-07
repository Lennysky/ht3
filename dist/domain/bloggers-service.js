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
exports.bloggersService = void 0;
const bloggers_db_repository_1 = require("../repositories/bloggers-db-repository");
exports.bloggersService = {
    getBloggers() {
        return __awaiter(this, void 0, void 0, function* () {
            return bloggers_db_repository_1.bloggersDBRepository.getBloggers();
        });
    },
    createBlogger(name, youtubeUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const newBlogger = {
                id: +(new Date()),
                name: name,
                youtubeUrl: youtubeUrl
            };
            const createdBlogger = bloggers_db_repository_1.bloggersDBRepository.createBlogger(newBlogger);
            return createdBlogger;
        });
    },
    /*НЕ УВЕРЕНА, ЧТО ПРАВИЛЬНО СДЕЛАЛА, КОГДА НАПИСАЛА UNDEFINED*/
    getBloggerById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return bloggers_db_repository_1.bloggersDBRepository.getBloggerById(id);
        });
    },
    updateBlogger(id, name, youtubeUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            return bloggers_db_repository_1.bloggersDBRepository.updateBlogger(id, name, youtubeUrl);
        });
    },
    deleteBlogger(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return bloggers_db_repository_1.bloggersDBRepository.deleteBlogger(id);
        });
    }
};
//# sourceMappingURL=bloggers-service.js.map