import express from 'express'
import { AdminControllers } from './admin.controller'

const router = express.Router()

router.patch('/users/:userId/block', AdminControllers.userBlocked)
router.delete('/blogs/:id', AdminControllers.deleteBlog)

export const AdminRoutes = router
