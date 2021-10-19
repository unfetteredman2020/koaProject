const Router = require('koa-router')

const router = new Router({prefix: '/order'})

const { createOrderController } = require('../controller/order.controller')

const { auth } = require('../middleware/authMiddleware')

const { validate } = require('../middleware/orderMiddleWare')

router.post('/createOrder', auth, validate({ user_id: 'string', address: 'number', goodsInfo: 'array' }),  createOrderController)

module.exports = router
