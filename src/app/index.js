/*
 * @Author: unfetteredman
 * @Date: 2021-09-30 16:57:51
 * @Last Modified by: unfetteredman
 * @Last Modified time: 2021-10-11 14:17:27
 * @description: koa 实例路由信息入口文件
 */

const Koa = require('koa');
const koaBody = require('koa-body');
const userRouter = require('../router/index');
const errorHandler = require('./errorHandler');

const app = new Koa();

app.use(koaBody());

app.use(userRouter.routes());

app.on('error',errorHandler)

module.exports = app;
