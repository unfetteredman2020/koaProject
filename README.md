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
  * 3，上架商品
    * 1，创建商品时，通过配置model层的 `{ paranoid: true }` 字段使用软删除方法，调用destroy方法并不会直接从数据库删除商品
    * 2，调用destroy方法，加上条件 ` force: true` 即可
        ```
          Goods.destroy({
            where: {
              id: 1
            },
            force: true
          });
          // DELETE FROM "posts" WHERE "id" = 1
        ```
  * 4，重新上架商品
    * 1，已经下架的商品，重新上架可调用model层实例的restore方法，并通过where条件即可重新上架该商品
        ```
        await Goods.restore({
              where: { id }
            })
            return  res > 0 ? true : false
          }
        ```
  * 5，获取全部商品列表（支持分页查询）
    * 1，分页查询可根据pageSize，pageNum查询
    * 2，根据 `const  offset = (pageNum -1) * pageSize` 计算得出offset偏移量；
      ```
      // 方法一：
        const rows = await Goods.findAll({ offset, limit: pageSize*1})
        const count = await Goods.count()
        // 方法二：
        const { count, rows } = await Goods.findAndCountAll({offset, limit: pageSize})
      ```
    * 3，两种不同得方法可得到总共满足条件的total数据和分页的list数据；