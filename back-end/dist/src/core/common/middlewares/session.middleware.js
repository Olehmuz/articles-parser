"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionMiddleware = void 0;
const express_session_1 = __importDefault(require("express-session"));
class SessionMiddleware {
    constructor() {
        this.execute = (0, express_session_1.default)({ secret: process.env.SESSION_SECRET, resave: true, saveUninitialized: true, cookie: { secure: false } });
    }
}
exports.SessionMiddleware = SessionMiddleware;
