import { Router } from 'express'
import { AuthRoutes } from '../modules/auth/auth.route'
import { BlogRoutes } from '../modules/blog/blog.route'
import { AdminRoutes } from '../modules/admin/admin.route'

const routers = Router()

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes
  },
  {
    path: '/blogs',
    route: BlogRoutes
  },
  {
    path: '/admin',
    route: AdminRoutes
  }
]

moduleRoutes.forEach(route => {
  routers.use(route.path, route.route)
})
export default routers
