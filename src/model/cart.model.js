const { DataTypes } = require('sequelize');

const seq  = require('../db/sequelize')

const Goods = require('./goods.model')

const Cart = seq.define('cart', {
  user_id: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '用户Id'
  },
  goods_id: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '商品Id'
  },
  goods_count: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '商品数量',
    defaultValue: 1
  },
  goods_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    comment: '商品价格'
  },
  goods_img: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: '商品图片'
  },
  goods_sku: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: '商品分类'
  },
  goods_selected: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: '是否选中',
    defaultValue: 0
  },
})

Cart.belongsTo(Goods,{
  foreignKey: 'goods_id',
  as: 'goods_info'
})

// Cart.sync({ force: true })

module.exports = Cart