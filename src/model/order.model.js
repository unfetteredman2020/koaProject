
const { DataTypes } = require('sequelize')

const seq = require('../db/sequelize')

const Order = seq.define('order',{
  user_id: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '用户Id'
  },
  order_no: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '订单编号'
  },
  pay_status: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '订单状态：0:已创建待支付；1:支付完成',
    defaultValue: 0
  },
  deliver_status: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '发货状态：0:未发货；1:已发货；2:已收获',
    defaultValue: 0
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '收货地址：关联address表',
    defaultValue: 0
  },
  goodsInfo: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '商品信息'
  }
})

// Order.sync({force: true})

module.exports = Order