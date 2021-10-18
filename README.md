# koaProject

*******

### 一 初始化pro
  * init project.json
  * init git

### 二 配置项目
  * 1，搭建 `koa项` 目初始化
  * 2，新建 `koa-router`,并配置路由文件，使用中间件`koa-body`接收`post`请求
  * 3，新建`sequelize`文件，初始化`mysql`，通过`seq`去实现操作数据库
  * 4，新建日志文件夹log，将全局`error`写进错误日志

### 三 商品模块
  * 1，创建商品
      ```
        router.put('/updateGoods/:id',auth,hadAdminpermission, goodsUpdate)
      ```
    * 1，创建商品的`controller`方法，通过`contro`类去调用`service`的创建商品方法，再通过`model`去写入数据；
    * 2，使用`koa-parameter`中间件验证参数
  * 2，更新商品
      ```
        router.put('/updateGoods/:id',auth,hadAdminpermission, goodsUpdate)
      ```
      * 方法同上，ID使用 `ctx.params` 可以获取当前路由参数
  * 3，上架商品
    * 1，创建商品时，通过配置model层的 `{ paranoid: true }` 字段使用软删除方法，调用destroy方法并不会直接从数据库删除商品
    * 2，调用`destroy`方法，加上条件 ` force: true` 即可
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
    * 1，已经下架的商品，重新上架可调用model层实例的 `restore`方法，并通过where条件即可重新上架该商品
        ```
          await Goods.restore({
            where: { id }
          })
        ```
  * 5，获取全部商品列表（支持分页查询）
    * 1，分页查询可根据`pageSize`，`pageNum`查询
    * 2，根据 `const  offset = (pageNum -1) * pageSize` 计算得出offset偏移量；
      ```
        // 方法一：
        const rows = await Goods.findAll({ offset, limit: pageSize*1})
        const count = await Goods.count()
        // 方法二：
        const { count, rows } = await Goods.findAndCountAll({offset, limit: pageSize})
      ```
    * 3，两种不同得方法可得到总共满足条件的total数据和分页的list数据；
  * 6，添加购物车
    * 1，步骤同上，新建路由router，封装validator中间件（校验参数），新建controller控制器，新建service业务层，新建model数据层；
    * 2，where条件需要从 `const { Op } = require('sequelize')` 倒入Op这个方法使用and查询，如果没有这条记录则创建
      ```
        const { user_id, goods_id } = goods
        let res = await Cart.findOne({
          where: {
            [Op.and]: {
              goods_id,
              user_id,
            }
          }
        })
        if(res) {
          await res.increment('goods_count')
          return  await res.reload()
        }else {
          return await  Cart.create(goods)
        }
      ```
  * 7，获取购物车列表
    * 1，添加路由`router`，新增`controller`控制器，新增`server`业务层，新增`model`数据层
    * 2，获取购物车列表实现分页查询；
      ```
        const offset = (pageNum-1) * pageSize; //计算offset偏移量
        let { rows, count } = await Cart.findAndCountAll({ //findAndCountAll可以查询得到数据和符合条件的total总数；
          offset,
          limit: pageSize * 1,
          include: {
            model: Goods,
            as: 'goods_info', //  Goods表别名
            attributes: ['goods_name','goods_price','goods_img']  //  Goods表对应的列数据
          }
        })
      ```
    * 3，购物车查询实现连表查询，在model层
      ```
        Cart.belongsTo(Goods,{
          foreignKey: 'goods_id', //  外键名；
          as: 'goods_info'  //  Goods表的别名；
        })
      ```
  * 8，更新购物车
    * 1，步骤同上，在service层，调用Cart实例的 `findByPk` 方法,查询结果res通过调用属性方法去直接赋值即可，最后调用 `res.save()` 方法即可；
      ```
        const res = await Cart.findByPk(id);  // 通过参数Id去匹配查询
        if(!res) return null
        goods_count ? (res.goods_count = goods_count): '';  
        goods_selected ? (res.goods_selected = goods_selected) : '';
        return await  res.save()
      ```

  * 9，删除购物车
    * 1，删除购物车列表的某一项值，可以通过传入数组的形式删除多个商品，model层通过 ` Op.in` 方法可多个删除, 参数ids是一个数组；
      ```
        Cart.destroy({
          where: {
            id: {
              [Op.in]: ids
            }
          }
        })
      ```
  * 10，购物车全选和取消模块
    * 1，购物车的  `goods_selected` 字段是表示该商品是否选中状态，为以后下单做准备；
      ```
        Cart.update({ goods_selected }, {
          where: {
            user_id
          }
        })
      ```