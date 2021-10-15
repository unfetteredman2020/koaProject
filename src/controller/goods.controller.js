const path = require('path')

const { uploadParamsError, uploadGoodsError, invalidGoodsIDError, selectGoodsError } = require('../constant/error.type')

const { createGoodsService, updateGoodsService, offGoodsService, restoreGoodsService, getGoodsListService } = require('../service/goods.service')

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
    }else {
      return ctx.app.emit('error', uploadParamsError, ctx)
    }
  }
  // 创建商品
  async goodsUploadController (ctx) {
    try {
      ctx.request.body.goods_img = JSON.stringify(ctx.request.body.goods_img)
      const res = await createGoodsService(ctx.request.body)
      console.log(`res222`, res)
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
  }
  // 更新商品
  async goodsUpdateController (ctx)  {
    try {
      ctx.request.body.goods_img = JSON.stringify(ctx.request.body.goods_img )
      if(await updateGoodsService(ctx.params.id, ctx.request.body)) {
        ctx.body = {
          code: '0',
          msg: '修改商品信息成功！',
          result: ''
        }
      }else {
        return ctx.app.emit('error', invalidGoodsIDError, ctx)
      }
    } catch (error) {
      console.log(`error is`, error);
    }
  }
  // 下架商品
  async offGoodsController(ctx) {
    if(await offGoodsService(ctx.request.params.id)){
      ctx.body = {
        code: '0',
        msg: '下架商品成功',
        result: ''
      }
    }else {
      return ctx.app.emit('error', invalidGoodsIDError, ctx);
    }
  }
  // 上架商品
  async restoreGoodController(ctx) {
    if(await restoreGoodsService(ctx.request.params.id)){
      ctx.body = {
        code: '0',
        msg: '上架商品成功',
        result: ''
      }
    }else {
      return ctx.app.emit('error', invalidGoodsIDError, ctx);
    }
  }
  // 获取商品列表
  async getGoodsListController(ctx) {
    try {
      const { pageSize, pageNum } = ctx.request.query;
      const res = await getGoodsListService(pageSize, pageNum);
      ctx.body = {
        code: '0',
        msg: '获取商品列表成功！',
        result: res
      }
    } catch (error) {
      console.error('getGoodsListController', error);
      selectGoodsError.result = error
      return  ctx.app.emit('error', selectGoodsError, ctx)
    }
  }
}


module.exports = new GoodsController()
