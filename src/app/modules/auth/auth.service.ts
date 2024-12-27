import config from '../../config'
import AppError from '../../errors/AppError'
import { TUser } from '../user/user.interface'
import { User } from '../user/user.model'
import { TLoginUser } from './auth.interface'
import { createToken } from './auth.utils'

// user registration into db
const registerUserIntoDB = async (payload: TUser) => {
  // checking user already exists
  if (await User.isUserExistsByEmail(payload.email)) {
    throw new AppError(400, 'This user is already exists!')
  }
  //successfully user register
  const result = await User.create(payload)
  return result
}

//user login
const loginUser = async (payload: TLoginUser) => {
  // check user in data base.
  const user = await User.isUserExistsByEmail(payload?.email)
  //check user is exists
  if (!user) {
    throw new AppError(403, 'Invalid credentials!')
  }

  //check user is deleted
  const isDeleted = user?.isDeleted
  if (isDeleted) {
    throw new AppError(404, 'User Not Found!')
  }

  //check user is blocked
  const isBlocked = user?.isBlocked
  if (isBlocked) {
    throw new AppError(400, 'User is Blocked!')
  }

  // check password is matched
  const isPasswordMatched = await User.isPasswordMatched(
    payload?.password,
    user?.password
  )
  if (!isPasswordMatched) {
    throw new AppError(403, 'Password do not matched!')
  }

  //create token

  const jwtPayload = {
    userId: user._id as string,
    role: user.role
  }

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_token_secret as string,
    config.jwt_access_token_expiry as string
  )

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_token_secret as string,
    config.jwt_refresh_token_expiry as string
  )

  return {
    accessToken,
    refreshToken
  }
}
//export Auth Services.
export const AuthServices = {
  registerUserIntoDB,
  loginUser
}
