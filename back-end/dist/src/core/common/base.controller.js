"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
const express_1 = require("express");
class BaseController {
    constructor(prefix, logger) {
        this.prefix = prefix;
        this.logger = logger;
        this._router = (0, express_1.Router)();
    }
    get router() {
        return this._router;
    }
    bindRoutes(routes, prefix) {
        var _a;
        for (const route of routes) {
            const handle = route.func.bind(this);
            const middleware = (_a = route.middlewares) === null || _a === void 0 ? void 0 : _a.map((m) => m.execute.bind(m));
            const pipeline = middleware ? [...middleware, handle] : handle;
            this._router[route.method](route.path, pipeline);
            this.logger.info(`[${prefix.toUpperCase()} CONTROLLER] [${route.method}] ${'/' + prefix + route.path}`);
        }
    }
}
exports.BaseController = BaseController;
