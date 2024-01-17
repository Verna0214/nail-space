const express = require('express')
const router = express.Router()

const passport = require('../config/passport')
const { apiErrorHandler } = require('../middleware/error-handler')
const { authenticated, authenticatedAdmin } = require('../middleware/auth')
const userController = require('../controllers/user-controller')
const serviceController = require('../controllers/service-controller')

router.post('/api/users/signin', passport.authenticate('local', { session: false }), userController.signIn)
router.post('/api/users/signup', userController.signUp)
router.get('/api/reservation', authenticated, serviceController.getReservation)
router.post('/api/reservation', authenticated, serviceController.postReservation)
router.get('/', (req, res) => res.send('Hello, world!'))
router.use('/', apiErrorHandler)

module.exports = router