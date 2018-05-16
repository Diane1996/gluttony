
const api = require('../../api.js');
const Httpclient = require('./httpclient.js');

// 获取所有订单
function getAllOrderList(open_id, callback) {
    var url = api.getAllOrderList;
    var data = {
        open_id: open_id
    };
    var header = {};
    Httpclient.get(url, data, header, callback);
}

// 获取订单单个信息
function getOrderDetail(order_id, callback) {
    var url = api.getOrderDetail;
    var data = {
        order_id: order_id
    };
    var header = {};
    Httpclient.get(url, data, header, callback);
}

// 增加订单
function addOrder(data, callback) {
    var url = api.addOrder;
    var header = {};
    Httpclient.get(url, data, header, callback);
}

module.exports = {
    getAllOrderList,
    getOrderDetail,
    addOrder
}