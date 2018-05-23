// pages/accredit/accredit.js
Page({
    bindGetUserInfo: function () {
        wx.showToast({
            title: '授权成功',
            duration: 500,
            success: () => {
                setTimeout(() => {
                    wx.navigateBack({
                        delta: 1
                    });
                }, 500);
            }
        });
    }
})