"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserDtoSchema = void 0;
const zod_1 = require("zod");
const user_roles_enum_1 = require("../user-roles.enum");
exports.CreateUserDtoSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email(),
        name: zod_1.z.string().optional(),
        hashedPassword: zod_1.z.string(),
        role: zod_1.z.enum([user_roles_enum_1.UserRoles.USER, user_roles_enum_1.UserRoles.ADMIN]).optional()
    })
});
