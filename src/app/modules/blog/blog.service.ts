import { JwtPayload } from 'jsonwebtoken'
import { TBlog } from './blog.interface'
import { Blog } from './blog.model'
import AppError from '../../errors/AppError'

// create a blog.
const createBlogIntoDB = async (payload: TBlog, user: JwtPayload) => {
  payload.author = user.userId
  const result = await Blog.create(payload)
  return result
}

// get all blogs
const getAllBlogsFromDB = async (qurery: Record<string, unknown>) => {
  const result = await Blog.find().populate('author', 'name')
  return result
}

//update a blog.
const updateBlogIntoDB = async (
  id: string,
  payload: TBlog,
  user: JwtPayload
) => {
  const isPrivate = await Blog.isBlogIsPrivate(id, user.userId)
  if (!isPrivate) {
    throw new AppError(400, 'This blog is private! You can not modify it.')
  }

  const blogOwner = await Blog.findOne({ _id: id, author: user.userId })
  if (!blogOwner) {
    throw new AppError(404, 'Blog not found')
  }

  const result = await Blog.findByIdAndUpdate(id, payload, { new: true })
  return result
}

// delete a blog
const deleteBlogFromDB = async (id: string, user: JwtPayload) => {
  const blogOwner = await Blog.findOne(
    { _id: id, author: user.userId },
    {},
    { skipMiddleware: true }
  )
  if (!blogOwner) {
    throw new AppError(404, 'Blog not found')
  }
  await Blog.findByIdAndDelete(id)
}
export const BlogServices = {
  createBlogIntoDB,
  getAllBlogsFromDB,
  updateBlogIntoDB,
  deleteBlogFromDB
}
