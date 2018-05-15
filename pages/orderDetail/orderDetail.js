// pages/orderDetail/orderDetail.js
var Order = require('../module/order.js');
var Food = require('../module/food.js');

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
        mark: '面里不要酱油'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var order_id = options.order_id;
        order_id = "6bf473dd";

        var page = this;
        getOrderDetail(order_id, page); 
        getFoodList(order_id, page);

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
        })
    },
})

function getOrderDetail(order_id, page) {
    // 获取订单信息
    Order.getOrderDetail(order_id, (res) => {
        var orderList = res.data.result;
        page.setData({
            orderDetail: orderList
        })
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