const { createOrderService } = require('../service/order.service')

const { createOrderError } = require('../constant/error.type')

class OrderController {
  async createOrderController(ctx) {
    try {
      const res = await createOrderService(ctx.request.body)
      ctx.body = {
        code: '10500',
        msg: '创建订单成功',
        result: res
      }
    } catch (error) {
      console.error('createOrderError', error)
      createOrderError.result = error
      return ctx.app.emit('error', createOrderError, ctx)
    }
  }
}

module.exports = new OrderController()