const Router = require('koa-router');

const router = new Router({prefix: '/address'})

const { auth } = require('../middleware/authMiddleware')

const { addressController, delAddressController, getAddressListController, updateAddressController } =require('../controller/address.controller.js')

const { validate } = require('../middleware/addressMiddleware')

router.post('/addAddress',auth, validate({user_id: 'string', user_name: 'string', mobile: 'string', region: 'string', detailedAddress: 'string', houseNumber: 'string'}), addressController)

router.delete('/delAddress',auth, validate({user_id: 'string', id: 'array'}), delAddressController)

router.get('/getAddressList/:id',auth, validate({id: 'string'}), getAddressListController)

router.patch('/updateAddress', auth, validate({user_id: 'string', id: 'number'}), updateAddressController)

module.exports = router