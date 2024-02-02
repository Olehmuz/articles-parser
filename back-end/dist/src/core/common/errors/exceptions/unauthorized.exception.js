"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedException = void 0;
const http_error_1 = require("../http.error");
class UnauthorizedException extends http_error_1.HttpError {
    constructor(message) {
        super(401, message);
    }
}
exports.UnauthorizedException = UnauthorizedException;
