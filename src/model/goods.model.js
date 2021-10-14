
const { DataTypes } = require('sequelize');

const sequelize = require('../db/sequelize');

const Goods = sequelize.define('goods', {
  goods_name: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '商品名称'
  },
  goods_num: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '商品数量'
  },
  goods_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    comment: '商品价格'
  },
  goods_img: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '商品图片'
  },
  goods_description: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '商品描述'
  }},
  {
    paranoid: true
  }
)

// Goods.sync({ force: true });

module.exports  = Goods