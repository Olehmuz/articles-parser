"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserDtoSchema = void 0;
const zod_1 = require("zod");
const user_roles_enum_1 = require("../user-roles.enum");
exports.UpdateUserDtoSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string().email().optional(),
        name: zod_1.z.string().optional(),
        hashedPassword: zod_1.z.string().optional(),
        role: zod_1.z.enum([user_roles_enum_1.UserRoles.USER, user_roles_enum_1.UserRoles.ADMIN]).optional()
    })
});
