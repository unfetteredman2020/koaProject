const { uploadParamsError } = require('../constant/error.type')
const validator = async (ctx,next) => {
  try {
    ctx.verifyParams({
      goods_name: {type: 'string', required: true},
      goods_num: {type: 'number', required: true},
      goods_price: {type: 'number', required: true},
      goods_img:  {type: 'array', required: true, itemType: 'string'},
      goods_description: {type: 'string', required: true}
    });
    
  } catch (error) {
    console.error('err goods upload', error)
    uploadParamsError.result = error  // 将错误对象传给result对象上面返回给接口
    return ctx.app.emit('error', uploadParamsError, ctx)
  }
  await  next()
}

module.exports = {
  validator
}