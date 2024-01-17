const db = require('../models')
const CustomError = require('../middleware/custom-error')
const { Service, Item, Order, Reservation } = db

const serviceController = {
  postReservation: async (req, res, next) => {
    try {
      const userId = req.user
      return res.status(200).json({ status: 'success', userId })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = serviceController