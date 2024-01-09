const bcrypt = require('bcryptjs')
const db = require('../models')
const { User } = db

const userController = {
  signUp: async (req, res) => {
    try {
      const { name, nickName, email, password, tel, lineId } = req.body
      if (!name || !email || !password || !tel) {
        return res.status(400).json({ status: 'error', error: '名字、信箱、密碼、電話欄位不得空白！' })
      }
      let user = await User.findOne({ where: { email } })
      if (user) {
        return res.status(400).json({ status: 'error', error: '使用者已註冊！' })
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
      return res.status(500).json({ error: 'error', err })
    }
  }
}

module.exports = userController