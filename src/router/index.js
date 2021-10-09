/*
 * @Author: unfetteredman
 * @Date: 2021-09-30 16:57:01
 * @Last Modified by: unfetteredman
 * @Last Modified time: 2021-10-09 15:14:43
 * @description: 路由文件
 */

const Router = require('koa-router');

const { regiser, login } = require('../controller/user.controller');

const { userValidate, VerifyUser } = require('../middleware/userMiddleware')

const router = new Router({ prefix: '/users' });

router.post('/register',userValidate, VerifyUser, regiser);

router.get('/login', login);

module.exports = router;
