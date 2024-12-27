import { Server } from 'http'
import mongoose from 'mongoose'
import config from './app/config'
import app from './app'

let server: Server

async function main() {
  try {
    await mongoose.connect(config.database_url as string)
    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`)
    })
  } catch (err) {
    console.log('Error From Server', err)
  }
}

main()

// unhandle reject
process.on('unhandledRejection', () => {
  console.log('😡 Unhandle Rejection is Detected. Shutting Down....')
  if (server) {
    server.close(() => {
      process.exit(1)
    })
  }
  process.exit(1)
})

//  Uncaught Exception
process.on('uncaughtException', () => {
  console.log('😡 Uncaught Exception is Detected. Shutting Down....')
  process.exit(1)
})
