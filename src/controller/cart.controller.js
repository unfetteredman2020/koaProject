
const { createOrUpdate } = require('../service/cart.service');

const { addCartError } = require('../constant/error.type')

class Cart {
  async addCartController (ctx) {
    try {
      ctx.request.body.goods_img = JSON.stringify(ctx.request.body.goods_img)
      ctx.request.body.goods_sku = JSON.stringify(ctx.request.body.goods_sku)
      const res = await createOrUpdate(ctx.request.body)
      ctx.body = res
    } catch (error) {
      console.error('addCartController error', error)
      addCartError.result = error
      return ctx.app.emit('error', addCartError, ctx)
    }
  }
}

module.exports = new Cart()