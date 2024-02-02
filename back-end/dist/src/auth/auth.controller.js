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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const validation_middleware_1 = require("../core/common/middlewares/validation.middleware");
const base_controller_1 = require("../core/common/base.controller");
const login_user_dto_1 = require("./dto/login-user.dto");
const register_user_dto_1 = require("./dto/register-user.dto");
class AuthController extends base_controller_1.BaseController {
    constructor(prefix, loggerService, authService) {
        super(prefix, loggerService);
        this.prefix = prefix;
        this.loggerService = loggerService;
        this.authService = authService;
        this.bindRoutes([
            {
                path: '/register',
                func: this.register,
                middlewares: [new validation_middleware_1.ValidatorMiddleware(register_user_dto_1.RegisterUserDtoSchema)],
                method: 'post'
            },
            {
                path: '/login',
                func: this.login,
                middlewares: [new validation_middleware_1.ValidatorMiddleware(login_user_dto_1.LoginUserDtoSchema)],
                method: 'post'
            },
            {
                path: '/refresh',
                func: this.refresh,
                method: 'post'
            }
        ], prefix);
    }
    register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tokens = yield this.authService.register(req.body);
                res.status(200).json(tokens);
            }
            catch (error) {
                next(error);
            }
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tokens = yield this.authService.login(req.body);
                res.status(200).json(tokens);
            }
            catch (error) {
                next(error);
            }
        });
    }
    refresh(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const refreshToken = req.body.refreshToken;
                const tokens = yield this.authService.refresh(refreshToken);
                res.status(200).json(tokens);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.AuthController = AuthController;
