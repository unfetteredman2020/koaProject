/*
 * @Author: unfetteredman
 * @Date: 2021-10-06 15:08:39
 * @Last Modified by: unfetteredman
 * @Last Modified time: 2021-10-09 14:17:39
 */

const { DataTypes } = require('sequelize');

const sequelize = require('../db/sequelize');

const User = sequelize.define('User', {
  // 在这里定义模型属性
  user_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.CHAR,
    allowNull: false,
  },
  is_admin: {
    type: DataTypes.BOOLEAN,
    defaultValue: 0,
  },
});

// User.sync({ force: true });

module.exports = User;
