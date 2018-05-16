const api = require('./../../api.js');

var menu = require('./../../img/eatingIMG/menu.js');
var Food = require("../module/food.js");


var cartList = [];  // 购物车列表
// pages/food/food.js
Page({

    /**
     * 页面的初始数据
     */

    data: {
        isCartEmpty: false,
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
        cartList = this.data.cartList;
        for (var i = 0; i < cartList.length; i++) {
            if (cartList[i].name === item.name)
                return;
        }
        item.count = 1;
        cartList.push(item);
        var page = this;
        getTotal(page);
        wx.setStorage({
            key: 'cartList',
            data: cartList,
        });
        this.setData({
            cartList: cartList,
            isCartEmpty: false
        });

    },

    minusCount: function (e) {
        var index = e.currentTarget.dataset.index;
        cartList[index].count = cartList[index].count - 1;
        if (cartList[index].count === 0) {
            cartList.splice(index, 1);
            if (cartList.length === 0) {
                this.setData({
                    isCartEmpty: true,
                    showCartList: false
                });
            }
        }
        this.setData({
            cartList: cartList
        });
        wx.setStorage({
            key: 'cartList',
            data: cartList,
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

        // this.setData({
        //     menu: menu.menu
        // })
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
        var page = this;
        wx.getStorage({
            key: 'cartList',
            success: (res) => {
                var total = this.data.total;
                cartList = [];
                if (res.data.cartList == '' || res.data.cartList === undefined) {
                    total = 0;
                    cartList = [];
                    this.setData({
                        isCartEmpty: true,
                    })
                } else {
                    cartList = res.data.cartList;
                }

                this.setData({
                    cartList: cartList,
                    total: total,
                });
                getTotal(page);
            },
        })

        getFoodList(page);
    },

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

function getFoodList(page) {
    var categoryData = new Promise((resolve, reject) => {
        Food.getCategoryList((res) => {
            var data = res;
            resolve(res.data.result);
        });
    });

    categoryData.then((categoryData) => {
        return new Promise((resolve) => {
            Food.getFoodList((res) => {
                var ress = res.data.result;
                var list = [];
                for (let i = 0; i < categoryData.length; i++) {
                    var listItem = {};
                    listItem.name = categoryData[i].category_name;
                    listItem.list = [];
                    for (let j = 0; j < ress.length; j++) {
                        var foodItem = ress[j];
                        if (categoryData[i].category_id === ress[j].category_id) {
                            listItem.list.push(foodItem);
                        }
                    }
                    list.push(listItem)
                }
                resolve(list);
            });
        })
    })
        .then((menuList) => {
            console.log(menuList);
            page.setData({
                menu: menuList
            });
        })
}