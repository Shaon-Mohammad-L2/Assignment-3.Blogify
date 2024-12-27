import config from '../config'
import AppError from '../errors/AppError'
import { TRole } from '../modules/user/user.interface'
import { User } from '../modules/user/user.model'
import catchAsync from '../utils/catchAsync'
import jwt, { JwtPayload } from 'jsonwebtoken'

export const auth = (...requeredRole: TRole[]) => {
  return catchAsync(async (req, res, next) => {
    // console.log(req.cookies, req.headers.authorization)
    const token = req.headers.authorization?.split(' ')[1]

    // check token is exists
    if (!token) {
      throw new AppError(401, 'You are not authorized!')
    }

    // check valid token
    const decoded = jwt.verify(
      token,
      config.jwt_access_token_secret as string
    ) as JwtPayload

    const { userId, role } = decoded

    //checking if the user is exist in the database

    const user = await User.isUserExistsBy_id(userId)
    if (!user) {
      throw new AppError(401, 'Invalid credentials')
    }

    // checking if the user is alrady deleted.
    const isDeleted = user?.isDeleted
    if (isDeleted) {
      throw new AppError(404, 'User not found!')
    }

    // checking if the user is blocked
    const isBlocked = user?.isBlocked
    if (isBlocked) {
      throw new AppError(400, 'User is blocked!')
    }

    // role check
    if (user.role !== role) {
      throw new AppError(403, 'You are not authorized!')
    }

    // checking required role.
    if (requeredRole && !requeredRole.includes(role)) {
      throw new AppError(401, 'You are not authorized!')
    }

    // set the user to request object.
    req.user = decoded as JwtPayload

    next()
  })
}
