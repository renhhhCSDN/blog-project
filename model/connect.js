/*
 * @Author: renhhh
 * @Date: 2020-04-09 13:09:00
 * @Description: 连接数据库
 */

//  引入mongoose 第三方模块
const mongoose = require('mongoose');
// 导入config 模块
const config = require('config')
// 连接数据库
let database = `mongodb://${config.get('db.user')}:${config.get('db.pwd')}@${config.get('db.host')}:${config.get('db.port')}/${config.get('db.name')}`
console.log(database);
mongoose.connect(database, { useNewUrlParser: true, useUnifiedTopology:true})
    .then(()=>console.log('数据库连接成功'))
    .catch( () => console.log('数据库连接失败'))