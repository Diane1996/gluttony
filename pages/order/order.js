
const api = require('./../../api.js');
const Order = require('../module/order.js');

// pages/order/order.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        eatingType: -1,
        foodList: [],
        textarea: '',
        address: {
            name: '张三',
            phone: '13912341234',
            address: '成都天府大道1314号'
        },
        total: 0,
        desk_num: 1,
        remark: '',
    },

    goToAddress: function () {
        wx.navigateTo({
            url: '/pages/address/address?getAddress=true',
        })
    },

    createOrder: function () {
        var total = this.data.total;
        var eatingType = this.data.eatingType;
        var foodList = this.data.foodList;
        var address = this.data.address;
        if (eatingType === -1) {
            wx.showModal({
                title: '提示',
                content: '您还没选择就餐方式呢。',
            })
            return;
        }

        switch (eatingType) {
            case -1:
                if (this.data.desk_num) {
                    wx.showModal({
                        title: '提示',
                        content: '您还没选择就餐方式呢。',
                    });
                    return;
                }
                break;
            case '外带':
                () => {
                    wx.showModal({
                        title: '提示',
                        content: '您还没填桌号呢。',
                    });
                    return;
                }
                break;
        }

        var receiver_id = null;
        if (eatingType === '外卖') {
            receiver_id = address.receiver_id;
        }

        var orderData = {
            open_id: getApp().globalData.open_id,
            total_price: this.data.total,
            type: this.data.eatingType,
            desk_num: this.data.desk_num,
            people_num: this.data.people_num,
            receiver_id: receiver_id,
            foodList: foodList,
            remark: this.data.textarea,
            first_name: foodList[0].name,
            first_picture: foodList[0].picture,
        }

        Order.addOrder(orderData, (res) => {
            wx.setStorage({
                key: 'cartList',
                data: ''
            });
            wx.redirectTo({
                url: '/pages/orderDetail/orderDetail?order_id=' + res.data.result,
            });
        });

        // 支付
        // wx.requestPayment({
        //     timeStamp: new Date().getTime(),
        //     nonceStr: '123456',
        //     package: '123456',
        //     signType: 'MD5',
        //     paySign: '456789',
        // });
    },

    inputChange: function (e) {
        var value = e.detail.value;
        var name = e.currentTarget.dataset.name;
        this.setData({
            [name]: value,
        })
    },

    changeType: function (e) {
        var type = e.currentTarget.dataset.type;
        switch (type) {
            case '堂食':

                break;
            case '外带':
                break;
            case '外卖':
                // 获取缓存中的地址数据
                wx.getStorage({
                    key: 'defaultAddress',
                    success: (res) => {
                        this.setData({
                            address: res.data
                        });
                    },
                });
                break;
            default:
        }

        this.setData({
            eatingType: type,
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.getStorage({
            key: 'cartList',
            success: (res) => {
                var data = res.data;
                var total = data.total;
                var cartList = data.cartList;
                this.setData({
                    foodList: cartList,
                    total: total
                });
            },
        });
        this.setData({
            desk_num: getApp().globalData.desk_num
        });
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        wx.getStorage({
            key: 'address',
            success: (res) => {
                this.setData({
                    address: res.data
                });
            },
        })
    },

})