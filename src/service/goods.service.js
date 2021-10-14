
const Goods  = require('../model/goods.model')
class GoodsService {
  async createGoods(goodsParams) {
    const res = await Goods.create(goodsParams)
    console.log(`res`, res)
    return res.dataValues
  }
  
  async updateGoodsService(id, goods) {
    const res = await Goods.update(goods, {
      where: { id }
    })
     console.log(`res`, res)
    return  res[0] > 0 ? true : false
  }
}

module.exports = new GoodsService()