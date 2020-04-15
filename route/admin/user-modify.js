/*
 * @Author: renhhh
 * @Date: 2020-04-11 17:45:02
 * @Description: 
 */
const { User } = require('../../model/user')
const bcrypt = require('bcrypt')
module.exports = async (req,res,next) => {
    // 接受客户端传递过来的参数
    const body = req.body;
    // 即将要修改的用户ID
    const id = req.query.id;
    let user = await User.findOne({_id:id})
    let isValid = await bcrypt.compare(req.body.password,user.password)
    if(isValid){
        // 将用户信息更新到数据库中
        let data = body;
        delete data.password
        console.log(data);
        await User.updateOne({_id:id},data)
        
        res.redirect('/admin/user')
    }else {
        let obj = {
            path: '/admin/user-edit',
            message:'比对失败',
            id:id
        }
        
        next(JSON.stringify(obj))
    }

}