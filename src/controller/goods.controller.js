const path = require('path')

const { uploadParamsError, uploadGoodsError } = require('../constant/error.type')

const { createGoods, updateGoodsService } = require('../service/goods.service')

class GoodsController {
  async upload (ctx) {
    const { file }  = ctx.request.files
    if(file) {
      ctx.body = {
        code: '0',
        msg: '图片上传成功！',
        result: {
          upload_img: path.basename(file.path)
        }
      }
    }
  }

  async goodsUpload (ctx) {
    try {
      ctx.verifyParams({
        goods_name: {type: 'string', required: true},
        goods_num: {type: 'number', required: true},
        goods_price: {type: 'number', required: true},
        goods_img:  {type: 'array', required: true, itemType: 'string'},
        goods_description: {type: 'string', required: true}
      });
      try {
        console.log(`object`, ctx.request.body)
        ctx.request.body.goods_img = JSON.stringify(ctx.request.body.goods_img)
        const res = await createGoods(ctx.request.body)
        ctx.body = {
          code: '102000',
          msg: '上传商品成功',
          result: res
        }
      } catch (error) {
        console.error(`创建商品 error`, error)
        uploadGoodsError.result = error
        return ctx.app.emit('error', uploadGoodsError, ctx)
      }
    } catch (error) {
      console.error('err upload', error)
      uploadParamsError.result = error  // 将错误对象传给result对象上面返回给接口
      return ctx.app.emit('error', uploadParamsError, ctx)
    }
  }
  async goodsUpdate (ctx)  {
    console.log(`ctx`, ctx.params.id)
    try {
      ctx.request.body.goods_img = JSON.stringify(ctx.request.body.goods_img )
      if(await updateGoodsService(ctx.params.id, ctx.request.body)) {
        ctx.body = {
          code: '0',
          msg: '修改商品信息成功！',
          result: ''
        }
      }else {
        ctx.body = {
          code: '100002',
          msg: '修改商品信息失败！',
          result: ''
        }
      }
    } catch (error) {
      console.log(`error is`, error)
    }
  }
}

module.exports = new GoodsController()
