const { Op } = require('sequelize')

const Cart = require('../model/cart.model')
const Goods = require('../model/goods.model')

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

  async validateCartIdExistService (id) {
    let res = await Cart.findOne({
      where: {
        [Op.and]: {
          id,
        }
      }
    })
    return res ? res.dataValues : null;
  }

  async getCartListService (pageSize, pageNum) {
    const offset = (pageNum-1) * pageSize;
    let { rows, count } = await Cart.findAndCountAll({
      offset,
      limit: pageSize * 1,
      include: {
        model: Goods,
        as: 'goods_info',
        attributes: ['goods_name','goods_price','goods_img']
      }
    })
    return {
      pageSize,
      pageNum,
      list: rows,
      total: count
    }
  }
  async updateCartService(cartParams) {
    console.log(`cartParms`, cartParams)
    const { id, goods_count, goods_selected } = cartParams
    const res = await Cart.findByPk(id);
    if(!res) return null
    goods_count ? (res.goods_count = goods_count): '';
    goods_selected ? (res.goods_selected = goods_selected) : '';
    return await  res.save()
  }
}

module.exports = new CartService()