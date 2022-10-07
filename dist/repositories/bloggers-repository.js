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
exports.bloggersRepository = exports.bloggers = void 0;
exports.bloggers = [
    { id: 1, name: "Lenko", youtubeUrl: "https://www.youtube.com/channel/UCkgXcNSMktRtfMiv64Pxo5g/videos" },
    { id: 2, name: "Dimych", youtubeUrl: "https://www.youtube.com/c/ITKAMASUTRA/videos" },
    { id: 3, name: "Humberman", youtubeUrl: "https://www.youtube.com/c/AndrewHubermanLab/videos" },
    { id: 4, name: "Goblin", youtubeUrl: "https://www.youtube.com/c/DmitryPuchkov/videos" },
    { id: 5, name: "Yamshchikov", youtubeUrl: "https://www.youtube.com/channel/UCQMteJvING2dzFIFbBYdipw/videos" }
];
const getLastId = (bloggersArray) => {
    let lastIndex = 0;
    bloggersArray.forEach(el => {
        if (el.id > lastIndex) {
            lastIndex = el.id;
        }
    });
    return lastIndex;
};
exports.bloggersRepository = {
    getBloggers() {
        return __awaiter(this, void 0, void 0, function* () {
            return exports.bloggers;
        });
    },
    createBlogger(name, youtubeUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const newBlogger = {
                id: getLastId(exports.bloggers) + 1,
                name: name,
                youtubeUrl: youtubeUrl
            };
            exports.bloggers.push(newBlogger);
            return newBlogger;
        });
    },
    /*НЕ УВЕРЕНА, ЧТО ПРАВИЛЬНО СДЕЛАЛА, КОГДА НАПИСАЛА UNDEFINED*/
    getBloggerById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const blogger = exports.bloggers.find(bl => bl.id === id);
            return blogger;
        });
    },
    updateBlogger(id, name, youtubeUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const blogger = exports.bloggers.find(bl => bl.id === id);
            if (!blogger) {
                return false;
            }
            else {
                blogger.name = name;
                blogger.youtubeUrl = youtubeUrl;
                return true;
            }
        });
    },
    deleteBlogger(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const blogger = exports.bloggers.find(bl => bl.id === id);
            if (!blogger) {
                return false;
            }
            else {
                const newBloggersArray = exports.bloggers.filter(bl => bl.id !== id);
                if (exports.bloggers.length > newBloggersArray.length) {
                    exports.bloggers = newBloggersArray;
                    return true;
                }
                return false;
            }
        });
    }
};
//# sourceMappingURL=bloggers-repository.js.map