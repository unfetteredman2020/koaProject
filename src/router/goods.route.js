
const path = require('path')

const Router = require('koa-router');

const { upload, goodsUploadController, goodsUpdateController, offGoodsController, restoreGoodController, getGoodsListController } = require('../controller/goods.controller')

const { auth, hadAdminpermission } = require('../middleware/authMiddleware');

const { validator } = require('../middleware/goodsMiddleWare')

const router = new Router({ prefix: '/goods' });

router.post('/upload',auth, hadAdminpermission, upload);

router.post('/createGoods',auth, hadAdminpermission, validator, goodsUploadController)

router.put('/updateGoods/:id',auth,hadAdminpermission, validator, goodsUpdateController)

router.post('/:id/off', auth, hadAdminpermission, offGoodsController)

router.post('/:id/on', auth, hadAdminpermission, restoreGoodController)

router.get('/getGoodsList', getGoodsListController);

module.exports = router
