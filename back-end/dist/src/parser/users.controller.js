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
exports.UsersController = void 0;
const not_found_exception_1 = require("../core/common/errors/exceptions/not-found.exception");
const validation_middleware_1 = require("../core/common/middlewares/validation.middleware");
const base_controller_1 = require("../core/common/base.controller");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
class UsersController extends base_controller_1.BaseController {
    constructor(prefix, loggerService, usersService) {
        super(prefix, loggerService);
        this.prefix = prefix;
        this.loggerService = loggerService;
        this.usersService = usersService;
        this.bindRoutes([
            {
                path: '',
                func: this.createUser,
                method: 'post',
                middlewares: [new validation_middleware_1.ValidatorMiddleware(create_user_dto_1.CreateUserDtoSchema)]
            },
            {
                path: '',
                func: this.getUsersList,
                method: 'get'
            },
            {
                path: '/:id',
                func: this.findUserById,
                method: 'get'
            },
            {
                path: '/:id',
                func: this.deleteUser,
                method: 'delete'
            },
            {
                path: '/:id',
                func: this.updateUser,
                method: 'patch',
                middlewares: [new validation_middleware_1.ValidatorMiddleware(update_user_dto_1.UpdateUserDtoSchema)]
            }
        ], prefix);
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const dto = req.body;
            const user = yield this.usersService.createUser(dto);
            res.status(200).send(user);
        });
    }
    updateUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const dto = req.body;
            const existedUser = yield this.usersService.findUserById(id);
            if (!existedUser) {
                next(new not_found_exception_1.NotFoundException("User with such ID doesn't exists."));
                return;
            }
            const user = yield this.usersService.updateUser(id, dto);
            res.status(200).send(user);
        });
    }
    getUsersList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.usersService.getUsersList();
            res.status(200).send(users);
        });
    }
    findUserById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const users = yield this.usersService.findUserById(id);
            if (!users) {
                next(new not_found_exception_1.NotFoundException('No user found with such ID.'));
                return;
            }
            res.status(200).send(users);
        });
    }
    deleteUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const existedUser = yield this.usersService.findUserById(id);
            if (!existedUser) {
                next(new not_found_exception_1.NotFoundException("User with such ID doesn't exists."));
                return;
            }
            const deletedUser = yield this.usersService.deleteUser(id);
            res.status(200).send(deletedUser);
        });
    }
}
exports.UsersController = UsersController;
