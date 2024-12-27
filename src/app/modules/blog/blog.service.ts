import { JwtPayload } from 'jsonwebtoken'
import { TBlog } from './blog.interface'
import { Blog } from './blog.model'

// create a blog.
const createBlogIntoDB = async (payload: TBlog, user: JwtPayload) => {
  payload.author = user.userId
  const result = await Blog.create(payload)
  return result
}

// get all blogs
const getAllBlogsFromDB = async (qurery: Record<string, unknown>) => {
  const result = await Blog.find()
  return result
}

// get single blog
const getSingleBlogFrom = async (id: string) => {
  const result = await Blog.findById(id)
  return result
}

//update a blog.
const updateBlogIntoDB = async (id: string, payload: TBlog) => {
  const result = await Blog.findByIdAndUpdate(id, { payload })
  return result
}

// delete a blog
const deleteBlogFromDB = async (id: string) => {
  const result = await Blog.findByIdAndDelete(id)
  return result
}
export const BlogServices = {
  createBlogIntoDB,
  getAllBlogsFromDB,
  getSingleBlogFrom,
  updateBlogIntoDB,
  deleteBlogFromDB
}
