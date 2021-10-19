
const { Op } = require('sequelize')
const Addres = require('../model/address.model')

class AddressService {
  async addAddressService (params) {
    return  await  Addres.create(params)
  }
  async delAddressService(params) {
    return  await Addres.destroy({
      where: {
        id: {
          [Op.in]: params.id
        }
      }
    })
  }
  async getAddressListService(id) {
    const { count, rows } = await Addres.findAndCountAll({
      where:{
        user_id: id
      }
    })
    return {
      total: count,
      list: rows
    }
  }
  // "user_id": "1",
  // "default_address": false,
  // "user_name": "tom",
  // "mobile": "18219836032",
  // "region": "浙江省杭州市西湖区2",
  // "detailedAddress": "五联西苑2",
  // "houseNumber": "28号"
  async updateAddressService(params) {
    const { user_id, id, default_address, user_name, mobile, region, detailedAddress, houseNumber } = params
    let updateOpt = {}
    default_address && Object.assign(updateOpt, { default_address }) 
    user_name && Object.assign(updateOpt, { user_name })
    mobile && Object.assign(updateOpt, { mobile })
    region && Object.assign(updateOpt, { region })
    detailedAddress && Object.assign(updateOpt, { detailedAddress })
    houseNumber && Object.assign(updateOpt, { houseNumber })
    console.log(`updateOpt`, updateOpt)
    return await Addres.update(updateOpt,{
      where: {
        [Op.and]:[
          { user_id },
          { id }
        ]
      }
    })
  }
}

module.exports = new AddressService()