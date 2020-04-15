/*
 * @Author: renhhh
 * @Date: 2020-04-09 10:57:50
 * @Description: 
 */
const express = require('express')


// 创建博客展示页面路由
const admin = express.Router()

admin.get('/login',require('./admin/loginPage'))

// 实现登录功能
admin.post('/login',require('./admin/login'))

admin.get('/user',require('./admin/userPage'))

admin.get('/logout',require('./admin/logout'))

admin.get('/user-edit',require('./admin/user-edit'))

// 创建实现用户添加功能路由
admin.post('/user-edit',require('./admin/user-edit-fn'))

// 用户修改功能路由
admin.post('/user-modify',require('./admin/user-modify'))

// 用户删除功能路由
admin.get('/delete',require('./admin/user-delete'))

// 文章列表页面路由
admin.get('/article',require('./admin/article'))

// 文章列表编辑页面
admin.get('/article-edit',require('./admin/article-edit'))

// 实现文章添加功能路由
admin.post('/article-add',require('./admin/article-add'))

// 将路由对象作为模块成员进行导出
module.exports = admin