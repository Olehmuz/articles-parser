"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundException = void 0;
const http_error_1 = require("../http.error");
class NotFoundException extends http_error_1.HttpError {
    constructor(message) {
        super(404, message);
    }
}
exports.NotFoundException = NotFoundException;
