/*
 * @Author: renhhh
 * @Date: 2020-04-13 15:13:32
 * @Description: 
 */
const { Article } = require('../../model/article')
// 导入mongoose-sex-page模块
const pagination = require('mongoose-sex-page')

module.exports = async (req,res) => {
    const page = req.query.page;
    // 标识 标识当前点击的是用户列表页面
    // exex 向数据库发送查询请求
    req.app.locals.currentLink = 'article';
    let articles = await pagination(Article).find().page(page).size(2).display(3).populate('author').exec()

    // res.send(articles)
    // 渲染文章列表页面模板
    res.render('admin/article',{
        articles
    })
}