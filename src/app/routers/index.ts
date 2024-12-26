import { Request, Response, Router } from 'express'

const routers = Router()

const moduleRoutes = [
  {
    path: '/',
    route: (req: Request, res: Response) => {
      res.send('I am Active')
    }
  }
]

moduleRoutes.forEach(route => {
  routers.use(route.path, route.route)
})
export default routers
