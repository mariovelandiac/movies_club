require('dotenv').config();

const config = {
  env: process.env.NODE_ENV ||'dev',
  isProd: process.env.NODE_ENV === 'production',
  port: process.env.PORT,
  dbURL: process.env.DATABASE_URL,
  apiKey: process.env.API_KEY,
  jwtsecret: process.env.JWT_SECRET,
  mailuser: process.env.EMAIL_USER,
  mailpassword: process.env.EMAIL_PASSWORD
}

module.exports = {config}
