
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        username: '',
        headImg: '',
    },

    gotoAddress: function () {
        wx.navigateTo({
            url: '../address/address',
        })
    },
    gotoQuestion: function () {
        wx.navigateTo({
            url: '../question/question',
        })
    },
    gotoRestaurant: function () {
        wx.navigateTo({
            url: '../restaurant/restaurant',
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
    onReady: function (e) {
        this.setData({
            headImg: app.globalData.avatarUrl,
            username: app.globalData.nickName,
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