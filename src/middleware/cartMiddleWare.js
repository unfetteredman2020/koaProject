
const { validatorGoodsParamsError, validateGoodsIdExistServiceError } = require('../constant/error.type');
const { validateGoodsIdExistService } = require('../service/cart.service')
const validator = async (ctx, next) => {
  try {
    ctx.verifyParams({
      goods_id: { type: 'number', required: true },
      user_id: { type: 'string', required: true },
      goods_count: { type: 'number', required: true },
      goods_price: { type: 'number', required: true },
      goods_img:  {type: 'array', required: true, itemType: 'string'},
      goods_sku:  {type: 'array', required: true, itemType: 'string'},
      goods_selected: { type: 'number' }
    })
  } catch (error) {
    console.log(`cart verifyParams error`, error);
    validatorGoodsParamsError.result = error
    return  ctx.app.emit('error', validatorGoodsParamsError, ctx);
  }
  await  next()
}

const validatorGoodsId = async (ctx, next) => {
  try {
    const res = await validateGoodsIdExistService(ctx.request.body.goods_id)
    if(res) {
      await next();
    } else {
      return ctx.app.emit('error', validateGoodsIdExistServiceError, ctx);
    }
  } catch (error) {
    console.log(`validateGoodsIdExistServiceError`, error)
    validateGoodsIdExistServiceError.result = error
    return ctx.app.emit('error', validateGoodsIdExistServiceError, ctx)
  }
}

module.exports = {
  validator,
  validatorGoodsId,
}