"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_middleware_1 = require("./common/middlewares/body-parser.middleware");
const cors_middleware_1 = require("./common/middlewares/cors.middleware");
class App {
    constructor(logger, config, exceptionFilter, databaseService, cronService, authController, usersController, articlesController) {
        var _a;
        this.logger = logger;
        this.config = config;
        this.exceptionFilter = exceptionFilter;
        this.databaseService = databaseService;
        this.cronService = cronService;
        this.authController = authController;
        this.usersController = usersController;
        this.articlesController = articlesController;
        this.app = (0, express_1.default)();
        this.server = this.app.listen((_a = process.env.PORT) !== null && _a !== void 0 ? _a : 7777, () => {
            var _a;
            this.logger.info(`[APP] Server running on port ${(_a = process.env.PORT) !== null && _a !== void 0 ? _a : 7777}`);
        });
        this.controllers = [
            authController,
            usersController,
            articlesController
        ];
        this.middlewares = [new body_parser_middleware_1.BodyParserMiddleware(), new cors_middleware_1.CorsMiddleware()];
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.useGlobalMiddleware();
            this.bindRoutes();
            this.useExceptionFilter();
            yield this.cronService.runCronJobs();
            yield this.databaseService.connect();
            process.on('uncaughtException', (err) => {
                this.logger.error(`Uncaught: ${err.toString()}`);
                process.exit(1);
            });
            process.on('unhandledRejection', (err) => {
                if (err instanceof Error) {
                    this.logger.error(`Unhandled: ${err.message}`);
                }
                process.exit(1);
            });
        });
    }
    bindRoutes() {
        var _a;
        (_a = this.controllers) === null || _a === void 0 ? void 0 : _a.forEach((controller) => {
            this.app.use('/' + controller.prefix, controller.router);
        });
    }
    useGlobalMiddleware() {
        var _a;
        (_a = this.middlewares) === null || _a === void 0 ? void 0 : _a.forEach((middleware) => {
            this.app.use(middleware.execute.bind(middleware));
        });
    }
    useExceptionFilter() {
        this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
        this.logger.info('[APP] Exception filter is setted');
    }
}
exports.App = App;
