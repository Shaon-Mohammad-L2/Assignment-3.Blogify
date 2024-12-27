import { Model } from 'mongoose'

export type TRole = 'admin' | 'user'
export interface TUser {
  _id?: string
  name: string
  email: string
  password: string
  role: TRole
  isBlocked: boolean
  isDeleted: boolean
}

export interface UserModel extends Model<TUser> {
  isUserExistsByEmail(email: string): Promise<TUser>
  isUserExistsBy_id(id: string): Promise<TUser>
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string
  ): Promise<boolean>
}
