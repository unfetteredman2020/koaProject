const fs = require('fs')

const path = require('path')
const { getDate } = require('../src/utils/format')

const filepath = path.join(__dirname, './test.js')

console.log(`filepath`, filepath)

const file = fs.readFileSync(filepath, {encoding: 'utf-8'})


const url = path.join(__dirname, './copy.js')

console.log(`path`, url)

// const timer  = setTimeout(() => {
//   fs.writeFile(url, file, err=> {
//     if(err) {
//       console.log(`err`, err) 
//       clearTimeout(timer)
//     }

//   })
// }, 2000);

const  timer2 = setInterval(() => {
  let randmNum = `
    /* ${getDate("YYYY-mm-dd HH:MM:SS", new Date())} */
    /* ------------------------------------------------------------------------------------------ */
  `
  fs.appendFile(url, randmNum.toString(),{encoding: 'utf-8'}, err=> {
    if(err) {
      console.log(`err`, err)
      clearInterval(timer2)

    }
    console.log(`randmNum`, randmNum)
  })
}, 4000);

console.log(`file`, file.toString())