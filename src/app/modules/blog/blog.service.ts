import { JwtPayload } from 'jsonwebtoken'
import { TBlog } from './blog.interface'
import { Blog } from './blog.model'
import AppError from '../../errors/AppError'
import QueryBuilder from '../../builder/QueryBuilder'
import { blogSearchableFileds } from './blog.constant'

// create a blog.
const createBlogIntoDB = async (payload: TBlog, user: JwtPayload) => {
  payload.author = user.userId
  const result = await Blog.create(payload)
  return result
}

// get all blogs
const getAllBlogsFromDB = async (qurery: Record<string, unknown>) => {
  const blogQuery = new QueryBuilder(
    Blog.find().populate('author', 'name'),
    qurery
  )
    .search(blogSearchableFileds)
    .filter('author')
    .sort()
  const result = await blogQuery.modelQuery
  return result
}

//update a blog.
const updateBlogIntoDB = async (
  id: string,
  payload: TBlog,
  user: JwtPayload
) => {
  const blogOwner = await Blog.findOne(
    { _id: id, author: user.userId },
    {},
    { skipMiddleware: true }
  )
  if (!blogOwner) {
    throw new AppError(404, 'Blog not found')
  }

  const isPrivate = await Blog.isBlogIsPrivate(id, user.userId)
  if (!isPrivate) {
    throw new AppError(400, 'This blog is private! You can not modify it.')
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
