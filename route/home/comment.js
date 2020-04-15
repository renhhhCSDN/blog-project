/*
 * @Author: renhhh
 * @Date: 2020-04-15 16:04:55
 * @Description: 
 */
// 将评论集合构造函数进行导入
const { Comment } = require('../../model/comment')
module.exports = async (req,res) => {
    const { uid,aid,content} = req.body;

    // 将评论信息存储到评论集合中
    await Comment.create({
        content,
        uid,
        aid,
        time: new Date()
    })

    // 将文章重定向到文章详情页面
    res.redirect('/home/article?id='+aid)
}