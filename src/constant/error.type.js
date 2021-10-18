

module.exports = {
  userFormatError: {
    code: '100001',
    msg: '用户名或密码为空！',
    result: ''
  },
  userAllreadyExited: {
    code: '100002',
    msg: '用户已存在！',
    result: ''
  },
  userRegistError: {
    code: '100003',
    msg: '用户注册失败',
    result: ''
  },
  validateLoginError: {
    code: '100004',
    msg: '密码错误，登录失败！',
    result: ''
  },
  LoginError: {
    code: '100005',
    msg: '登录获取用户信息失败！',
    result: ''
  },
  userDoNotExited: {
    code: '100006',
    msg: '用户不存在！',
    result: ''
  },
  TokenExpiredError: {
    code: '101001',
    msg: 'token已过期！',
    result: ''
  }, 
  invalidTokenError: {
    code: '101002',
    msg: 'token验证失败！',
    result: ''
  },
  notAdmitPermissionError: {
    code: '101003',
    msg: '没有管理员权限！',
    result: ''
  },
  uploadParamsError: {
    code: '102001',
    msg: '上传参数错误，请检查参数类型！',
    result: ''
  },
  uploadGoodsError: {
    code: '102002',
    msg: '上传商品失败，请重试！',
    result: ''
  },
  invalidGoodsIDError: {
    code: '102003',
    msg: '该商品不存在！',
    result: ''
  },
  selectGoodsError: {
    code: '102004',
    msg: '获取商品失败',
    result: ''
  },
  validatorGoodsParamsError: {
    code: '103000',
    msg: '商品参数错误！',
    result: ''
  },
  addCartError: {
    code: '103001',
    msg: '添加购物车失败！',
    result: ''
  },
  validateGoodsIdExistServiceError: {
    code: '103001',
    msg: '该商品不存在！',
    result: ''
  },
  getCartListError: {
    code: '103002',
    msg: '获取购物车列表失败！',
    result: ''
  },
  validaterParamsError: {
    code: '103003',
    msg: '参数错误，请检查参数！',
    result: ''
  },
  validateCartParamsError: {
    code: '103004',
    msg: '参数格式错误，请重新填写！',
    result: ''
  },
  updateCartError: {
    code: '103006',
    msg: '更新购物车失败！',
    result: ''
  },
  validateCartIdExitedError: {
    code: '103007',
    msg: '购物车Id不存在，删除购物车失败！',
    result: ''
  },
  deleteCartError: {
    code: '103008',
    msg: '删除购物车失败！',
    result: ''
  },
  selectAllCartGoodsError: {
    code: '10310',
    msg: '购物车全选失败',
    result: ''
  }
}