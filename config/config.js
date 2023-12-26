if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
module.exports = {
  development: {
    username: "root",
    password: process.env.SQL_PASSWORD,
    database: "nailSpace",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql"
  }
}