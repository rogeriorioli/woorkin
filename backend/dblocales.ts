import dotenv from 'dotenv'

dotenv.config()


module.exports = {

  // Development Environment

  development: {
    database: {
      host: 'localhost',
      user: `docker`,
      password: `docker`,
      database: `recrurajr`,
    }
  },

  // Production Environment

  production: {
    database: {
      host: `${process.env.DB_HOST}`,
      user: `${process.env.DB_USER}`,
      password: `${process.env.DB_PASS}`,
      database: `${process.env.DB_DATABASE}`,
    }
  }
};