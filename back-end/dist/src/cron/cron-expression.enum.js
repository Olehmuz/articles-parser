"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CronExpressions = void 0;
var CronExpressions;
(function (CronExpressions) {
    CronExpressions["EVERY_MINUTE"] = "* * * * *";
    CronExpressions["EVERY_5_MINUTES"] = "*/5 * * * *";
    CronExpressions["EVERY_10_MINUTES"] = "*/10 * * * *";
    CronExpressions["EVERY_HOUR"] = "0 * * * *";
    CronExpressions["EVERY_DAY"] = "0 0 * * *";
    CronExpressions["EVERY_WEEK"] = "0 0 * * 0";
    CronExpressions["EVERY_MONTH"] = "0 0 1 * *";
    CronExpressions["EVERY_YEAR"] = "0 0 1 1 *";
})(CronExpressions || (exports.CronExpressions = CronExpressions = {}));
