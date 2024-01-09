const express = require('express')
const router = express.Router()

const userController = require('../controllers/user-controller')

router.post('/api/users/signup', userController.signUp)
router.get('/', (req, res) => res.send('Hello, world!'))

module.exports = router