/*
 * @Author: unfetteredman
 * @Date: 2021-09-30 16:57:01
 * @Last Modified by: unfetteredman
 * @Last Modified time: 2021-10-11 15:59:25
 * @description: 路由文件
 */

const Router = require('koa-router');

const { regiser, login, changeUserInfo } = require('../controller/user.controller');

const { userValidate, VerifyUser, bcryptPassword, validateLogin } = require('../middleware/userMiddleware')

const { auth } = require('../middleware/authMiddleware');

const router = new Router({ prefix: '/users' });

router.post('/register',userValidate, VerifyUser, bcryptPassword, regiser);

router.post('/login', userValidate, validateLogin, login);

router.patch('/', auth, bcryptPassword, changeUserInfo)

module.exports = router;
