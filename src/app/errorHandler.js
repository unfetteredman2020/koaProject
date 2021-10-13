const fs = require('fs');

const path = require('path');

const { getDate } = require('../utils/format')

const errorLogPath = path.join(__dirname, '../../log/error.log')

module.exports = (err, ctx) => {
  let status = 400
  switch (err.code) {
    case '100001':
      status = 400;
      break;
    case '100002':
      status = 409;
  }
  ctx.status = status
  ctx.body = err

  // 将错误写进日志文件
  let errTxt = `
    /* ${getDate("YYYY-mm-dd HH:MM:SS", new Date())} */
    /* ------------------------------------------------------------------------------------------ */
    ${err}
  `
  fs.appendFile( errorLogPath, errTxt,{encoding: 'utf-8'}, err=> {
    if(err) console.log(`err`, err)
    console.log(`randmNum`, errTxt)
  })
}