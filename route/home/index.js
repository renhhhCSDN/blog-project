/*
 * @Author: renhhh
 * @Date: 2020-04-15 14:16:25
 * @Description: 
 */
const { Article } = require('../../model/article')
// 导入分页模块
const pagaintion = require('mongoose-sex-page')
module.exports = async (req,res) => {
    const page = req.query.page
    // 从数据库中查询数据
    let result = await pagaintion(Article).page(page).size(2).display(2).find().populate('author').exec()
    // res.send(result)
    // return
    // 渲染模板传递数据
    res.render('home/default',{
        result
    })
}