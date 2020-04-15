/*
 * @Author: renhhh
 * @Date: 2020-04-10 09:59:12
 * @Description: 
 */
function serializeToJson(form){
    var result = {}
    var f = form.serializeArray()
    f.forEach(function(item){
        result[item.name] = item.value
    })
    return result
}