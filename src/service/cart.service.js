const { Op } = require('sequelize')

const Cart = require('../model/cart.model')

class CartService {
  async createOrUpdate(goods) {
    const { user_id, goods_id } = goods
    let res = await Cart.findOne({
      where: {
        [Op.and]: {
          goods_id,
          user_id,
        }
      }
    })
    if(res) {
      await res.increment('goods_count')
      return  await res.reload()
    }else {
      return await  Cart.create(goods)
    }
  }

  async validateGoodsIdExistService (goodId) {
    let whereOpt = { goods_id: goodId }
    let res = await Cart.findOne({
      where: {
        [Op.and]: {
          goods_id: goodId,
        }
      }
    })
    return res ? res.dataValues : null
  }
}

module.exports = new CartService()