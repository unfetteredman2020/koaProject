const Router = require('koa-router');

const { auth } = require('../middleware/authMiddleware')

const { validator, validatorGoodsId, getCartListParamsValidator, validateRules } = require('../middleware/cartMiddleWare')

const { addCartController, getCartListController, updateCartController } = require('../controller/cart.controller')

const router = new Router({prefix: '/cart'})

router.post('/addCart', auth, validator, validatorGoodsId, addCartController)

router.post('/getCartList', auth, getCartListParamsValidator, getCartListController)

router.patch('/updateCart/:id', auth, validateRules({goods_id: 'string', goods_count: 'number', goods_selected: 'number'}), updateCartController)

module.exports = router
