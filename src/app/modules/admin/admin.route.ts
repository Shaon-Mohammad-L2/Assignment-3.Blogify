import express from 'express'
import { AdminControllers } from './admin.controller'
import { auth } from '../../middleware/auth'

const router = express.Router()
//users releted api.
router.get('/users', auth('admin'), AdminControllers.getAllUsers)
router.get('/users/:userId', auth('admin'), AdminControllers.getSingleUser)

router.patch(
  '/users/:userId/block',
  auth('admin'),
  AdminControllers.userBlocked
)

router.patch(
  '/users/:userId/delete',
  auth('admin'),
  AdminControllers.userDeleted
)

// blogs releted api.
router.get('/blogs/:id', auth('admin'), AdminControllers.getSingleBlog)
router.patch(
  '/blogs/:id/private',
  auth('admin'),
  AdminControllers.privateTheBlog
)
router.delete('/blogs/:id', auth('admin'), AdminControllers.deleteBlog)

export const AdminRoutes = router
