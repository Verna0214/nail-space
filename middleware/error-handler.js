const CustomError = require('./custom-error')

module.exports = {
  apiErrorHandler (err, req, res, next) {
    if (err instanceof CustomError) {
      res.status(err.status).json({
        status: 'error',
        message: `${err.message}`
      })
    } else {
      res.status(500).json({
        status: 'error',
        message: `${err}`
      })
    }
    next(err)
  }
}