if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const cors = require('cors')

const passport = require('./config/passport')
const routes = require('./routes')
const app = express()
const port = process.env.PORT || 3000

app.use(cors())

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(passport.initialize())

app.use(routes)

app.listen(port, () => {
  console.info(`App is running on http://localhost:${port}.`)
})
