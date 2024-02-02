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
exports.ParserService = void 0;
const rss_parser_1 = __importDefault(require("rss-parser"));
const moment_1 = __importDefault(require("moment"));
class ParserService {
    constructor(logger, articlesService) {
        this.logger = logger;
        this.articlesService = articlesService;
        this.parser = new rss_parser_1.default();
        if (!process.env.RSS_LINKS) {
            this.logger.error('[PARSER SERVICE] RSS_LINKS env variable is not defined');
            throw new Error('RSS_LINKS env variable is not defined');
        }
        this.rssLinks = process.env.RSS_LINKS.split(',');
    }
    validateArticle(article) {
        if (!article.guid || !article.title || !article.link || !article.content || !article.isoDate || !article.creator) {
            throw new Error('Unsupported article structure');
        }
        const createdAt = (0, moment_1.default)(article.isoDate).toDate();
        return {
            articleId: article.guid,
            title: article.title,
            link: article.link,
            createdAt,
            author: article.creator,
            content: article.content
        };
    }
    fetchArticles() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const promises = this.rssLinks.map((link) => this.parser.parseURL(link));
                const results = yield Promise.all(promises);
                return results.flatMap((result) => result.items);
            }
            catch (error) {
                if (error instanceof Error) {
                    this.logger.error(`[EXCEPTION] message: ${error.message}]`);
                }
                return [];
            }
        });
    }
    parseArticles() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const fetchedArticles = yield this.fetchArticles();
                const articles = fetchedArticles.map(this.validateArticle);
                if (!articles.length) {
                    return;
                }
                for (const article of articles) {
                    if (!article.articleId) {
                        continue;
                    }
                    const existedArticle = yield this.articlesService.findArticleByFilter({ articleId: article.articleId });
                    if (existedArticle)
                        continue;
                    yield this.articlesService.createArticle(article);
                    this.logger.info(`[PARSER SERVICE] Article ${article.articleId} was created`);
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    this.logger.error(`[EXCEPTION] message: ${error.message}]`);
                }
            }
        });
    }
}
exports.ParserService = ParserService;
