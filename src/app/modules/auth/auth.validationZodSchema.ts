import { z } from 'zod'

// =================== User Registration Validation Schema ===================

// Validates the request body for user registration
const registerUserValidationZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required'
    }),
    email: z
      .string({
        required_error: 'Email is required'
      })
      .email(),
    password: z.string({
      required_error: 'Password is required'
    })
  })
})

// =================== User Login Validation Schema ===================

// Validates the request body for user login
const loginUserValidationZodSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Email is required'
      })
      .email(),
    password: z.string({
      required_error: 'Password is required'
    })
  })
})

// =================== Exporting Validation Schemas ===================
export const AuthValidationZodSchema = {
  registerUserValidationZodSchema,
  loginUserValidationZodSchema
}
