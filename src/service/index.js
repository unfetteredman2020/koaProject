/*
 * @Author: unfetteredman 
 * @Date: 2021-09-30 17:00:06 
 * @Last Modified by: unfetteredman
 * @Last Modified time: 2021-10-09 16:43:49
 */

const User = require('../model/user.model')

module.exports = new class UserServie {

  // 创建用户
  async createUser (user_name, password) {
    const res = await User.create({ user_name, password });
    // console.log(`mode res`,res)
    return res
  }

  // 查询用户信息
  async getUserInfo ({id, user_name, password, is_admin}) {
    let whereOpt = {};
    id && Object.assign(whereOpt, {id});
    user_name && Object.assign(whereOpt, {user_name});
    password && Object.assign(whereOpt, {password});
    is_admin && Object.assign(whereOpt, {is_admin});
    const res = await User.findOne({
      attributes: ['id', 'user_name', 'password', 'is_admin'],
      where: whereOpt
    })
    console.log(`res`, res)
    return res ? res.dataValues : null
  }
}
