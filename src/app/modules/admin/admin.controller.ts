import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { AdminServices } from './admin.service'

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

// delete post / blog
const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await AdminServices.deleteBlogPostIntoDB(id)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Blog deleted successfully',
    data: result
  })
})

export const AdminControllers = {
  userBlocked,
  deleteBlog
}
