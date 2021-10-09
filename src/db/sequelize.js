/*
 * @Author: unfetteredman
 * @Date: 2021-10-04 23:38:55
 * @Last Modified by: unfetteredman
 * @Last Modified time: 2021-10-06 15:11:05
 */

//  npm install --save sequelize  安装数据库🔗链接
//  npm install --save mysql2 安装mysql驱动

const { Sequelize } = require('sequelize');
// const { APP_DB_HOST, APP_DB_USERNAME, } = require('../config/config.defautlt')

// 方法 2: 分别传递参数 (其它数据库)
const sequelize = new Sequelize('koadb', 'root', '123456', {
  host: 'localhost',
  dialect: 'mysql', /* 选择 'mysql' | 'mariadb' | 'postgres' | 'mssql' 其一 */
});

// sequelize.authenticate().then(() => {
//   console.log('success');
// }).catch((err) => {
//   console.log('sqlerr', err);
// });

module.exports = sequelize;
