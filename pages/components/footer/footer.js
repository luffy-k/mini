// footer.js
const app = getApp();

Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    showText: { // 显示文本
      type: Boolean,
      value: true
    },
    showTheme: { // 显示主题
      type: Boolean,
      value: true
    },
    isColumn: { // 垂直布局
      type: Boolean,
      value: false
    },
    topBarBG: { // 传参 topBarBG 记录页面配置顶部背景色·
      type: String,
      value: '#fff'
    },
    tabBar: { // 传参 tabBar 为 true，则可以切换 theme
      type: Boolean,
      value: false
    },
  },
  data: {
    footerText: '',
    themeImg: '',
  },
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      if (this.data.showText) {
        const { footerText } = app.globalData;
        this.setData({ footerText });
      }
      if(!this._theme){
        this.setTheme(app.globalData.theme);
      }
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  pageLifetimes: {
    show: function () {
      // 页面被展示
      const { theme } = app.globalData;
      if (this._theme !== theme) {
        this.setTheme(theme);
      }
    },
    hide: function () {
      // 页面被隐藏
    },
    resize: function (size) {
      // 页面尺寸变化
    }
  },
  methods: {
    getThemeImg: function (theme) {
      const icon = theme === 'light' ? 'night' : 'day';
      return `url(../../../static/images/weather-${icon}.png)`;
    },
    getTabBarStyle: function (theme) {
      return theme === 'light' ? {
        backgroundColor: "#fff",
        borderStyle: "black",
      } : {
          backgroundColor: '#111',
          borderStyle: 'white'
        };
    },
    getNavigationBarStyle: function (theme) {
      return theme === 'light' ? {
        frontColor: '#000000',
        backgroundColor: this.data.topBarBG,
      } : {
          frontColor: '#ffffff',
          backgroundColor: '#111111',
        }
    },
    setTheme: function (theme) {
      if (!theme) {
        return;
      }
      console.log('SET THEME!');
      const { showTheme, tabBar } = this.data;
      // 记录当前theme
      this._theme = theme;
      // 切换顶部navigationBar
      wx.setNavigationBarColor(this.getNavigationBarStyle(theme));
      // 切换图标
      if(showTheme){
        this.setData({ themeImg: this.getThemeImg(theme) });
      }
      // 切换底部tabBar
      if(tabBar){
        wx.setTabBarStyle(this.getTabBarStyle(theme));
      }
    },
    themeClick: function () {
      let { theme } = app.globalData;
      theme = theme === 'light' ? 'dark' : 'light';
      // 切换主题
      app.themeChanged(theme);
      this.setTheme(theme);
    }
  }
})