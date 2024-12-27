"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogValidation = void 0;
const zod_1 = require("zod");
const createBlogValidationZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z
            .string({
            required_error: 'Titile is required'
        })
            .max(200, { message: 'Title must be 200 or fewer characters long' }),
        content: zod_1.z.string({
            required_error: 'Content is required'
        })
    })
});
const updateBlogValidationZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z
            .string({
            required_error: 'Titile is required'
        })
            .max(200, { message: 'Title must be 200 or fewer characters long' })
            .optional(),
        content: zod_1.z
            .string({
            required_error: 'Content is required'
        })
            .optional()
    })
});
exports.BlogValidation = {
    createBlogValidationZodSchema,
    updateBlogValidationZodSchema
};
