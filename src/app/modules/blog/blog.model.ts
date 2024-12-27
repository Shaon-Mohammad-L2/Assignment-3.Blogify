import mongoose, { Schema } from 'mongoose'
import { TBlog } from './blog.interface'

const BlogSchema = new mongoose.Schema<TBlog>(
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
      required: [true, 'Author Details is required']
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

export const Blog = mongoose.model<TBlog>('Blog', BlogSchema)
