/*
 * @Author: renhhh
 * @Date: 2020-04-11 14:10:36
 * @Description: 
 */
const { User } = require('../../model/user')
module.exports = async (req,res) => {
    const { message,id } = req.query;
    if(id){
        let user = await User.findOne({_id:id})

        res.render('admin/user-edit',{
            message,
            user,
            link:'/admin/user-modify?id='+id,
            button:'修改'
        })
        return 
    }else {
        res.render('admin/user-edit',{
            message,
            link:'/admin/user-edit',
            button:'添加'
        })
    }
    
}