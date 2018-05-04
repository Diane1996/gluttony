const api = require('./../../api.js');

var menu = require('./../../img/eatingIMG/menu.js');

var cartList = [];  // 购物车列表
// pages/food/food.js
Page({

    /**
     * 页面的初始数据
     */

    data: {
        isCartEmpty: true,
        categoryData: '',
        selectedItem: 0,
        showCartList: false,
        cartList: [],
        total: 0
    },

    toggleCartList: function () {
        this.setData({
            showCartList: this.data.showCartList ? false : true,
        })
    },

    cancelCartList: function () {
        this.setData({
            showCartList: false,
        })
    },

    selectedCategory: function (e) {
        var index = e.currentTarget.dataset.index;
        this.setData({
            selectedItem: index
        })
    },

    addCart: function (e) {
        var item = e.currentTarget.dataset.item;
        for (var i = 0; i < cartList.length; i++) {
            if (cartList[i].name === item.name)
                return;
        }
        item.count = 1;
        cartList.push(item);
        var page = this;
        getTotal(page);
        this.setData({
            cartList: cartList,
            isCartEmpty: false
        });
    },

    minusCount: function (e) {
        var index = e.currentTarget.dataset.index;
        if (cartList[index].count === 1) return;
        cartList[index].count = cartList[index].count - 1;
        this.setData({
            cartList: cartList
        });
        var page = this;
        getTotal(page);
     },

    addCount: function (e) {
        var index = e.currentTarget.dataset.index;
        cartList[index].count = cartList[index].count + 1;
        this.setData({
            cartList: cartList
        });
        var page = this;
        getTotal(page);
     },

    goToOrder: function (e) {
        var cartListData = {
            cartList: this.data.cartList,
            total: this.data.total
        }
        wx.setStorage({
            key: 'cartList',
            data: cartListData,
        });
        wx.navigateTo({
            url: '../order/order',
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        this.setData({
            menu: menu.menu
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        var _this = this;
        // wx.request({
        //   url: api.foodFindAll,
        //   success: function (res) {
        //     _this.setData({
        //       foodInfo: res.data.data.result
        //     })
        //     console.log(res.data.data.result);
        //   }
        // })
        // // var _this = this;
        // wx.request({
        //   url: api.categoryFindAll,
        //   success: function (res) {
        //     _this.setData({
        //       categoryData: res.data.data.result
        //     })
        //     console.log(res.data.data.result);
        //   }
        // })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        wx.getStorage({
            key: 'cartList',
            success: (res) => {
                this.setData({
                    // cartList: res.data.cartList
                });
                // cartList = res.data.cartList
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

function getTotal(page) {
    var total = 0;
    for (var i = 0; i < cartList.length; i++) {
        total += cartList[i].price * cartList[i].count;
    }
    page.setData({
        total: total
    });
}