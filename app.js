
const api = require('./api.js');
const menu = require('./img/eatingIMG/menu.js');
//app.js
App({
  onLaunch: function () {
    // 登录
    // wx.login({
    //   success: (res) => {
    //     // 发送 res.code 到后台换取 openid, sessionKey, unionId
    //     if (res.code) {
    //       console.log('request', res.code);
    //       wx.request({
    //         url: api.login,
    //         data: { code: res.code },
    //         success: res => {
    //           // 获取用户信息
    //           var openid = res.data.data.result.openid;
    //           this.globalData.openid = res.data.data.result.openid;
    //           this.globalData.session_key = res.data.data.result.session_key;

    //           wx.getSetting({
    //             success: res => {
    //               if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                      success: res => {
                        // 可以将 res 发送给后台解码出 unionId
                        this.globalData.avatarUrl = res.userInfo.avatarUrl;
                        this.globalData.nickName = res.userInfo.nickName;
                        this.globalData.gender = res.userInfo.gender;
                        var data = {
                          username: res.userInfo.nickName,
                          avatar: res.userInfo.avatarUrl,
                          openid: openid
                        }

                        wx.request({
                          url: api.addUserInfo,
                          data: data,
                          success: (res) => {
                            var data = res;
                          },
                        })

                        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                        // 所以此处加入 callback 以防止这种情况
                        if (this.userInfoReadyCallback) {
                          this.userInfoReadyCallback(res)
                        }
                      }
                    })
    //               }
    //             }
    //           })
    //         },
    //         fail: function (res) {
    //           console.log('请求失败', res);
    //         }
    //       })
    //     } else {
    //       console.log('获取用户登录态失败：', res.errMsg);
    //     }
    //   },
    //   fail: function () {
    //     console.log('获取数据失败');
    //   }
    // })

    wx.request({
      url: api.foodFindAll,
      success: (res) => {
        var data = res;
      }
    })
  },
  globalData: {
    // userInfo: null,
    session_key: null,
    openid: null,
    avatarUrl: null,  // 头像
    nickName: null,   // 用户名
    gender: null,    // 性别
  }
})