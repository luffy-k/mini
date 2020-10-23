// footer.js
const app = getApp();

Component({
  options: {
    addGlobalClass: true,
  },
  properties: {

  },
  data: {
    footerText: '',
    themeImg: '',
  },
  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
      const { footerText, theme } = app.globalData;
      const icon = theme === 'light' ? 'night' : 'day';
      const themeImg = `url(../../../static/images/weather-${icon}.png)`;
      this.setData({footerText, themeImg});
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  },
})