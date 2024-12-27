import mongoose from 'mongoose'
import { TUser, UserModel } from './user.interface'
import { UserRole } from './user.constant'
import bcrypt from 'bcrypt'
import config from '../../config'

const UserSchema = new mongoose.Schema<TUser, UserModel>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      trim: true,
      select: 0
    },
    role: {
      type: String,
      enum: UserRole,
      default: 'user'
    },
    isBlocked: {
      type: Boolean,
      default: false
    },
    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
)

// this methods for checking user already exists in database.
UserSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await User.findOne({ email }).select('+password')
}

// pre middleware hook for password hashing before document save.
UserSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds)
  )
  next()
})

// post middleware hook for password avoing in client side after document save.
UserSchema.post('save', function (doc, next) {
  doc.password = ''
  next()
})

export const User = mongoose.model<TUser, UserModel>('User', UserSchema)
