
const { getUserInfo } = require('../service/index')

const { userFormatError, userAllreadyExited, userRegistError } = require('../constant/error.type')

const userValidate = async (ctx, next)=> {
  const {user_name, password}  = ctx.request.body;
    if(user_name == '' || password == '') {
      ctx.status = 400;
      ctx.app.emit('error', userFormatError, ctx )
      return;
    }
    await next();
}

const VerifyUser = async (ctx, next) => {
  const {user_name, password}  = ctx.request.body;
  try {
    const res = await getUserInfo({user_name});
    if(res) {
      ctx.status = 409;
      ctx.app.emit('error', userAllreadyExited, ctx );
      return;
    }
  } catch (error) {
    console.error(`error`, error)
    ctx.app.emit('error', userRegistError, ctx );
    return;
  }
  await next()
}
module.exports = {
  userValidate,
  VerifyUser
}