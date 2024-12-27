import { NextFunction, Request, Response } from 'express'
import config from '../config'
import { TErrorSources } from '../interface/error'
import { ZodError } from 'zod'
import handleZodValidationError from '../errors/handleZodValidationError'
import handleMongooseValidationError from '../errors/handleMongooseValidationError'
import handleMongooseCastError from '../errors/handleMongooseCastError'
import handleMongooseDuplicateError from '../errors/handleMongooseDuplicateError'
import AppError from '../errors/AppError'

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode: number = 500
  let message: string = 'Something went wrong!'
  let errorSources: TErrorSources = [
    {
      path: '',
      message: 'Something went wrong!'
    }
  ]

  // any zod valiation error checking.
  if (err instanceof ZodError) {
    const simplifiedError = handleZodValidationError(err)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorSources = simplifiedError.errorSources
  }
  // any mongoose validation error checking
  else if (err?.name === 'ValidationError') {
    const simplifiedError = handleMongooseValidationError(err)

    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorSources = simplifiedError.errorSources
  }

  // any mongoose cast error
  else if (err?.name === 'CastError') {
    const simplifiedError = handleMongooseCastError(err)

    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorSources = simplifiedError.errorSources
  }

  // any mongoose Duplicate error
  else if (err?.code === 11000) {
    const simplifiedError = handleMongooseDuplicateError(err)

    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorSources = simplifiedError.errorSources
  }

  // our Custom AppError Check.
  else if (err instanceof AppError) {
    statusCode = err?.statusCode
    message = err?.message
    errorSources = [
      {
        path: '',
        message: err?.message
      }
    ]
  }

  // Builtin Error Check
  else if (err instanceof Error) {
    message = err?.message
    errorSources = [
      {
        path: '',
        message: err?.message
      }
    ]
  }

  // error output pattarn.
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    error: errorSources,
    stack: config.NODE_ENV === 'development' ? err?.stack : null
  })
}

export default globalErrorHandler
