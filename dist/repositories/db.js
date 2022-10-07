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
exports.runDb = exports.postsCollection = exports.bloggersCollection = void 0;
const mongodb_1 = require("mongodb");
const mongoUri = process.env.mongoURI || "mongodb://0.0.0.0:27017/?maxPoolSize=20$w=majority";
const client = new mongodb_1.MongoClient(mongoUri);
const db = client.db("myApp");
exports.bloggersCollection = db.collection("bloggers");
exports.postsCollection = db.collection("posts");
function runDb() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Подключить клиента к серверу
            yield client.connect();
            // Установить и проверить связь
            yield client.db("").command({ ping: 1 });
            console.log("Connected successfully to mongo server");
        }
        catch (_a) {
            console.log("Can't connect to db");
            // Убеждаемся, что клиент закроется, когда мы закончим, либо будет ошибка
            yield client.close();
        }
    });
}
exports.runDb = runDb;
//# sourceMappingURL=db.js.map