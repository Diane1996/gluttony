// pages/orderDetail/orderDetail.js
var Order = require('../module/order.js');
var Food = require('../module/food.js');
var Address = require('../module/address.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        type: 2,
        address: {
            name: '张三',
            phone: '13912341234',
            address: '成都天府大道1314号'
        },
        remark: '面里不要酱油'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var order_id = options.order_id;

        var page = this;
        getOrderDetail(order_id, page); 
        // getFoodList(order_id, page);

        wx.getStorage({
            key: 'cartList',
            success: (res) => {
                var data = res.data;
                var total = data.total;
                var cartList = data.cartList;
                this.setData({
                    cartList: cartList,
                    total: total
                });
            },
        });
    },
})

function getOrderDetail(order_id, page) {
    // 获取订单信息
    var orderPromise = new Promise((resolve, reject) => {
        Order.getOrderDetail(order_id, (res) => {
            var orderList = res.data.result;
            page.setData({
                orderDetail: orderList
            });
            resolve(orderList);
        });
    });
    orderPromise.then((data) => {
        Food.getFoodListByOrderId(order_id, (res) => {
            var orderList = res.data.result;
            page.setData({
                orderList: orderList
            });
        });
        if (data.eatingType === '外卖') {
            Address.getOrderAddress(data.receiver_id, (res) => {
                var address = res.data.result;
                page.setData({
                    address: address[address.length - 1]
                });
            });
        }
    });
}

function getFoodList(order_id, page) {
    // 获取订单的菜单信息
    Food.getFoodListByOrderId(order_id, (res) => {
        var orderList = res.data.result;
        page.setData({
            orderList: orderList
        });
    });
}