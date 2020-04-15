/*
 * @Author: renhhh
 * @Date: 2020-04-11 13:58:12
 * @Description: 
 */
// 导入用户集合构造函数
const  { User } = require('../../model/user')
module.exports = async(req,res) => {
    // 标识 标识当前点击的是用户列表页面
    req.app.locals.currentLink = 'user';
    // 接受客户端传递过来的当前页参数
    let page = req.query.page || 1;
    // 每一页显示的数据条数
    let pagesize =10;
    // 查询数据的总数
    let count = await User.countDocuments({})
    // 总页数
    let total = Math.ceil( count/pagesize )

    // 页码对应的开始位置
    let start = (page - 1 ) * pagesize;
    let users = await User.find({}).limit(pagesize).skip(start)
    res.render('admin/user',{
        users,
        page,
        total
    })
}