// pages/orderList/orderList.js
var Order = require('../module/order.js');

let timer;
let repeat;

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
        getAllOrderList({ page: this });

        // setTimeout(repeat = () => {
        //     timer = setTimeout(repeat, 5000);
        //     //   this.getOrderList();
        //     getAllOrderList({ page: this });
        // }, 5000);
    },


    onUnload: function () {
        clearTimeout(timer);
    },

    onHide: function () {
        clearTimeout(timer);
    }

})

function getAllOrderList({ page }) {
    var open_id = getApp().globalData.open_id;
    Order.getAllOrderList(open_id, (res) => {
        var orderList = res.data.orderList;
        for (let i = 0; i < orderList.length; i++) {
            var item = orderList[i];
            switch (item.status) {
                case 0:
                    item.statusText = '待付款';
                    break;
                case 1:
                    item.statusText = '待接单';
                    break;
                case 2:
                    item.statusText = '已接单';
                    break;
                case 3:
                    item.statusText = '制作中';
                    break;
                case 4:
                    item.statusText = '已完成';
                    break;
            }
        }
        page.setData({
            orderList: orderList
        });
    });
}