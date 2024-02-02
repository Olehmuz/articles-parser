"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestException = void 0;
const http_error_1 = require("../http.error");
class BadRequestException extends http_error_1.HttpError {
    constructor(message) {
        super(400, message);
    }
}
exports.BadRequestException = BadRequestException;
