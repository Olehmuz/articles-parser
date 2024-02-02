"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserDtoSchema = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
exports.UpdateUserDtoSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email().optional(),
        name: zod_1.z.string().optional(),
        hashedPassword: zod_1.z.string().optional(),
        role: zod_1.z.enum([client_1.Roles.USER, client_1.Roles.ADMIN]).optional()
    })
});
