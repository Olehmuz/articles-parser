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
exports.UsersRepository = void 0;
class UsersRepository {
    constructor(db) {
        this.db = db;
    }
    createUser(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.client.user.create({ data: dto });
        });
    }
    updateUser(id, dto) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.client.user.update({ where: { id }, data: dto });
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.client.user.delete({ where: { id } });
        });
    }
    findUserByFilter(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.client.user.findFirst({ where: filter });
        });
    }
    findUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.client.user.findFirst({ where: { id } });
        });
    }
    getUsersList() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.client.user.findMany();
        });
    }
}
exports.UsersRepository = UsersRepository;
