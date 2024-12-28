import express from 'express'
import validateRequest from '../../middleware/validateRequest'
import { BlogValidation } from './blog.validationZodSchema'
import { BlogControllers } from './blog.controller'
import { auth } from '../../middleware/auth'

const router = express.Router()

router.get('/', BlogControllers.getAllBlogs)

router.post(
  '/',
  auth('user'),
  validateRequest(BlogValidation.createBlogValidationZodSchema),
  BlogControllers.createBlog
)

router.patch(
  '/:id',
  auth('user'),
  validateRequest(BlogValidation.updateBlogValidationZodSchema),
  BlogControllers.updateBlog
)

router.delete('/:id', auth('user'), BlogControllers.deleteBlog)

export const BlogRoutes = router
