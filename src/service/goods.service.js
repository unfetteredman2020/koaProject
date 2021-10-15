
const Goods  = require('../model/goods.model')
class GoodsService {
  async createGoodsService(goodsParams) {
    const res = await Goods.create(goodsParams)
    console.log(`res`, res)
    return res
  }

  async updateGoodsService(id, goods) {
    const res = await Goods.update(goods, {
      where: { id }
    })
     console.log(`res`, res)
    return  res[0] > 0 ? true : false
  }

  async offGoodsService(id) {
    const res = await Goods.destroy({
      where: { id }
    })
     console.log(`res`, res)
    return  res > 0 ? true : false
  }
  async restoreGoodsService(id) {
    const res = await Goods.restore({
      where: { id }
    })
    return  res > 0 ? true : false
  }
  async getGoodsListService(pageSize = 10, pageNum = 1) {
    const  offset = (pageNum -1) * pageSize
    // 方法1
    // const rows = await Goods.findAll({ offset, limit: pageSize*1})
    // const count = await Goods.count()
    // 方法2
    const { count, rows } = await Goods.findAndCountAll({offset, limit: pageSize})
    return {
      total: count,
      list: rows
    }
  }
}

module.exports = new GoodsService()