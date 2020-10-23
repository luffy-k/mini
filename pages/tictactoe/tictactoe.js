// tictactoe.js
//获取应用实例
const app = getApp()

Page({
  data: {
    footerText: '',
    title: 'TicTacToe',
    desc: '',
  },
  onLoad: function(options) {
    // Do some initialize when page load.
    const { footerText } = app.globalData;
    if (footerText) {
      this.setData({footerText})
    }
  },
  onShow: function() {
    // Do something when page show.
  },
  onReady: function() {
    // Do something when page ready.
  },
  onHide: function() {
    // Do something when page hide.
  },
  onUnload: function() {
    // Do something when page close.
  },
});