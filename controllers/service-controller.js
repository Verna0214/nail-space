const db = require('../models')
const CustomError = require('../middleware/custom-error')
const { Service, Item, Order, Reservation } = db

const serviceController = {
  postReservation: async (req, res, next) => {
    try {
      const userId = req.user.id
      const { date, time, items } = req.body
      if (!date || !time) {
        throw new CustomError('欄位不得空白！', 400)
      }

      if (!items.length) {
        throw new CustomError('請選擇預約服務！', 400)
      }

      const reservation = await Reservation.create({
        date,
        time,
        userId
      })

      const orders = await Order.bulkCreate(
        items.map((itemId) => ({
          reservationId: reservation.id,
          itemId
        }))
      )

      return res.status(200).json({ status: 'success', reservation, orders })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = serviceController