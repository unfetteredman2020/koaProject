
const path = require('path')

const Router = require('koa-router');

const { upload, goodsUpload, goodsUpdate } = require('../controller/goods.controller')
const { auth, hadAdminpermission } = require('../middleware/authMiddleware');

const router = new Router({ prefix: '/goods' });

router.post('/upload',auth, hadAdminpermission, upload);

router.post('/createGoods',auth, hadAdminpermission, goodsUpload)

router.put('/updateGoods/:id',auth,hadAdminpermission, goodsUpdate)

module.exports = router
