const bcrypt = require('bcryptjs')
const db = require('../models')
const CustomError = require('../middleware/custom-error')
const { User } = db

const userController = {
  signUp: async (req, res, next) => {
    try {
      const { name, nickName, email, password, tel, lineId } = req.body
      if (!name || !email || !password || !tel) {
        throw new CustomError('名字、信箱、密碼、電話欄位不得空白！', 400)
      }
      let user = await User.findOne({ where: { email } })
      if (user) {
        throw new CustomError('使用者已註冊！', 400)
      }
      user = await User.create({
        name,
        nickName,
        email,
        password: bcrypt.hashSync(password, 10),
        tel,
        lineId
      })
      return res.status(200).json({ status: 'success', user })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = userController