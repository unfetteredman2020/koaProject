/*
 * @Author: unfetteredman
 * @Date: 2021-09-30 16:57:51
 * @Last Modified by: unfetteredman
 * @Last Modified time: 2021-10-09 15:13:16
 * @description: 创建用户的controller类
 */
const { createUser, getUserInfo } = require('../service/index');

module.exports = new class User {
  async regiser (ctx) {
    // console.log(`ctx.request.body`, ctx.request.body);
    const {user_name, password}  = ctx.request.body;
    const res = await createUser(user_name, password);
    ctx.body = res;
    console.log(`res`, res);
  };
  async login (ctx, next) {
    ctx.body = 'login';
  };
}
