// tictactoe.js
const app = getApp();

Page({
  mixins: [require('../mixins/themeChanged')],
  data: {
    title: 'TicTacToe',
    desc: '',
    size: 0,
    squares: Array(9).fill(''),
    borders: Array(4).fill(1),
  },
  onLoad: function (options) {
    // Do some initialize when page load.
    const { systemInfo } = app.globalData;
    const width = systemInfo.screenWidth;
    const height = systemInfo.screenHeight;
    console.log(width);
    let size = width < 700 ? `${width-30}px` : '520px';
    if (height < 520) {
      size = `${height-30}px`;
    }
    this.setData({ size });
  },
  onShow: function () {
    // Do something when page show.
  },
  onReady: function () {
    // Do something when page ready.
  },
  onHide: function () {
    // Do something when page hide.
  },
  onUnload: function () {
    // Do something when page close.
  },
});