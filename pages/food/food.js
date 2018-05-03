const api = require('./../../api.js');

var menu = require('./../../img/eatingIMG/menu.js');

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
    showCartList: false,
    cartList: [],
    total: 0
  },

  showCartList: function () {
    this.setData({
      showCartList: true,
    })
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
    var total = 0;
    for (var i = 0; i < cartList.length; i++) {
      if (cartList[i].name === item.name) 
      return;
    }
    cartList.push(item);
    for (var i = 0; i < cartList.length; i++) {
      total += item.price;
    }
    this.setData({
      showCart: true,
      cartList: cartList,
      total: total
    });
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