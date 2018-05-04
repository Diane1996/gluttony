// pages/address/address.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        selectedItem: 0,
        addressList: [{
            name: '张三',
            phone: '13912341234',
            address: '成都天府大道1314号'
        }, {
            name: '李四',
            phone: '13912341234',
            address: '成都天府大道1314号'
        }, {
            name: '王二',
            phone: '13912341234',
            address: '成都天府大道1314号'
        }, {
            name: '小明',
            phone: '13912341234',
            address: '成都天府大道1314号'
        },]
    },

    selectedItem: function (e) {
        var item = e.currentTarget.dataset.item;
        var index = e.currentTarget.dataset.index;
        var getAddress = this.data.getAddress;
        var content = getAddress ? '确定将它设置为收货地址吗？' : '确定将它设置为默认收货地址吗？'

        wx.showModal({
            content: content,
            success: (res) => {
                if (res.confirm) {
                    if (getAddress) {
                        this.setData({
                            selectedItem: index
                        });
                        wx.setStorage({
                            key: 'address',
                            data: item,
                        });
                        wx.navigateBack({
                            delta: 1,
                        })
                    } else {
                        // 不是结算页面跳转过来的就将选中的数据存入数据库
                    }

                }
            }
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            getAddress: options.getAddress
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