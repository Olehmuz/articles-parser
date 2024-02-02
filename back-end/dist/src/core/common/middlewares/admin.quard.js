"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const unauthorized_exception_1 = require("../errors/exceptions/unauthorized.exception");
const http_error_1 = require("../errors/http.error");
class AuthMiddleware {
    constructor() { }
    execute(req, res, next) {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                throw new unauthorized_exception_1.UnauthorizedException('User is not authorized');
            }
            const [type, token] = authHeader.split(' ');
            if (type !== 'Bearer') {
                throw new unauthorized_exception_1.UnauthorizedException('User is not authorized');
            }
            (0, jsonwebtoken_1.verify)(token, process.env.JWT_ACCESS_SECRET, (err, user) => {
                if (err)
                    throw new unauthorized_exception_1.UnauthorizedException('User is not authorized');
                req.user = user;
            });
            next();
        }
        catch (error) {
            if (error instanceof http_error_1.HttpError) {
                return res
                    .status(error.code)
                    .json({ message: error.message, code: error.code });
            }
            else {
                return res
                    .status(500)
                    .json({ message: 'Internal server error', code: 500 });
            }
        }
    }
}
exports.AuthMiddleware = AuthMiddleware;
