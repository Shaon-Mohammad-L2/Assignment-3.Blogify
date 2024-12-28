import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { AdminServices } from './admin.service'

const getAllUsers = catchAsync(async (req, res) => {
  const result = await AdminServices.getAllUsersFromDB()

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Users fetched successfully',
    data: result || 'not found!'
  })
})

const getSingleUser = catchAsync(async (req, res) => {
  const { userId } = req.params
  const result = await AdminServices.getSingleUserFromDB(userId)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User fetched successfully',
    data: result || 'not found!'
  })
})

// block user
const userBlocked = catchAsync(async (req, res) => {
  const { userId } = req.params
  const result = await AdminServices.userBlockedIntoDB(userId)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User blocked successfully',
    data: result
  })
})
// delete user
const userDeleted = catchAsync(async (req, res) => {
  const { userId } = req.params
  const result = await AdminServices.userDeletedIntoDB(userId)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User deleted successfully',
    data: result
  })
})

// ================Blogs Releted Controllers .

//fatch a single blog
const getSingleBlog = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await AdminServices.getSingleBlogFromDB(id)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Blog fetched successfully',
    data: result || 'not found'
  })
})

//private a single blog
const privateTheBlog = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await AdminServices.privateTheBlogIntoDB(id)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: result?.message ? result.message : 'Blog Privated successfully',
    data: result?.message || result
  })
})

// delete post / blog
const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await AdminServices.deleteBlogPostIntoDB(id)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: result?.message ? result.message : 'Blog deleted successfully',
    data: result?.message || result
  })
})

export const AdminControllers = {
  getAllUsers,
  getSingleUser,
  userBlocked,
  userDeleted,
  getSingleBlog,
  privateTheBlog,
  deleteBlog
}
