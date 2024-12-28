import AppError from '../../errors/AppError'
import { Blog } from '../blog/blog.model'
import { User } from '../user/user.model'

const getAllUsersFromDB = async () => {
  const result = await User.find()
  return result
}

const getSingleUserFromDB = async (userId: string) => {
  if (await User.isUserAlreadyDeleted(userId)) {
    return 'This user is already deleted!'
  }

  const result = await User.findById(userId)
  return result
}

// a user blocked
const userBlockedIntoDB = async (id: string) => {
  if (await User.isUserAlreadyDeleted(id)) {
    throw new AppError(400, 'This user alredy deleted! You Can not modifed!')
  }
  await User.findByIdAndUpdate(id, { isBlocked: true })
}
// a user blocked
const userDeletedIntoDB = async (id: string) => {
  if (!(await User.isUserExistsBy_id(id))) {
    throw new AppError(404, 'This user is not found!')
  }
  if (await User.isUserAlreadyDeleted(id)) {
    throw new AppError(400, 'This user alredy deleted! You Can not modifed!')
  }
  await User.findByIdAndUpdate(id, { isDeleted: true })
}

// ================ Blog releted Services.

// get single blog
const getSingleBlogFromDB = async (id: string) => {
  const result = await Blog.findById(id, {}, { skipMiddleware: true }).populate(
    'author'
  )
  return result
}

// a blog post is private
const privateTheBlogIntoDB = async (id: string) => {
  const blog = await Blog.isBlogExistsFindById(id)
  if (!blog) {
    return { message: 'Blog not found' }
  }
  await Blog.findByIdAndUpdate(id, { isPublished: false }, { new: true })
}

// a blog post delete
const deleteBlogPostIntoDB = async (id: string) => {
  const blog = await Blog.isBlogExistsFindById(id)
  if (!blog) {
    return { message: 'Blog not found' }
  }
  await Blog.findByIdAndDelete(id)
}

export const AdminServices = {
  getAllUsersFromDB,
  getSingleUserFromDB,
  userBlockedIntoDB,
  userDeletedIntoDB,
  getSingleBlogFromDB,
  privateTheBlogIntoDB,
  deleteBlogPostIntoDB
}
