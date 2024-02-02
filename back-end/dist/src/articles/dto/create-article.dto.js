"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateArticleDtoSchema = void 0;
const zod_1 = require("zod");
exports.CreateArticleDtoSchema = zod_1.z.object({
    body: zod_1.z.object({
        articleId: zod_1.z.string().optional(),
        createdAt: zod_1.z.date().optional(),
        title: zod_1.z.string().min(1, "Title can't be empty"),
        content: zod_1.z.string().min(1, "Content can't be empty"),
        link: zod_1.z.string().min(1, "Link can't be empty"),
        author: zod_1.z.string().min(1, "Author can't be empty")
    })
});
