# koaProject

*******

### 一 初始化pro
  * init project.json
  * init git

### 二 配置项目
  * 1，搭建koa项目初始化
  * 2，新建koa-router,并配置路由文件，使用中间件koa-body接收post请求
  * 3，新建sequelize文件，初始化mysql，通过seq去实现操作数据库
  * 4，新建日志文件夹log，将全局error写进错误日志

### 三 商品模块
  * 1，创建商品
      ```
        router.put('/updateGoods/:id',auth,hadAdminpermission, goodsUpdate)
      ```
    * 1，创建商品的controller方法，通过contro类去调用service的创建商品方法，再通过model去写入数据；
    * 2，使用koa-parameter中间件验证参数
  * 2，更新商品
      ```
      router.put('/updateGoods/:id',auth,hadAdminpermission, goodsUpdate)
      ```
      * 方法同上，ID使用ctx.params可以获取当前路由参数
