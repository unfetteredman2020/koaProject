const fs = require('fs')
const Router = require('koa-router');

const router = new Router()

try {
  fs.readdir(__dirname,'utf8',(err,data)=>{
    if(err) console.error('router error',err)
    data.forEach(file => {
      if(file !== 'index.js') {
        let r = require('./'+file)
        router.use(r.routes())
      }
    })
  })
} catch (error) {
  console.log(`fs router file error`,  error)
}

module.exports = router