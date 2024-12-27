"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const auth_validationZodSchema_1 = require("./auth.validationZodSchema");
const router = express_1.default.Router();
router.post('/register', (0, validateRequest_1.default)(auth_validationZodSchema_1.AuthValidationZodSchema.registerUserValidationZodSchema), auth_controller_1.AuthControllers.registerUser);
router.post('/login', (0, validateRequest_1.default)(auth_validationZodSchema_1.AuthValidationZodSchema.loginUserValidationZodSchema), auth_controller_1.AuthControllers.loginUser);
exports.AuthRoutes = router;