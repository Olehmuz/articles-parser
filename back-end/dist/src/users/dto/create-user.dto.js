"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserDtoSchema = void 0;
const zod_1 = require("zod");
const client_1 = require("@prisma/client");
exports.CreateUserDtoSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email(),
        name: zod_1.z.string().optional(),
        hashedPassword: zod_1.z.string(),
        role: zod_1.z.enum([client_1.Roles.USER, client_1.Roles.ADMIN]).optional()
    })
});
