const Restaurant = require('../module/restaurant.js');

Page({

  data: {
    infoData: {},
    windowHeight: ''
  },

  onLoad: function (options) {
    var page = this;
    wx.getSystemInfo({
      success: function (res) {
        page.setData({
          windowHeight: res.windowHeight
        })
      }
    });
    Restaurant.getRestaurant((res) => {
        this.setData({
            infoData: res.result[0]
        });
    });
  },

  mackPhoneCall: function () {
      wx.showModal({
          title: '提示',
          content: '确定拨打电话吗',
          success: (res) => {
            if (res.confirm) {
                wx.makePhoneCall({
                    phoneNumber: '13912341234',
                });
            }
          }
      });
  }
})