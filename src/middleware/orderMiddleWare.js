

const { createOrderParamsError } = require('../constant/error.type')
const validate  = rules => {
  return async (ctx, next) => {
    try {
      ctx.verifyParams(rules)
    } catch (error) {
      console.error('createOrderParamsError', error)
      createOrderParamsError.result = error
      return ctx.app.emit('error', createOrderParamsError, ctx)
    }
    await next()
  }
}

module.exports = {
  validate
}