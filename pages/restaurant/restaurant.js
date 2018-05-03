Page({

  /**
   * 页面的初始数据
   */
  data: {
    infoData: {
      name: '一晌贪食',
      phone: '13912341234',
      address: '成都天府大道',
      detail: '必胜客是比萨专卖连锁企业之一，由法兰克·卡尼和丹·卡尼两兄弟在1958年，凭着由母亲借来的600美元于美国堪萨斯州威奇托创立首间必胜客餐厅。它的标识特点是把屋顶作为餐厅外观显著标志。必胜客属于百胜餐饮集团'
    },
    windowHeight: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var page = this;
    wx.getSystemInfo({
      success: function (res) {
        page.setData({
          windowHeight: res.windowHeight
        })
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