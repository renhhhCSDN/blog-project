/*
 * @Author: renhhh
 * @Date: 2020-04-11 14:13:40
 * @Description: 
 */

// 引入用户集合的构造函数
const { User,validateUser } = require('../../model/user')
// 加密
const bcrypt = require('bcrypt')
module.exports = async(req,res,next) => {
    // 标识 标识当前点击的是用户列表页面
    req.app.locals.currentLink = 'user';
    try{
        await validateUser(req.body)
        // res.send(req.body)
    }catch(e){
        // 验证没通过
        // 重定向回用户添加页面
       
        return next(JSON.stringify({path: '/admin/user-edit',message: e.message}))
    }
    // 根据邮箱地址查询用户是否存在
    let user = await User.findOne({email: req.body.email})
    // 如果用户已经存在，邮箱地址已经被别人占用
    if(user){   
        return next(JSON.stringify({path: '/admin/user-edit',message:'邮箱已存在'}))
    }
    // 对密码进行加密处理
    // 生成随机字符串
    const salt =await bcrypt.genSalt(10);
    // 加密
    const password = await bcrypt.hash(req.body.password,salt)
    // 替换密码
    req.body.password = password;
    await User.create(req.body)
    res.redirect('/admin/user')
}