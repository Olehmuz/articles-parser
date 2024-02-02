"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CorsMiddleware = void 0;
const cors_1 = __importDefault(require("cors"));
class CorsMiddleware {
    constructor() {
        this.execute = (0, cors_1.default)({ origin: 'http://localhost:3000', credentials: true });
    }
}
exports.CorsMiddleware = CorsMiddleware;
