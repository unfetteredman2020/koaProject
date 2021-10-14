/*
 * @Author: unfetteredman
 * @Date: 2021-09-30 16:57:51
 * @Last Modified by: unfetteredman
 * @Last Modified time: 2021-10-13 11:02:53
 * @description: koa 实例路由信息入口文件
 */

const path = require('path')

const Koa = require('koa');

const koaBody = require('koa-body');

const koaStatic = require('koa-static');

// 参数校验
const parameter = require('koa-parameter');

const router = require('../router/index');

const errorHandler = require('./errorHandler');

const app = new Koa();

app.use(koaStatic(path.join(__dirname,'../public')))

app.use(koaBody({
  multipart: true,
  formidable: {
    uploadDir: path.join(__dirname, '../public/upload/img'),
    keepExtensions: true
  }
}));

app.use(parameter(app));

app.use(router.routes());

app.on('error',errorHandler)

module.exports = app;
