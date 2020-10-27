//logs.js
const util = require('../../utils/util.js')

Page({
  mixins: [require('../mixins/themeChanged')],
  data: {
    logs: []
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  }
})
