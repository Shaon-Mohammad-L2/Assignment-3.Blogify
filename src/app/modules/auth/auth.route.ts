import express from 'express'
import { AuthControllers } from './auth.controller'
import validateRequest from '../../middleware/validateRequest'
import { AuthValidationZodSchema } from './auth.validationZodSchema'

const router = express.Router()

router.post(
  '/register',
  validateRequest(AuthValidationZodSchema.registerUserValidationZodSchema),
  AuthControllers.registerUser
)

router.post(
  '/login',
  validateRequest(AuthValidationZodSchema.loginUserValidationZodSchema),
  AuthControllers.loginUser
)

export const AuthRoutes = router
