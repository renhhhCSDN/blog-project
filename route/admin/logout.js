/*
 * @Author: renhhh
 * @Date: 2020-04-11 13:58:55
 * @Description: 
 */
module.exports = (req,res) => {
    // 删除session
    req.session.destroy(function(){
        // 删除cookie
        res.clearCookie('connect.sid')
        // 重定向到用户登录页面
        res.redirect('/admin/login')
        // 清楚用户模板中的信息
        req.app.locals.userInfo = null
    })
}