import express, { Request, Response } from 'express'
import cors from 'cors'
import routers from './app/routers'

// app initialization
const app = express()

// parsers
app.use(express.json())
app.use(cors())

//router
app.use('/api/v1/', routers)

// home route
const homeRoute = async (req: Request, res: Response) => {
  res.status(200).json({
    server: 'Active',
    success: true,
    message: 'This is Home Routeeeeeeeeeeeeeeee.'
  })
}

app.get('/', homeRoute)

export default app
