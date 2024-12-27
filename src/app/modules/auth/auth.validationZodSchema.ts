import { z } from 'zod'
//for user registration validation
const registerUserValidationZodSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required'
    }),
    email: z.coerce
      .string({
        required_error: 'Email is required'
      })
      .email(),
    password: z.string({
      required_error: 'Password is required'
    })
  })
})

// for user login validation
const loginUserValidationZodSchema = z.object({
  body: z.object({
    email: z.coerce
      .string({
        required_error: 'Email is required'
      })
      .email(),
    password: z.string({
      required_error: 'Password is required'
    })
  })
})
export const AuthValidationZodSchema = {
  registerUserValidationZodSchema,
  loginUserValidationZodSchema
}
