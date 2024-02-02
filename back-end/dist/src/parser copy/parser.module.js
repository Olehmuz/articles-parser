"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParserModule = void 0;
const brandi_1 = require("brandi");
const tokens_1 = require("../core/container/tokens");
const parser_service_1 = require("./parser.service");
exports.ParserModule = new brandi_1.DependencyModule();
exports.ParserModule.bind(tokens_1.TOKENS.parserService).toInstance(parser_service_1.ParserService).inContainerScope();
