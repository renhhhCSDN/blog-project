/*
 * @Author: renhhh
 * @Date: 2020-04-13 15:14:35
 * @Description: 
 */

module.exports = (req,res) => {
    // 标识 标识当前点击的是用户列表页面
    req.app.locals.currentLink = 'article';
    res.render('admin/article-edit')
}