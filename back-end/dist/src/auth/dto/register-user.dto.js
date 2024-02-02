"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterUserDtoSchema = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
exports.RegisterUserDtoSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email(),
        password: zod_1.z.string().min(8),
        role: zod_1.z.enum([client_1.Roles.ADMIN, client_1.Roles.USER]).optional()
    })
});
