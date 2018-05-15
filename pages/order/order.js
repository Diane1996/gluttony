
const api = require('./../../api.js');

// pages/order/order.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        eatingType: -1,
        orderList: [{
            url: '../../img/eatingIMG/noodles/seaweedNoodles.png',
            name: '海苔蔬菜乌冬面',
            price: 18,
            count: 1
        }],
        textarea: '',
        address: {
            name: '张三',
            phone: '13912341234',
            address: '成都天府大道1314号'
        },
        total: 0,
    },

    goToAddress: function () {
        wx.navigateTo({
            url: '/pages/address/address?getAddress=true',
        })
    },

    createOrder: function () {
        // var total = this.data.total;
        // var eatingType = this.data.eatingType;
        // var foodList = this.data.orderList.food_data;
        // var address = this.data.address;
        // if (eatingType === -1) {
        //     wx.showModal({
        //         title: '提示',
        //         content: '您还没选择就餐方式呢。',
        //     })
        //     return;
        // }
        // var orderData = {
        //     open_id: getApp().globalData.open_id,
        //     total_price: this.data.total,
        //     type: this.data.eatingType,
        //     desk_num: 1,
        //     people_num: 1,
        //     receiver_id: address ? address.receiver_id : null,
        //     foodList: foodList,
        //     remark: this.data.textarea,
        //     first_name: foodList[0].name,
        //     first_picture: foodList[0].picture,
        // }



        // var foodListData = [];
        // for (var i = 0; i < foodList.length; i++) {
        //     foodListData.push({
        //         food_id: foodList[0].food_id,
        //         order_id: order_id,
        //         count: foodList[0].count
        //     });
        // }

        console.log(this.data.orderList.food_data, typeof this.data.orderList.food_data);
        // wx.request({
        //   url: api.orderCreate,
        //   data: getData,
        //   success: function (res) {
        //     console.log(res);
        //   }
        // })

        // wx.setStorage({
        //     key: 'cartList',
        //     data: ''
        // })
        wx.requestPayment({
            timeStamp: new Date().getTime(),
            nonceStr: '123456',
            package: '123456',
            signType: 'MD5',
            paySign: '456789',
        })

        // wx.redirectTo({
        //     url: '/pages/orderDetail/orderDetail',
        // });
    },

    addToTextarea: function (e) {
        const text = e.target.dataset.spicy;
        console.log(text);
        this.setData({
            remark: this.data.textarea + text
        });
    },

    textareaChange: function (e) {

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
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        var _this = this;
        wx.request({
            url: api.cartList,
            data: { open_id: 123456 },
            success: function (res) {
                const result = res.data.data.result
                console.log(result);
                _this.setData({
                    orderList: result
                })
            }
        })
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

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})