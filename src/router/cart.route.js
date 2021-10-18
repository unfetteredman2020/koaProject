const Router = require('koa-router');

const { auth } = require('../middleware/authMiddleware')

const { validator, validatorGoodsId, getCartListParamsValidator, validateRules, validateCartIdExited } = require('../middleware/cartMiddleWare')

const { addCartController, getCartListController, updateCartController, deleteCartController, selectAllCartGoodsController } = require('../controller/cart.controller')

const router = new Router({prefix: '/cart'})

router.post('/addCart', auth, validator, validatorGoodsId, addCartController)

router.post('/getCartList', auth, getCartListParamsValidator, getCartListController)

router.patch('/updateCart/:id', auth, validateRules({goods_id: 'string', goods_count: 'number', goods_selected: 'number'}), updateCartController)

router.delete('/deleteCart', auth, validateCartIdExited, deleteCartController)

router.post('/selectAllCartGoods', auth, selectAllCartGoodsController)

module.exports = router
