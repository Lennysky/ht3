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
exports.bloggersDBRepository = void 0;
const db_1 = require("./db");
exports.bloggersDBRepository = {
    getBloggers() {
        return __awaiter(this, void 0, void 0, function* () {
            return db_1.bloggersCollection.find({}).toArray();
        });
    },
    createBlogger(newBlogger) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = db_1.bloggersCollection.insertOne(newBlogger);
            console.log(result);
            return newBlogger;
        });
    },
    /*НЕ УВЕРЕНА, ЧТО ПРАВИЛЬНО СДЕЛАЛА, КОГДА НАПИСАЛА UNDEFINED*/
    getBloggerById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let blogger = yield db_1.bloggersCollection.findOne({ id: id });
            return blogger;
        });
    },
    updateBlogger(id, name, youtubeUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.bloggersCollection
                .updateOne({ id: id }, { $set: { name: name, youtubeUrl: youtubeUrl } });
            return result.matchedCount === 1;
        });
    },
    deleteBlogger(bloggerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield db_1.bloggersCollection.deleteOne({ id: bloggerId });
            return result.deletedCount === 1;
        });
    }
};
//# sourceMappingURL=bloggers-db-repository.js.map