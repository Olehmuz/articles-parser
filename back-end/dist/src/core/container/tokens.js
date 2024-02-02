"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TOKENS = void 0;
const brandi_1 = require("brandi");
exports.TOKENS = {
    app: (0, brandi_1.token)('app'),
    loggerService: (0, brandi_1.token)('loggerService'),
    configService: (0, brandi_1.token)('configService'),
    exceptionFilter: (0, brandi_1.token)('exception'),
    databaseService: (0, brandi_1.token)('databaseService'),
    usersPrefix: (0, brandi_1.token)('usersPrefix'),
    usersRepository: (0, brandi_1.token)('usersRepository'),
    usersController: (0, brandi_1.token)('usersController'),
    usersService: (0, brandi_1.token)('usersService'),
    authPrefix: (0, brandi_1.token)('authPrefix'),
    authController: (0, brandi_1.token)('authController'),
    authService: (0, brandi_1.token)('authService'),
    jwtService: (0, brandi_1.token)('jwtService'),
    parserService: (0, brandi_1.token)('parserService'),
    rssLinks: (0, brandi_1.token)('rssLinks'),
    cronService: (0, brandi_1.token)('cronService'),
    articlesPrefix: (0, brandi_1.token)('articlesPrefix'),
    articlesRepository: (0, brandi_1.token)('articlesRepository'),
    articlesController: (0, brandi_1.token)('articlesController'),
    articlesService: (0, brandi_1.token)('articlesService')
};
