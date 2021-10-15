
const jwt = require('jsonwebtoken');

const { TokenExpiredError, invalidTokenError, notAdmitPermissionError } = require('../constant/error.type')

const SECRETKEY = "unfetteredman" // jwt 密钥

const auth = async (ctx, next) => {
  // invalid token - synchronous
  try {
    const { authorization } = ctx.request.header
    if(!authorization) {
      return ctx.app.emit('error', invalidTokenError, ctx);
    }
    const token = authorization.replace('Bearer ', '')
    var user = jwt.verify(token, SECRETKEY);
    ctx.state.user = user
    await next();
  } catch(err) {
    console.log(`auth err`, err )
    switch (err.name) {
      case 'TokenExpiredError':
        console.error('error', 'token过期',err)
        return ctx.app.emit('error',TokenExpiredError, ctx);
      case 'JsonWebTokenError':
        console.error('error', 'token验证失败', err)
        return  ctx.app.emit('error', invalidTokenError, ctx);
    }
  }
}

const hadAdminpermission  = async (ctx, next) => {
  const { is_admin } = ctx.state.user;
  if(!is_admin) {
    return ctx.app.emit('error', notAdmitPermissionError, ctx)
  }
  await next();
}
module.exports = {
  auth,
  hadAdminpermission,
}