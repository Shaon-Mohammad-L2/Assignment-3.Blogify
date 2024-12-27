"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidationZodSchema = void 0;
const zod_1 = require("zod");
//for user registration validation
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
// for user login validation
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
exports.AuthValidationZodSchema = {
    registerUserValidationZodSchema,
    loginUserValidationZodSchema
};