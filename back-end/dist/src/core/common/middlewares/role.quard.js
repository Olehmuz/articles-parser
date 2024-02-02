"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleGuard = void 0;
const client_1 = require("@prisma/client");
const forbiden_exception_1 = require("../errors/exceptions/forbiden.exception");
class RoleGuard {
    constructor(role) {
        this.role = role;
    }
    execute(req, res, next) {
        if (req.user.role === client_1.Roles.ADMIN) {
            next();
            return;
        }
        if (req.user.role !== this.role) {
            next(new forbiden_exception_1.ForbiddenException('Access denied. Required role: ' + this.role));
            return;
        }
        next();
    }
}
exports.RoleGuard = RoleGuard;
