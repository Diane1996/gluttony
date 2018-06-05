
const api = require('../../api.js');
const Httpclient = require('./httpclient.js');

// 增加订单
function getRestaurant(callback) {
    var url = api.getRestaurant;
    var header = {};
    var data = {};
    Httpclient.get(url, data, header, callback);
}

module.exports = {
    getRestaurant
}