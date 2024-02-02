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
exports.ArticlesService = void 0;
class ArticlesService {
    constructor(articlesRepository) {
        this.articlesRepository = articlesRepository;
    }
    createArticle(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.articlesRepository.createArticle(dto);
        });
    }
    getArticlesList({ page, limit }, search) {
        return __awaiter(this, void 0, void 0, function* () {
            const articlesPromise = this.articlesRepository.getArticlesList({ page, limit }, search);
            const totalCountPromise = this.articlesRepository.countArticles({
                content: {
                    contains: search,
                    mode: 'insensitive'
                }
            });
            const [articles, totalCount] = yield Promise.all([articlesPromise, totalCountPromise]);
            return {
                data: articles !== null && articles !== void 0 ? articles : [],
                currentPage: page,
                totalPages: Math.ceil(totalCount / limit),
                limit
            };
        });
    }
    findArticleById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.articlesRepository.findArticleById(id);
        });
    }
    findArticleByFilter(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.articlesRepository.findArticleByFilter(filter);
        });
    }
    updateArticle(id, dto) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.articlesRepository.updateArticle(id, dto);
        });
    }
    deleteArticle(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.articlesRepository.deleteArticle(id);
        });
    }
}
exports.ArticlesService = ArticlesService;
