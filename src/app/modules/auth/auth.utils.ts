import jwt from 'jsonwebtoken'
import { TRole } from '../user/user.interface'

export const createToken = (
  jwtPayload: { userId: string; role: TRole },
  jwtSecret: string,
  expiresIn: string
) => {
  return jwt.sign(jwtPayload, jwtSecret, { expiresIn })
}
