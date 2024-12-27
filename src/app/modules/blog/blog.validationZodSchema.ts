import { z } from 'zod'

const createBlogValidationZodSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Titile is required'
      })
      .max(200, { message: 'Title must be 200 or fewer characters long' }),
    content: z.string({
      required_error: 'Content is required'
    })
  })
})

const updateBlogValidationZodSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Titile is required'
      })
      .max(200, { message: 'Title must be 200 or fewer characters long' })
      .optional(),
    content: z
      .string({
        required_error: 'Content is required'
      })
      .optional()
  })
})

export const BlogValidation = {
  createBlogValidationZodSchema,
  updateBlogValidationZodSchema
}
