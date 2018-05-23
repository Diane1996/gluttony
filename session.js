
var api = require('./api.js')

// 登录
function Login(resolve, reject) {
    wx.login({
        success: (res) => {
            // 发送 res.code 到后台换取 openid, sessionKey, unionId
            if (res.code) {
                console.log('request', res.code);
                wx.request({
                    url: api.login,
                    data: { code: res.code },
                    success: res => {
                        // 获取用户信息
                        var openid = res.data.data.result.openid;
                        getApp().globalData.openid = res.data.data.result.openid;
                        getApp().globalData.session_key = res.data.data.result.session_key;
                        resolve();
                    },
                    fail: function (res) {
                        console.log('请求失败', res);
                    }
                })
            } else {
                console.log('获取用户登录态失败：', res.errMsg);
            }
        },
        fail: function () {
            console.log('获取数据失败');
        }

    })
}

// 获取用户信息
function getUserInformation(callback) {
    var LoginPromise = new Promise((resolve, reject) => {
        Login(resolve, reject);
    });
    LoginPromise.then(() => {
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            if (res.userInfo) {
                                getApp().globalData.avatarUrl = res.userInfo.avatarUrl;
                                getApp().globalData.nickName = res.userInfo.nickName;
                                getApp().globalData.gender = res.userInfo.gender;
                                var data = {
                                    username: res.userInfo.nickName,
                                    avatar: res.userInfo.avatarUrl,
                                    openid: getApp().globalData.openid
                                }

                                wx.request({
                                    url: api.addUserInfo,
                                    data: data,
                                    success: (res) => {
                                        var data = res;
                                    },
                                })

                                callback();
                            }


                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res)
                            }
                        }
                    })
                } else {
                    wx.navigateTo({
                        url: '/pages/accredit/accredit',
                    })
                }
            }
        })
    });
}

module.exports = {
    Login,
    getUserInformation,
}