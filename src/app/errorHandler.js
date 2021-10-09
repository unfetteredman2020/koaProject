module.exports = (err, ctx) => {
  console.log(`err.status`, err.code)
  let status = 500
  switch (err.code) {
    case '100001':
      status = 400;
      break;
    case '100002':
      console.log(`88`, err.code =='100002' )
      status = 409;
    default:
      status = 500
  }
  ctx.status = status
  ctx.body = err
  console.log(`ctx.status`, status)
}