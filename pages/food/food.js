const api = require('./../../api.js');
var cartList = [];  // 购物车列表

// pages/food/food.js
Page({

  /**
   * 页面的初始数据
   */

  data: {
    showCart: true,
    categoryData: '',
    selectedItem: 0,
    showCartList: true,
    category: [
      '分类1', '分类2', '分类3', '分类4', '分类5', '分类6',
    ],
    cartList: [
      {
        name: '名字名字名字名字名字',
        price: '12.7',
        count: 123
      }, {
        name: '名字名字名字名字名字',
        price: '12.7',
        count: 123
      }, {
        name: '名字名字名字名字名字',
        price: '12.7',
        count: 123
      }, {
        name: '名字名字名字名字名字',
        price: '12.7',
        count: 123
      }, {
        name: '名字名字名字名字名字',
        price: '12.7',
        count: 123
      },
    ],
    foodInfo: [
      {
        name: '名字名字名字名字名字',
        price: '12.7',
        sales: 123
      }
    ]
  },

  cancelCartList: function () {
    this.setData({
      showCart: false,
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
    cartList.push(item);
    this.setData({
      showCart: true,
      cartList: cartList
    })
  },

  goToOrder: function (e) {

    wx.navigateTo({
      url: '../order/order',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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