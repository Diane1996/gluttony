const api = require('./../../api.js');

// pages/orderShipping/orderShipping.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      openid: '',
      receiver_name: '',
      receiver_phone: '',
      receiver_address: ''
    },
    getInfo: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  addInfo: function(e) {
    if (this.infoTest(e) === true) {
        this.formSubmit(e, 'add');
    }
  },

  changeInfo: function(e) {
    if (this.infoTest(e) === true) {
        this.formSubmit(e, 'change');
    }
  },

  deleteInfo: function(e) {
    this.formSubmit(e, 'delete');
  },

  formSubmit: function (e, type) {
    var requestType = '';
    switch (type) {
      case 'add':
        requestType = api.orderShippingAdd;
        break;
      case 'change':
        requestType = api.orderShippingUpdate;
        break;
      case 'delete':
        requestType = api.orderShippingDelete;
        break;
    }
    this.setData({
      userInfo: {
        open_id: '123456', // openid获取
        receiver_id: '3eb2fd78',  // 获取得到
        receiver_name: e.detail.value.username,
        receiver_phone: e.detail.value.phone,
        receiver_address: e.detail.value.address      
      }
    });
    console.log(requestType);
    wx.request({
      url: requestType,
      data: this.data.userInfo,
      success: function (res) {
        console.log(res);
        var result = res.data.data.result;
        if (type === 'delete' && result !== 0){
          console.log('删除成功');
        } else {
          switch (result.type) {
            case 'exist':
              console.log('你已经拥有一样的数据了哟');
              break;
            case 'add':
              console.log('数据添加成功');
              break;
            default:
              console.log('错误，请重试');
              break;
          }
        }
      }
    })
  },

  infoTest: function (e) {
    var numberReg = /^(13[0-9]|15[0|1|3|6|7|8|9]|18[8|9])\d{8}$/;
    var name = e.detail.value.username;
    var address = e.detail.value.address;
    var phone = e.detail.value.phone;
    if (name === '' || address === '' || phone === '') {
      console.log('用户信息不能为空');
      return 'msgBlank';
    } else {
      if (numberReg.test(phone)) {
        return true;
      } else {
        console.log('电话号码错误。');
        return 'errPhone';
      }
    }
  },

  getUserOrderShipping: function() {
    var _this = this;
    wx.request({
      url: api.orderShippingFindAll,
      data: {open_id: 123456},
      success: function (res) {
        var result = res.data.data.result;
        if (result !== '') {
          console.log(result);
          _this.setData({
            getInfo: result
          });
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
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