const express = require('express')
const router = express.Router()

const { apiErrorHandler } = require('../middleware/error-handler')
const userController = require('../controllers/user-controller')

router.post('/api/users/signup', userController.signUp)
router.get('/', (req, res) => res.send('Hello, world!'))
router.use('/', apiErrorHandler)

module.exports = router