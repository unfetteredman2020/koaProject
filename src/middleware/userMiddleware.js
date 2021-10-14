const bcryptjjs = require('bcryptjs')
const { getUserInfo } = require('../service/user.service')

const { userFormatError, userAllreadyExited, userRegistError, LoginError, validateLoginError, userDoNotExited } = require('../constant/error.type');


// 校验用户名和密码是否正确
const userValidate = async (ctx, next)=> {
  const {user_name, password}  = ctx.request.body;
    if(user_name == '' || password == '') {
      ctx.status = 400;
      ctx.app.emit('error', userFormatError, ctx )
      return;
    }
    await next();
}

// 验证用户是否存在
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

// 密码加密🔐
const bcryptPassword = async (ctx, next) => {
  const { password }  = ctx.request.body;
  var salt = bcryptjjs.genSaltSync(10);
  var hash = bcryptjjs.hashSync(password, salt);
  
  ctx.request.body.password = hash
  await next()
}

// 验证用户登录
const validateLogin = async (ctx, next) => {
  const { user_name, password } = ctx.request.body;
  console.log(`password`, ctx.request.body, user_name)
  try {
    const res = await getUserInfo({user_name});
    console.log(`res user`, res)
    if(!res) {
      return  ctx.app.emit('error',userDoNotExited, ctx )
    }
    console.log(`bcryptjjs.compareSync(password, res.password)`, bcryptjjs.compareSync(password, res.password))
    if(!bcryptjjs.compareSync(password, res.password)) {
      console.log(`pass bcr`, password,   res.password)
      return  ctx.app.emit('error',validateLoginError, ctx )
    }

  } catch (error) {
    // console.log(`error`, error)
    return  ctx.app.emit('error',LoginError, ctx )
  }
  await next()
}
module.exports = {
  userValidate,
  VerifyUser,
  bcryptPassword,
  validateLogin
}