/*
 * @Author: unfetteredman
 * @Date: 2021-09-30 16:57:51
 * @Last Modified by: unfetteredman
 * @Last Modified time: 2021-10-11 16:07:08
 * @description: 创建用户的controller类
 */
const { createUser } = require('../service/index');

const { getUserInfo } = require('../service/index')

const jwt = require('jsonwebtoken')

const SECRETKEY = "unfetteredman" // jwt 密钥

module.exports = new class User {
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
      // return ctx.app.emit('error', invalidTokenError, ctx)
    }
  };
  // 修改用户信息
  async changeUserInfo (ctx) {
    ctx.body = {
      msg: '修改用户信息成功！'
    }
  }
}
