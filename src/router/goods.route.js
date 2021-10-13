
const path = require('path')

const Router = require('koa-router');

const { auth, hadAdminpermission } = require('../middleware/authMiddleware');

const router = new Router({ prefix: '/goods' });

router.post('/upload',auth, hadAdminpermission, (ctx,next)=>{
  const { file }  = ctx.request.files
  if(file) {
    ctx.body = {
      code: '0',
      msg: '图片上传成功！',
      result: {
        upload_img: path.basename(file.path)
      }
    }
  }
});

module.exports = router
