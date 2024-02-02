"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateArticleDtoSchema = void 0;
const zod_1 = require("zod");
exports.UpdateArticleDtoSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(1, "Title can't be empty").optional(),
        content: zod_1.z.string().min(1, "Content can't be empty").optional(),
        link: zod_1.z.string().min(1, "Link can't be empty").optional(),
        author: zod_1.z.string().min(1, "Author can't be empty").optional()
    })
});
