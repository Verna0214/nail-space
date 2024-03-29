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
    host: process.env.RDS_HOSTNAME,
    username: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    port: process.env.RDS_PORT,
    database: process.env.RDS_DB_NAME,
    dialect: 'mysql'
  }
}