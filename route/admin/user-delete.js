/*
 * @Author: renhhh
 * @Date: 2020-04-13 13:16:59
 * @Description: 
 */
const { User } = require('../../model/user')
 module.exports = async(req,res) => {
    //  获取要删除的用户id
    let { id } = req.query;
    await User.findOneAndDelete({_id:id})
    res.redirect('/admin/user')
 }