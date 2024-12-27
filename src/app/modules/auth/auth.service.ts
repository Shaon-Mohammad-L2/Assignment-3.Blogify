import AppError from '../../errors/AppError'
import { TUser } from '../user/user.interface'
import { User } from '../user/user.model'
import { TLoginUser } from './auth.interface'

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
const loginUser = async (payload: TLoginUser) => {}
//export Auth Services.
export const AuthServices = {
  registerUserIntoDB,
  loginUser
}
