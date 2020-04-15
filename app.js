/*
 * @Author: renhhh
 * @Date: 2020-04-09 10:53:55
 * @Description: 主入口文件 49
 */
// 引用express 框架
const express = require('express')

// 引入express-session实现功能
const session = require('express-session')
// 导入morgan 第三方模块
const morgan = require('morgan')
// 导入ocnfig 模块
const config = require('config')
// 导入art-template
const template = require('art-template')
// 引入 dateformat 模块实现日期格式的转换
const dateFormat = require('dateformat')
// 处理路径
const path = require('path')
// 引入 body-parser模块，用来处理post请求参数
const bodyParser = require('body-parser')
// 引入路由模块
const home = require('./route/home')
const admin = require('./route/admin')

// 创建网站服务器
const app = express()

require('./model/connect')
// require('./model/user')
// 处理post请求参数
app.use(bodyParser.urlencoded({ extended: false}))

app.use(session({secret: 'secret key'}))
// 告诉express框架模板所在的位置
app.set('views',path.join(__dirname,'views'))
// 告诉express框架模板的默认后缀是什么
app.set('view engine', 'art')
// 当渲染后缀为art的模板时，所使用的模板引擎是什么
app.engine('art',require('express-art-template'))

// 向模板内部导入dateFormat变量
template.defaults.imports.dateFormat = dateFormat;

// 开放静态资源文件
app.use(express.static(path.join(__dirname,'public')))

console.log(config.get('title'));
// 获取系统环境变量 返回值是对象
if(process.env.NODE_ENV === 'development'){
    // 开发环境
    console.log('开发环境');
    // 在开发环境中 将客户端发送到服务器端的请求信息打印到控制台中
    app.use(morgan('dev'))
}else if(process.env.NODE_ENV === 'production'){
    console.log('生产环境');
}
// 拦截请求，判断用户登录状态
app.use('/admin',require('./middleware/loginGuard'))

// 为路由匹配请求路径
app.use('/home',home)
app.use('/admin',admin)

app.use((err,req,res,next) => {
    console.log(err);
    const result = JSON.parse(err);

    let params=[]
    for(let attr in result){
        if(attr != 'path'){
            params.push(`${attr}=${result[attr]}`)
        }
    }

    res.redirect(`${result.path}?${params.join('&')}`)
})
// 监听端口
app.listen(80)
console.log('服务器连接成功');