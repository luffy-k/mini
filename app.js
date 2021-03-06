//app.js
require('./libs/mixins/Mixins');

const themePages = [];

App({
  globalData: {
    systemInfo: null,
    userInfo: null,
    footerText: 'Copyright © 2020 Jie_',
    theme: 'light', // dark
  },
  // 切换主题相关
  themeChanged(theme) {
    this.globalData.theme = theme;
    themePages.forEach((page) => {
      page.themeChanged(theme);
    });
  },
  watchThemePages(page) {
    if (themePages.indexOf(page) < 0) {
      themePages.push(page);
    }
  },
  unWatchThemePages(page) {
    const index = themePages.indexOf(page);
    if (index > -1) {
      themePages.splice(index, 1);
    }
  },
  // 获取系统信息
  getSystemInfo() {
    try {
      const res = wx.getSystemInfoSync();
      this.globalData.systemInfo = res;
    } catch (e) {
      // Do something when catch error
      console.error('[app.getSystemInfo]', e);
    }
  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    
    this.getSystemInfo();
  }
})