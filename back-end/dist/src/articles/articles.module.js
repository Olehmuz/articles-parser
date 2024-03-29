"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticlesModule = void 0;
const brandi_1 = require("brandi");
const tokens_1 = require("../core/container/tokens");
const articles_controller_1 = require("./articles.controller");
const articles_repository_1 = require("./articles.repository");
const articles_service_1 = require("./articles.service");
exports.ArticlesModule = new brandi_1.DependencyModule();
exports.ArticlesModule.bind(tokens_1.TOKENS.articlesController).toInstance(articles_controller_1.ArticlesController).inContainerScope();
exports.ArticlesModule.bind(tokens_1.TOKENS.articlesRepository).toInstance(articles_repository_1.ArticlesRepository).inContainerScope();
exports.ArticlesModule.bind(tokens_1.TOKENS.articlesService).toInstance(articles_service_1.ArticlesService).inContainerScope();
exports.ArticlesModule.bind(tokens_1.TOKENS.articlesPrefix).toConstant('articles');
(0, brandi_1.injected)(articles_repository_1.ArticlesRepository, tokens_1.TOKENS.databaseService);
(0, brandi_1.injected)(articles_service_1.ArticlesService, tokens_1.TOKENS.articlesRepository);
(0, brandi_1.injected)(articles_controller_1.ArticlesController, tokens_1.TOKENS.articlesPrefix, tokens_1.TOKENS.loggerService, tokens_1.TOKENS.articlesService);
