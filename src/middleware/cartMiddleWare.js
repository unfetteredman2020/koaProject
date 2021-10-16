const { validatorGoodsParamsError, validateGoodsIdExistServiceError, validaterParamsError, validateCartParamsError} = require('../constant/error.type');

const { validateGoodsIdExistService } = require('../service/goods.service')

// 校验上传商品参数格式
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
// 校验商品Id是否存在
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
// 获取购物车列表参数校验
const getCartListParamsValidator = async (ctx, next) => {
  try {
    ctx.verifyParams({
      pageSize: {type: 'number', required: true},
      pageNum: {type: 'number', required: true},
    })
    await next()
  } catch (error) {
    console.error('getCartListParamsValidator', error)
    validaterParamsError.result = error
    return ctx.app.emit('error', validaterParamsError, ctx)
  }
  
}

// 通过传校验规则去校验参数是否通过func
/**
 * 
 * @param {*} rules Object
 * @description { params1: 'number', params2: 'string' }
 */
const validateRules = rules => {
  return async (ctx, next) => {
    try {
      ctx.verifyParams(rules)
      await next()
    } catch (error) {
      console.error('validateCartParamsError', error)
      validateCartParamsError.result = error
      return ctx.app.emit('error', validateCartParamsError, ctx)
    }
  }
}

module.exports = {
  validator,
  validatorGoodsId,
  getCartListParamsValidator,
  validateRules
}