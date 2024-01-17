const passport = require('../config/passport')
const CustomError = require('./custom-error')

module.exports = {
  authenticated: passport.authenticate('jwt', { session: false }),
  authenticatedAdmin: (req, res, next) => {
    if (req.user && req.user.isAdmin) return next()
    throw new CustomError('未有管理者權限', 403)
  }
}

