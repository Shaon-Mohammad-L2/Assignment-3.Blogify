import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { BlogValidation } from './blog.validationZodSchema'
import { BlogControllers } from './blog.controller'

const router = express.Router()

router.get('/', BlogControllers.getAllBlogs)
router.get('/:id', BlogControllers.getAllBlogs)

router.post(
  '/',
  validateRequest(BlogValidation.createBlogValidationZodSchema),
  BlogControllers.createBlog
)

router.patch(
  '/:id',
  validateRequest(BlogValidation.updateBlogValidationZodSchema),
  BlogControllers.updateBlog
)

router.delete('/:id', BlogControllers.deleteBlog)

export const BlogRoutes = router
