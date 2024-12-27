import { Model } from 'mongoose'

type TRole = 'admin' | 'user'
export interface TUser {
  name: string
  email: string
  password: string
  role: TRole
  isBlocked: boolean
  isDeleted: boolean
}

export interface UserModel extends Model<TUser> {
  isUserExistsByEmail(email: string): Promise<TUser>
}
