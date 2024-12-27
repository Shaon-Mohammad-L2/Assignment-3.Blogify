import { Blog } from '../blog/blog.model'
import { User } from '../user/user.model'

// a user blocked
const userBlockedIntoDB = async (id: string) => {
  const result = await User.findByIdAndUpdate(id, { isBlocked: true })
  return result
}

// a blog post delete
const deleteBlogPostIntoDB = async (id: string) => {
  const result = await Blog.findByIdAndDelete(id)
  return result
}
export const AdminServices = {
  userBlockedIntoDB,
  deleteBlogPostIntoDB
}
