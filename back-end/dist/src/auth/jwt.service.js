"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTService = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const unauthorized_exception_1 = require("../core/common/errors/exceptions/unauthorized.exception");
class JWTService {
    constructor() { }
    generateTokens(payload) {
        const accessToken = (0, jsonwebtoken_1.sign)(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '1h' });
        const refreshToken = (0, jsonwebtoken_1.sign)(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
        return {
            accessToken,
            refreshToken
        };
    }
    validateAccessToken(accessToken) {
        try {
            const userData = (0, jsonwebtoken_1.verify)(accessToken, process.env.JWT_ACCESS_SECRET);
            return userData;
        }
        catch (e) {
            throw new unauthorized_exception_1.UnauthorizedException('Invalid access token');
        }
    }
    validateRefreshToken(refreshToken) {
        try {
            const userData = (0, jsonwebtoken_1.verify)(refreshToken, process.env.JWT_REFRESH_SECRET);
            return userData;
        }
        catch (e) {
            throw new unauthorized_exception_1.UnauthorizedException('Invalid refresh token');
        }
    }
}
exports.JWTService = JWTService;
