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
exports.CronService = void 0;
const cron_1 = require("cron");
const cron_expression_enum_1 = require("./cron-expression.enum");
class CronService {
    constructor(logger, parserService) {
        this.logger = logger;
        this.parserService = parserService;
    }
    runCronJobs() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.parseArticles();
        });
    }
    parseArticles() {
        return __awaiter(this, void 0, void 0, function* () {
            const ParseJob = new cron_1.CronJob(cron_expression_enum_1.CronExpressions.EVERY_10_MINUTES, () => __awaiter(this, void 0, void 0, function* () {
                this.logger.info('[CRON SERVICE] Parsing articles...');
                yield this.parserService.parseArticles();
            }));
            ParseJob.start();
        });
    }
}
exports.CronService = CronService;
