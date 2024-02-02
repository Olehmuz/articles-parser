"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MulterMiddleware = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const uuid_1 = require("uuid");
const http_error_1 = require("../errors/http.error");
function checkFileType(file, cb) {
    // Allowed file types
    const filetypes = /jpeg|jpg|png|gif|webp/;
    // Check extension
    const extname = filetypes.test(path_1.default.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
        cb(null, true);
    }
    else {
        cb(new http_error_1.HttpError(400, 'Allowed file types: jpeg|jpg|png|gif|webp'));
    }
}
class MulterMiddleware {
    constructor() {
        this.storage = multer_1.default.diskStorage({
            destination: function (req, file, cb) {
                const uploadsDir = path_1.default.join(process.cwd(), '/uploads');
                if (!fs_1.default.existsSync(uploadsDir)) {
                    fs_1.default.mkdirSync(uploadsDir);
                }
                cb(null, uploadsDir);
            },
            filename: function (req, file, cb) {
                cb(null, (0, uuid_1.v4)() + path_1.default.extname(file.originalname));
            }
        });
        this.multer = (0, multer_1.default)({
            storage: this.storage,
            limits: { fileSize: 10000000 },
            fileFilter: function (req, file, cb) {
                checkFileType(file, cb);
            }
        });
        this.execute = this.multer.array('files', 10);
    }
}
exports.MulterMiddleware = MulterMiddleware;
