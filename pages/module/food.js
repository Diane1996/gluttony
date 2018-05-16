
const api = require('../../api.js');
const Httpclient = require('./httpclient.js');

// 根据order_id获取菜单列表
function getFoodListByOrderId(order_id, callback) {
    var url = api.getFoodListByOrderId;
    var data = {
        order_id: order_id
    };
    var header = {};
    Httpclient.get(url, data, header, callback);
}

function getFoodList(callback) {
    var url = api.foodFindAll;
    var data = {};
    var header = {};
    return Httpclient.get(url, data, header, callback);
}

function getCategoryList(callback) {
    var url = api.categoryFindAll;
    var data = {};
    var header = {};
    return Httpclient.get(url, data, header, callback);
}

module.exports = {
    getFoodListByOrderId,
    getFoodList,
    getCategoryList
}