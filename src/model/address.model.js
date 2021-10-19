const { DataTypes } = require('sequelize')

const seq = require('../db/sequelize')

const Addres = seq.define('address', {
  user_id: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '用户ID',
  },
  default_address: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    comment: '是否默认地址',
    defaultValue: false
  },
  user_name: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '收件人姓名',
  },
  mobile: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '收件人手机号码'
  },
  region: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '收件人地区'
  },
  detailedAddress: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '收件人详细地址'
  },
  houseNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '收件人门牌号'
  }
})

// Addres.sync({force: true})

module.exports = Addres

