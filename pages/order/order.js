
const api = require('./../../api.js');

// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: -1,
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
    }
  },

  createOrder: function () {
    var getData = {
      open_id: 123456,
      shipping_fee: 123,
      type: this.data.type,
      desk_num: 1,
      people_num: 1,
      receiver_id: '3eb2fd78',
      food_data: this.data.orderList.food_data,
      remark: this.data.textarea
    }
    console.log(this.data.orderList.food_data, typeof this.data.orderList.food_data);
    wx.request({
      url: api.orderCreate,
      data: getData,
      success: function (res) {
        console.log(res);
      }
    })
  },

  addToTextarea: function (e) {
    const text = e.target.dataset.spicy;
    console.log(text);
    this.setData({
      textarea: this.data.textarea + text
    });
  },

  textareaChange: function(e) {

  },

  changeType: function (e) {
    this.setData({
      type: e.target.dataset.num,
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
    wx.request({
      url: api.cartList,
      data: {open_id: 123456},
      success: function(res) {
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