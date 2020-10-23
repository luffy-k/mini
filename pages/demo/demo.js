// demo.js
Page({
  mixins: [require('../mixins/themeChanged')],
  data: {
    title: 'Demo',
    desc: 'This is the description about...',
    content: 'Here is the content!\n1.\n2.\n3.\n...',
  },
  onLoad: function (options) {
    // Do some initialize when page load.
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