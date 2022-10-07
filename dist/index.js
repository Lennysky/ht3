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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const bloggers_router_1 = require("./routes/bloggers-router");
const posts_router_1 = require("./routes/posts-router");
const db_1 = require("./repositories/db");
// создать экспресс-приложение
const app = (0, express_1.default)();
const corsMiddleware = (0, cors_1.default)();
app.use(corsMiddleware);
const jsonBodyMiddleware = body_parser_1.default.json();
app.use(jsonBodyMiddleware);
const port = process.env.PORT || 3001;
app.get('/', (req, res) => {
    res.send('Hello: World!');
});
app.use('/bloggers', bloggers_router_1.bloggersRouter);
app.use('/posts', posts_router_1.postsRouter);
const startApp = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_1.runDb)();
    // стартануть приложение
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
});
startApp();
//# sourceMappingURL=index.js.map