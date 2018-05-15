// pages/address/controlAddress/controlAddress.js

var Address = require("../../module/address.js");

Page({

    /**
     * 页面的初始数据
     */
    data: {
        name: '',
        phone: '',
        address: '',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.getStorage({
            key: 'updateAddress',
            success: (res) => {
                this.setData({
                    updateAddress: res.data,
                    name: res.data.name,
                    phone: res.data.phone,
                    address: res.data.address
                });
            },
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

    addAddressRequest: function () {
        var data = {
            name: '',
            telephone: '',
            address: ''
        }
    },

    inputChange: function (e) {
        var value = e.detail.value;
        var name = e.currentTarget.dataset.name;
        this.setData({
            [name]: value
        });
    },

    // 设置
    setAddressItem: function (e) {
        var updateAddress = this.data.updateAddress;
        var name = this.data.name;
        var phone = this.data.phone;
        var address = this.data.address;
        var data = {
            name: name,
            phone: phone,
            address: address,
            open_id: getApp().globalData.open_id,
        }
        if (updateAddress) {
            data.receiver_id = updateAddress.receiver_id
        }

        if (name == null || name == '' || phone == null || phone == '' || address == null || address == '') {
            wx.showToast({
                title: '信息不能为空',
                icon: 'none'
            });
            return;
        }

        // 验证手机号
        if (!(/^1[3|4|5|8|9][0-9]\d{4,8}$/.test(phone))) {
            wx.showToast({
                title: '号码不正确',
                icon: "none"
            });
            return;
        }

        // 验证地址
        if ((/[^\a-\z\A-\Z0-9\u4E00-\u9FA5]/g).test(address)) {
            wx.showToast({
                title: '地址不能出现特殊字符',
                icon: "none"
            })
            return;
        }

        if (updateAddress) {
            Address.updateAddress(data, (res) => {
                var result = res;
                // 清除缓存的订单信息
                wx.removeStorage({
                    key: 'updateAddress',
                    success: (res) => {
                        var content = '修改成功';
                        showMyToast(content);
                        var page = this;
                        clearInput(page);
                    },
                })
            });
        } else {
            Address.addAddress(data, (res) => {
                var result = res;
                var content = '添加成功';
                showMyToast(content);
                var page = this;
                clearInput(page);
            });
        }

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
})

function showMyToast(content) {
    wx.showModal({
        title: '提示',
        content: content,
        showCancel: false,
        success: (res) => {
            wx.navigateBack({
                delta: 1
            })
        }
    })
}

function clearInput(page) {
    page.setData({
        showPopup: false,   // 弹出层状态
        showInputModal: false,
        name: '',
        phone: '',
        address: '',
    });

}