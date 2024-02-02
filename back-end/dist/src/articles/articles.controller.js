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
exports.ArticlesController = void 0;
const client_1 = require("@prisma/client");
const not_found_exception_1 = require("../core/common/errors/exceptions/not-found.exception");
const validation_middleware_1 = require("../core/common/middlewares/validation.middleware");
const base_controller_1 = require("../core/common/base.controller");
const authorization_middleware_1 = require("../core/common/middlewares/authorization.middleware");
const role_quard_1 = require("../core/common/middlewares/role.quard");
const create_article_dto_1 = require("./dto/create-article.dto");
const update_article_dto_1 = require("./dto/update-article.dto");
class ArticlesController extends base_controller_1.BaseController {
    constructor(prefix, loggerService, articlesService) {
        super(prefix, loggerService);
        this.prefix = prefix;
        this.loggerService = loggerService;
        this.articlesService = articlesService;
        this.bindRoutes([
            {
                path: '',
                func: this.createArticle,
                method: 'post',
                middlewares: [new authorization_middleware_1.AuthMiddleware(), new role_quard_1.RoleGuard(client_1.Roles.ADMIN), new validation_middleware_1.ValidatorMiddleware(create_article_dto_1.CreateArticleDtoSchema)]
            },
            {
                path: '',
                func: this.getArticlesList,
                method: 'get'
            },
            {
                path: '/:id',
                func: this.findArticleById,
                method: 'get'
            },
            {
                path: '/:id',
                func: this.deleteArticle,
                method: 'delete',
                middlewares: [new authorization_middleware_1.AuthMiddleware(), new role_quard_1.RoleGuard(client_1.Roles.ADMIN)]
            },
            {
                path: '/:id',
                func: this.updateArticle,
                method: 'patch',
                middlewares: [new authorization_middleware_1.AuthMiddleware(), new role_quard_1.RoleGuard(client_1.Roles.ADMIN), new validation_middleware_1.ValidatorMiddleware(update_article_dto_1.UpdateArticleDtoSchema)]
            }
        ], prefix);
    }
    createArticle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const dto = req.body;
            const article = yield this.articlesService.createArticle(dto);
            res.status(200).send(article);
        });
    }
    updateArticle(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const dto = req.body;
            const existedArticle = yield this.articlesService.findArticleById(id);
            if (!existedArticle) {
                next(new not_found_exception_1.NotFoundException("Article with such ID doesn't exists."));
                return;
            }
            const article = yield this.articlesService.updateArticle(id, dto);
            res.status(200).send(article);
        });
    }
    getArticlesList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const page = req.query.page ? +req.query.page : 1;
            const limit = req.query.limit ? +req.query.limit : 30;
            let search = '';
            if (typeof req.query.search === 'string')
                search = req.query.search;
            const articles = yield this.articlesService.getArticlesList({ page, limit }, search);
            res.status(200).send(articles);
        });
    }
    findArticleById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const articles = yield this.articlesService.findArticleById(id);
            if (!articles) {
                next(new not_found_exception_1.NotFoundException('No article found with such ID.'));
                return;
            }
            res.status(200).send(articles);
        });
    }
    deleteArticle(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const existedArticle = yield this.articlesService.findArticleById(id);
            if (!existedArticle) {
                next(new not_found_exception_1.NotFoundException("Article with such ID doesn't exists."));
                return;
            }
            const deletedArticle = yield this.articlesService.deleteArticle(id);
            res.status(200).send(deletedArticle);
        });
    }
}
exports.ArticlesController = ArticlesController;
