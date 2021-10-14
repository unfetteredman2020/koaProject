/*
 * @Author: unfetteredman
 * @Date: 2021-09-30 16:57:51
 * @Last Modified by: unfetteredman
 * @Last Modified time: 2021-10-14 11:00:18
 * @description: 创建用户的controller类
 */

const { createUser, getUserInfo, updataUserInfo } = require('../service/user.service')

const jwt = require('jsonwebtoken')

const SECRETKEY = "unfetteredman" // jwt 密钥

class User {
  // 用户注册
  async regiser (ctx) {
    const {user_name, password}  = ctx.request.body;
    const res = await createUser(user_name, password);
    ctx.body = {
      code: '10000',
      id: res.dataValues.id,
      user_name: res.dataValues.user_name,
      msg: '注册成功',
      result: ''
    }
  };
  // 用户登录
  async login (ctx) {
    try {
      const { user_name } = ctx.request.body;
      const { password, ...res } = await getUserInfo({user_name});
      const token = jwt.sign(res, SECRETKEY, { expiresIn: '1d' })
      ctx.body = {
        code: '0',
        msg: '登录成功',
        result: { token }
      }
    } catch (error) {
      console.error(`error`, '登录失败', error)
    }
  };
  // 修改用户信息
  async changeUserInfo (ctx) {
    const id = ctx.state.user.id
    const password = ctx.request.body.password
    if(await updataUserInfo({ id, password })) {
      ctx.body = {
        code: '100001',
        msg: '修改用户信息成功！',
        result: ''
      }
    }else {
      ctx.body = {
        code: '100002',
        msg: '修改用户信息失败！',
        result: ''
      }
    }
  }
}

module.exports = new User()
