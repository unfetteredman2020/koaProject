
const jwt = require('jsonwebtoken');

const { TokenExpiredError, invalidTokenError } = require('../constant/error.type')

const SECRETKEY = "unfetteredman" // jwt 密钥

const auth = async (ctx, next) => {
  // invalid token - synchronous
  try {
    const { authorization } = ctx.request.header
    const token = authorization.replace('Bearer ', '')
    var user = jwt.verify(token, SECRETKEY);
    ctx.state.user = user
    await next();
  } catch(err) {
    // err
    switch (err.name) {
      case 'TokenExpiredError':
        console.error('error', 'token过期',err)
        ctx.app.emit('error',TokenExpiredError, ctx)
        break;
      case 'JsonWebTokenError':
        console.error('error', 'token验证失败', err)
        ctx.app.emit('error', invalidTokenError, ctx);
        break;
    }
  }
}

module.exports = {
  auth
}