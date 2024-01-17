const passport = require('passport')
const LocalStrategy = require('passport-local')
const passportJWT = require('passport-jwt')
const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt
const bcrypt = require('bcryptjs')
const CustomError = require('../middleware/custom-error')
const db = require('../models')
const { User } = db

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  async (req, email, password, cb) => {
    try {
      const user = await User.findOne({ where: { email } })
      if (!user) {
        throw new CustomError('使用者未註冊！', 403)
      }

      const passwordMatch = bcrypt.compareSync(password, user.password)
      if (!passwordMatch) {
        throw new CustomError('密碼輸入錯誤！', 400)
      }
  
      return cb(null, user)
    } catch (err) {
      return cb(err)
    }
  }
))

const jwtOptions = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}

passport.use(new JWTStrategy(jwtOptions, async (jwtPayload, cb) => {
  try {
    const user = await User.findByPk(jwtPayload.id)
    return cb(null, user)
  } catch (err) {
    cb(err)
  }
}))

passport.serializeUser((user, cb) => {
  cb(null, user.id)
})

passport.deserializeUser(async(id, cb) => {
  const user = await User.findByPk(id)
  return cb(null, user.toJSON())
})

module.exports = passport