// footer.js
const app = getApp();

Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    showText: {
      type: Boolean,
      value: true
    },
    showTheme: {
      type: Boolean,
      value: true
    },
    isColumn:{
      type: Boolean,
      value: false
    },
    barBG: {
      type: String,
      value: '#fff'
    },
  },
  data: {
    footerText: '',
    themeImg: '',
  },
  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
      const { footerText, theme } = app.globalData;
      const themeImg = this.getThemeImg(theme);
      this.setData({footerText, themeImg});
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  methods: {
    getThemeImg: function(theme){
      const icon = theme === 'light' ? 'night' : 'day';
      return `url(../../../static/images/weather-${icon}.png)`;
    },
    getTabBarStyle: function(theme){
      return theme === 'light' ? {
        backgroundColor: "#fff",
        borderStyle: "black",
      } : {
        backgroundColor: '#111',
        borderStyle: 'white'
      };
    },
    getNavigationBarStyle: function(theme){
      return theme === 'light' ? {
        frontColor: '#000000',
        backgroundColor: this.data.barBG,
      } : {
        frontColor: '#ffffff',
        backgroundColor: '#111111',
      }
    },
    themeClick: function(){
      let {theme} = app.globalData;
      theme = theme === 'light' ? 'dark' : 'light';
      // 切换主题
      app.themeChanged(theme);
      // 切换图标navigationBar
      this.setData({themeImg: this.getThemeImg(theme)});
      // 切换顶部
      wx.setNavigationBarColor(this.getNavigationBarStyle(theme));
      // 切换底部tabBar
      wx.setTabBarStyle(this.getTabBarStyle(theme));
    }
  }
})