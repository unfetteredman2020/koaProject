const { addressParamsError } = require('../constant/error.type')

const validate = rules => {
  return async (ctx, next) => {
    try {
      await ctx.verifyParams(rules)
      await next()
    } catch (error) {
      console.error('addressParamsError', error)
      addressParamsError.result = error
      return ctx.app.emit('error', addressParamsError, ctx)
    }
  }
}

module.exports = {
  validate
}