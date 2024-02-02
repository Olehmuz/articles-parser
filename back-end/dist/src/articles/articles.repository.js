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
exports.ArticlesRepository = void 0;
class ArticlesRepository {
    constructor(db) {
        this.db = db;
    }
    createArticle(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.client.article.create({ data: dto });
        });
    }
    updateArticle(id, dto) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.client.article.update({ where: { id }, data: dto });
        });
    }
    deleteArticle(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.client.article.delete({ where: { id } });
        });
    }
    findArticleByFilter(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.client.article.findFirst({ where: filter });
        });
    }
    findArticleById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.client.article.findFirst({ where: { id } });
        });
    }
    getArticlesList({ page, limit }, search) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.client.article.findMany({
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { createdAt: 'desc' },
                where: {
                    title: {
                        contains: search,
                        mode: 'insensitive'
                    }
                }
            });
        });
    }
    countArticles(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.client.article.count({
                where: filter
            });
        });
    }
}
exports.ArticlesRepository = ArticlesRepository;
