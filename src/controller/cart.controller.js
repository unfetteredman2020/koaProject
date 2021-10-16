
const { createOrUpdate, getCartListService, updateCartService } = require('../service/cart.service');

const { addCartError, getCartListError, updateCartError } = require('../constant/error.type')

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
  async getCartListController (ctx) {
    try {
      const { pageSize, pageNum } = ctx.request.body;
      const res = await getCartListService( pageSize, pageNum );
      ctx.body = {
        code: '103005',
        msg: '获取购物车列表成功',
        result: res
      }
    } catch (error) {
      console.error('getCartListControllerError', error);
      getCartListError.result = error
      return ctx.app.emit('error', getCartListError, ctx )
    }
  }
  async updateCartController(ctx) {
    try {
      const id = ctx.request.params
      const { goods_count, goods_selected } = ctx.request.body;
      const res = await updateCartService({...id, goods_count, goods_selected})
      ctx.body = {
        code: '103007',
        msg: '更新购物车成功！', 
        result: res
      }
    } catch (error) {
      console.error('updateCartError', error);
      updateCartError.resut = error
      return ctx.app.emit('error', updateCartError, ctx)
    }
  }
}

module.exports = new Cart()