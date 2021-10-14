/*
 * @Author: unfetteredman 
 * @Date: 2021-09-30 17:00:06 
 * @Last Modified by: unfetteredman
 * @Last Modified time: 2021-10-13 15:50:46
 */

const User = require('../model/user.model')

 class UserServie {

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

  // 修改用户信息
  async updataUserInfo ({id, user_name, password, is_admin}) {
    let whereOpt = { id };
    let newUser = {}
    id && Object.assign(newUser, {id});
    user_name && Object.assign(newUser, {user_name});
    password && Object.assign(newUser, {password});
    is_admin && Object.assign(newUser, {is_admin});
    const res = await User.update( newUser, {
      where: whereOpt
    });
    return res[0] > 0 ? true : false
  }
}

module.exports = new UserServie()