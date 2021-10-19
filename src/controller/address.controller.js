
const { addAddressService, delAddressService, getAddressListService, updateAddressService } = require('../service/address.service')

const { addAddressError, delAddressError, getAddressListError, updateAddressError } = require('../constant/error.type')
class AddressController {
  
  async addressController (ctx) {
    try {
      const res = await addAddressService(ctx.request.body)
      ctx.body = {
        code: '104000',
        msg: "添加地址成功",
        result: res
      }
    } catch (error) {
      console.error("addAddressError", error)
      addAddressError.result = error
      return ctx.app.emit('error', addAddressError, ctx)
    }
  }
  async delAddressController(ctx) {
    try {
      const res = await delAddressService(ctx.request.body) 
      ctx.body = {
        code: '10402',
        msg: '删除地址成功',
        result: res
      }
    } catch (error) {
      console.error('delAddressError', error)
      delAddressError.result = error
      return ctx.app.emit('error', delAddressError, ctx)
    }
  }
  async getAddressListController (ctx) {
    try {
      const res = await getAddressListService(ctx.request.params.id)
      ctx.body = {
        code: '104007',
        msg: '获取用户地址列表成功',
        result: res
      }
    } catch (error) {
      console.error('getAddressListError', error)
      getAddressListError.result = error
      return ctx.app.emit('error', getAddressListError, ctx)
    }
  }
  async updateAddressController(ctx) {
    try {
      const res = await updateAddressService(ctx.request.body)
      ctx.body = {
        code: '104007',
        msg: '更新用户地址成功',
        result: res
      }
    } catch (error) {
      console.error('updateAddressError', error)
      updateAddressError.result = error
      return ctx.app.emit('error', updateAddressError, ctx)
    }
  }
}

module.exports = new AddressController()