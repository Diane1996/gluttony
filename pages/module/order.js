
const api = require('../../api.js');
const Httpclient = require('./httpclient.js');

function getAllOrderList(open_id, callback) {
    var url = api.getAllOrderList;
    var data = {
        open_id: open_id
    };
    var header = {};
    Httpclient.get(url, data, header, callback);
}


module.exports = {
    getAllOrderList,

}