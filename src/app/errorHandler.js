module.exports = (err, ctx) => {
  console.log(`err.status`, err.code)
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
  console.log(`ctx.status`, err)
}