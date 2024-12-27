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
exports.auth = void 0;
const config_1 = __importDefault(require("../config"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const user_model_1 = require("../modules/user/user.model");
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth = (...requeredRole) => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        // console.log(req.cookies, req.headers.authorization)
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        // check token is exists
        if (!token) {
            throw new AppError_1.default(401, 'You are not authorized!');
        }
        // check valid token
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_token_secret);
        const { userId, role } = decoded;
        //checking if the user is exist in the database
        const user = yield user_model_1.User.isUserExistsBy_id(userId);
        if (!user) {
            throw new AppError_1.default(401, 'Invalid credentials');
        }
        // checking if the user is alrady deleted.
        const isDeleted = user === null || user === void 0 ? void 0 : user.isDeleted;
        if (isDeleted) {
            throw new AppError_1.default(404, 'User not found!');
        }
        // checking if the user is blocked
        const isBlocked = user === null || user === void 0 ? void 0 : user.isBlocked;
        if (isBlocked) {
            throw new AppError_1.default(400, 'User is blocked!');
        }
        // role check
        if (user.role !== role) {
            throw new AppError_1.default(403, 'You are not authorized!');
        }
        // checking required role.
        if (requeredRole && !requeredRole.includes(role)) {
            throw new AppError_1.default(401, 'You are not authorized!');
        }
        // set the user to request object.
        req.user = decoded;
        next();
    }));
};
exports.auth = auth;
