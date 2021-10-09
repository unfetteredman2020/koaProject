/*
 * @Author: unfetteredman 
 * @Date: 2021-09-30 16:56:15 
 * @Last Modified by: unfetteredman
 * @Last Modified time: 2021-09-30 16:56:48
 * @description: 入口文件
 */


const { APP_PORT }  = require('./config/config.defautlt')

const app = require('./app/index')


app.listen(3000, ()=> {
  console.log(`server is running on: http://localhost:${'3000'}`)
});