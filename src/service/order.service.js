
const Order = require('../model/order.model')
class OrderService {
  async createOrderService(params) {
    console.log(`params`, params)
    params.order_no = 'No' + Date.now();
    params.goodsInfo = JSON.stringify( params.goodsInfo)
    return await Order.create(params)
  }
}

module.exports = new OrderService()