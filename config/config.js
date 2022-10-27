module.exports = {
    "local": {
      "username": process.env.LOCAL_DB_USERNAME,
      "password": process.env.LOCAL_DB_PASSWORD,
      "database": process.env.LOCAL_DB_DATABASE_NAME,
      "host": process.env.LOCAL_DB_HOST_ADDRESS,
      "dialect": process.env.LOCAL_DB_DIALECT,
      "port": process.env.LOCAL_DB_PORT,
      "logging": true
    },
    "development": {
      "username": process.env.DEVELOPMENT_DB_USERNAME,
      "password": process.env.DEVELOPMENT_DB_PASSWORD,
      "database": process.env.DEVELOPMENT_DB_DATABASE_NAME,
      "host": process.env.DEVELOPMENT_DB_HOST_ADDRESS,
      "dialect": process.env.DEVELOPMENT_DB_DIALECT,
      "port": process.env.DEVELOPMENT_DB_PORT,
      "logging": false
    },
    "test": {
      "username": process.env.TEST_DB_USERNAME,
      "password": process.env.TEST_DB_PASSWORD,
      "database": process.env.TEST_DB_DATABASE_NAME,
      "host": process.env.TEST_DB_HOST_ADDRESS,
      "dialect": process.env.TEST_DB_DIALECT,
      "port": process.env.TEST_DB_PORT,
      "logging": false
    },
    "pre-production": {
      "username": process.env.PRE_PRODUCTION_DB_USERNAME,
      "password": process.env.PRE_PRODUCTION_DB_PASSWORD,
      "database": process.env.PRE_PRODUCTION_DB_DATABASE_NAME,
      "host": process.env.PRE_PRODUCTION_DB_HOST_ADDRESS,
      "dialect": process.env.PRE_PRODUCTION_DB_DIALECT,
      "port": process.env.PRE_PRODUCTION_DB_PORT,
      "logging": false
    },
    "production": {
      "username": process.env.PRODUCTION_DB_USERNAME,
      "password": process.env.PRODUCTION_DB_PASSWORD,
      "database": process.env.PRODUCTION_DB_DATABASE_NAME,
      "host": process.env.PRODUCTION_DB_HOST_ADDRESS,
      "dialect": process.env.PRODUCTION_DB_DIALECT,
      "port": process.env.PRODUCTION_DB_PORT,
      "logging": false
    },
  }