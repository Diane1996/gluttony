
const api = require('../../api.js');
const Httpclient = require('./httpclient.js');

function getAllAddress(open_id, callback) {
    var url = api.getAllAddress;
    var data = {
        open_id: open_id
    };
    var header = {};
    Httpclient.get(url, data, header, callback);
}

function addAddress(data, callback) {
    var url = api.addAddress;
    var header = {};
    Httpclient.post(url, data, header, callback);
}

function deleteAddress(data, callback) {
    var url = api.deleteAddress;
    var header = {};
    Httpclient.post(url, data, header, callback);
}

function updateAddress(data, callback) {
    var url = api.updateAddress;
    var header = {};
    Httpclient.post(url, data, header, callback);
}

function setDefaultAddress(data, callback) {
    var url = api.setDefaultData;
    var header = {};
    Httpclient.get(url, data, header, callback);
}

module.exports = {
    getAllAddress,
    addAddress,
    deleteAddress,
    updateAddress,
    setDefaultAddress
}