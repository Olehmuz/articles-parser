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
exports.AuthService = void 0;
const bcrypt_1 = require("bcrypt");
const bad_request_exception_1 = require("../core/common/errors/exceptions/bad-request.exception");
class AuthService {
    constructor(usersRepository, jwtService) {
        this.usersRepository = usersRepository;
        this.jwtService = jwtService;
    }
    register(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password, role } = dto;
            const hashedPassword = yield (0, bcrypt_1.hash)(password, +process.env.SALT);
            const existedUser = yield this.usersRepository.findUserByFilter({ email });
            if (existedUser) {
                throw new bad_request_exception_1.BadRequestException('User with such email already exists.');
            }
            const user = yield this.usersRepository.createUser({ email, hashedPassword, role: role !== null && role !== void 0 ? role : 'USER' });
            const { accessToken, refreshToken } = this.jwtService.generateTokens(user);
            return {
                accessToken,
                refreshToken
            };
        });
    }
    login(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = dto;
            const user = yield this.usersRepository.findUserByFilter({ email });
            if (!user) {
                throw new bad_request_exception_1.BadRequestException('User with such email does not exist.');
            }
            const isPasswordCorrect = yield (0, bcrypt_1.compare)(password, user.hashedPassword);
            if (!isPasswordCorrect) {
                throw new bad_request_exception_1.BadRequestException('Incorrect password.');
            }
            const { accessToken, refreshToken } = this.jwtService.generateTokens(user);
            return {
                accessToken,
                refreshToken
            };
        });
    }
    refresh(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const userData = this.jwtService.validateRefreshToken(refreshToken);
            if (typeof userData === 'object' && typeof userData.id === 'string') {
                const user = yield this.usersRepository.findUserById(userData.id);
                if (!user) {
                    throw new bad_request_exception_1.BadRequestException('User does not exist.');
                }
                const tokens = this.jwtService.generateTokens(user);
                return tokens;
            }
            else {
                throw new bad_request_exception_1.BadRequestException('Invalid refresh token.');
            }
        });
    }
}
exports.AuthService = AuthService;
