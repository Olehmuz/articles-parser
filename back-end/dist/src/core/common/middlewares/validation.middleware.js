"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidatorMiddleware = void 0;
class ValidatorMiddleware {
    constructor(schema) {
        this.schema = schema;
    }
    execute(req, res, next) {
        try {
            this.schema.parse({
                body: req.body,
                query: req.query,
                params: req.params
            });
            next();
        }
        catch (error) {
            return res.status(400).json(error);
        }
    }
}
exports.ValidatorMiddleware = ValidatorMiddleware;
