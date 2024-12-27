import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { AuthServices } from './auth.service'

// user registration
const registerUser = catchAsync(async (req, res) => {
  const result = await AuthServices.registerUserIntoDB(req.body)

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'User registered successfully',
    data: result
  })
})

//user login
const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Login successful',
    data: result
  })
})
export const AuthControllers = {
  registerUser,
  loginUser
}
