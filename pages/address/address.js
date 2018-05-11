// pages/address/address.js

var Address = require('../module/address.js');

var currItem = '';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        showPopup: false,   // 弹出层状态
        showInputModal: false,  // 输入框弹出层
        // showErrorModal: false,  // 错误弹出层
        folderName: '',
        offset: 0,  // 初始获取数据位置
        folderList: [],

        selectedItem: 0,
        addressList: []
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
                            success: () => {
                                wx.navigateBack({
                                    delta: 1,
                                });
                            }
                        });
                    } else {
                        var defaultData = {
                            orderShipping_id: item.orderShipping_id,
                        }
                        Address.setDefaultAddress(defaultData, (res) => {
                            var open_id = 123456;
                            var page = this;
                            getAllAddress(open_id, page);
                        });
                    }
                }
            }
        })
    },

    getMoreList: function () {
        var page = this;
        var ownerId = this.data.ownerId;
        getFolderList(page, ownerId);
    },

    // 唤起弹出层
    setModalStatus: function (e) {
        var item = e.currentTarget.dataset.item;

        this.setData({
            showModalStatus: true,
            item: item,
        });

        // 弹出动画
        var animation = wx.createAnimation({
            duration: 200,
            timingFunction: "linear",
            delay: 0
        });
        this.animation = animation
        animation.translateY(300).step()
        this.setData({
            animationData: animation.export()
        });
        setTimeout(function () {
            animation.translateY(0).step()
            this.setData({
                animationData: animation
            });
        }.bind(this), 200);
    },

    cancelModalStatus: function () {
        this.setData({
            showModalStatus: false
        });
    },

    addAddress: function () {
        wx.navigateTo({
            url: '/pages/address/controlAddress/controlAddress',
        });
    },

    updateItem: function () {
        var item = this.data.item;
        wx.setStorage({
            key: "updateAddress",
            data: item,
        });
        this.setData({
            showModalStatus: false
        });
       wx.navigateTo({
            url: '/pages/address/controlAddress/controlAddress',
        });
    },

    deleteItem: function (e) {
        var item = this.data.item;
        var open_id = 123456;

        this.setData({
            showModalStatus: false
        });

        wx.showModal({
            title: '提示',
            content: '确定删除这个信息吗？',
            success: (res) => {
                if (res.confirm) {
                    Address.deleteItem(open_id, (res) => {
                        wx.showToast({
                            title: '删除成功',
                        });
                        var page = this;
                        getAllAddress(open_id, page);
                    });
                }
            }
        });
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        var open_id = 123456;
        var page = this;
        getAllAddress(open_id, page);
    },

})

function getAllAddress(open_id, page) {
    Address.getAllAddress(open_id, (res) => {
        var dataList = res.data.result;
        page.setData({
            addressList: dataList
        });
    });

}