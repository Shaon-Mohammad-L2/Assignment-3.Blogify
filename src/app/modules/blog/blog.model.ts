import mongoose, { Schema, Types } from 'mongoose'
import { BlogModel, TBlog } from './blog.interface'

const BlogSchema = new mongoose.Schema<TBlog, BlogModel>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      unique: true
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
      trim: true
    },
    author: {
      type: Schema.Types.ObjectId,
      required: [true, 'Author Details is required'],
      ref: 'User'
    },
    isPublished: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
)

BlogSchema.statics.isBlogExistsFindById = async function (id: string) {
  return await this.findById(id, {}, { skipMiddleware: true })
}

BlogSchema.statics.isBlogIsPrivate = async function (
  id: string,
  author: Types.ObjectId
) {
  const isPrivate = await this.findOne(
    { _id: id, author },
    {},
    { skipmiddleware: true }
  )

  return isPrivate?.isPublished
}

BlogSchema.pre('find', async function (next) {
  const skipMiddleware = this.getOptions().skipMiddleware

  if (!skipMiddleware) {
    this.find({ isPublished: { $ne: false } })
  }

  next()
})

BlogSchema.pre('findOne', async function (next) {
  const skipMiddleware = this.getOptions().skipMiddleware

  if (!skipMiddleware) {
    this.findOne({ isPublished: { $ne: false } })
  }
  next()
})

BlogSchema.pre('aggregate', async function (next) {
  this.pipeline().unshift({ $match: { isPublished: { $ne: false } } })

  next()
})

export const Blog = mongoose.model<TBlog, BlogModel>('Blog', BlogSchema)
