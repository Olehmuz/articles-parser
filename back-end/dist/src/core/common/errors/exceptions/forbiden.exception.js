"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForbiddenException = void 0;
const http_error_1 = require("../http.error");
class ForbiddenException extends http_error_1.HttpError {
    constructor(message) {
        super(403, message);
    }
}
exports.ForbiddenException = ForbiddenException;
