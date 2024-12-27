import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
  NODE_ENV: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  database_url: process.env.DATA_BASE_URL,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS || 12
}
