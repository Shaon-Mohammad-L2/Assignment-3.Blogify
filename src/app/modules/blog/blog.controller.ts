import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { BlogServices } from './blog.service'

//create a blog
const createBlog = catchAsync(async (req, res) => {
  const result = await BlogServices.createBlogIntoDB(req.body, req.user)

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Blog created successfully',
    data: result
  })
})

// fetch all blogs
const getAllBlogs = catchAsync(async (req, res) => {
  const result = await BlogServices.getAllBlogsFromDB(req.query)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Blogs fetched successfully',
    data: result
  })
})

//fatch a single blog
const getSingle = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await BlogServices.getSingleBlogFrom(id)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Blog fetched successfully',
    data: result
  })
})

// update a single blog
const updateBlog = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await BlogServices.updateBlogIntoDB(id, req.body)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Blog updated successfully',
    data: result
  })
})

// delete a single blog
const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await BlogServices.deleteBlogFromDB(id)

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Blog deleted successfully',
    data: result
  })
})

// export Blog controllers
export const BlogControllers = {
  createBlog,
  getAllBlogs,
  getSingle,
  updateBlog,
  deleteBlog
}
