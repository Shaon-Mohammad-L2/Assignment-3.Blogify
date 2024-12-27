import { NextFunction, Request, Response } from 'express'
import config from '../config'
import { TErrorSources } from '../interface/error'

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

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    errorSources,
    stack: config.NODE_ENV === 'development' ? err?.stack : null
  })
}

export default globalErrorHandler
