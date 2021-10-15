const Router = require('koa-router');

const { auth } = require('../middleware/authMiddleware')

const { validator, validatorGoodsId } = require('../middleware/cartMiddleWare')

const { addCartController } = require('../controller/cart.controller')

const router = new Router({prefix: '/cart'})

router.post('/addCart', auth, validator, validatorGoodsId, addCartController)

module.exports = router
