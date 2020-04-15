/*
 * @Author: renhhh
 * @Date: 2020-04-11 13:53:08
 * @Description: 
 */
const bcrypt = require('bcrypt')
const { User } = require('../../model/user')


module.exports  = async (req,res) => {
    const { email, password } = req.body;
    if(email.trim().length === 0 || password.trim().length === 0 ){
        return res.status(400).render('admin/error',{msg: '邮件或密码不能为空'})
    }
    let user = await User.findOne({email})
    // 如果查询到了用户 user 变量的值是对象类型
    // 如果没有查询到用户 user变量为 null
    if(user){
        // 将客户端传递过来的密码和用户信息中的密码进行比对
        let isValid = await bcrypt.compare(password,user.password)
        // 如果密码比对成功
        if(isValid){
            // 登录成功
            // 将用户名存储在session
            req.session.username = user.username;
            // 将用户角色存储在session对象中
            req.session.role = user.role
            // res.send('登录成功')
            // 重定向到用户列表页面
            req.app.locals.userInfo = user
            // 对用户的角色进行判断
            if(user.role == 'admin'){
                res.redirect('/admin/user')
            }
            res.redirect('/admin/user')
        } else {
            // 没有查询到用户
            res.status(400).render('admin/error',{ msg: '邮箱地址或者密码错误'})
        }
    }else {
        res.status(400).render('admin/error',{msg:'用户名或密码输入错误'})
    }
    // 根据邮箱地址查询用户信息
    // res.send(req.body)
}

