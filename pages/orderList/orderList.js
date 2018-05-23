// pages/orderList/orderList.js

var Order = require('../module/order.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        orderList: [
            {
                type: '外卖',
                list: [{
                    name: '米饭'
                }],
                createdTime: '2018-02-11 11:39',
                total: '24.9'
            }
        ]
    },

    gotoOrderDetail: function (e) {
        var item = e.currentTarget.dataset.item;
        wx.navigateTo({
            url: '/pages/orderDetail/orderDetail?order_id=' + item.order_id,
        });
    },

    onShow: function () {
        var open_id = getApp().globalData.open_id;

        Order.getAllOrderList(open_id, (res) => {
            var orderList = res.data.orderList;
            this.setData({
                orderList: orderList
            })
        });
    },


})