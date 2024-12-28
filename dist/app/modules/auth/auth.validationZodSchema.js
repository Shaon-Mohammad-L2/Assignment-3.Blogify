"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidationZodSchema = void 0;
const zod_1 = require("zod");
// =================== User Registration Validation Schema ===================
// Validates the request body for user registration
const registerUserValidationZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'Name is required'
        }),
        email: zod_1.z
            .string({
            required_error: 'Email is required'
        })
            .email(),
        password: zod_1.z.string({
            required_error: 'Password is required'
        })
    })
});
// =================== User Login Validation Schema ===================
// Validates the request body for user login
const loginUserValidationZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({
            required_error: 'Email is required'
        })
            .email(),
        password: zod_1.z.string({
            required_error: 'Password is required'
        })
    })
});
// =================== Exporting Validation Schemas ===================
exports.AuthValidationZodSchema = {
    registerUserValidationZodSchema,
    loginUserValidationZodSchema
};
