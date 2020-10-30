// tictactoe.js
const app = getApp();

Page({
  mixins: [require('../mixins/themeChanged')],
  data: {
    title: 'TicTacToe',
    desc: '',
    topStyle: '',
    boardStyle: '',
    borders: Array(4).fill(1),
    squares: Array(9).fill(''),
    winLines: [],
    history: [],
    step: 0,
    xIsNext: true,
  },
  onLoad: function (options) {
    // Do some initialize when page load.
    const { systemInfo } = app.globalData;
    const width = systemInfo.screenWidth;
    const height = systemInfo.screenHeight;
    let boardStyle = '';
    let size = width < 700 ? width - 30 : 520;
    if (height < 520) {
      size = height - 30;
    }
    if (size === 520) {
      boardStyle = 'font-size:24px;';
    }
    boardStyle += `width:${size}px;height:${size}px`;
    const topStyle = `width:${size}px;height:${size*0.12}px`;
    this.setData({ boardStyle, topStyle });
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
  // 点击事件
  squareClick: function (event) {
    const { idx } = event.currentTarget.dataset;
    const { squares, winLines, xIsNext, history } = this.data;
    if (winLines.length || squares[idx]) {
      return;
    }
    squares[idx] = xIsNext ? 'X' : 'O';
    history.push({
      k: idx, v: squares[idx]
    });
    let temp;
    if(history.length > 4){
      temp = this.getWinLines(squares);
    }
    this.setData({
      squares, history,
      step: history.length,
      xIsNext: !xIsNext,
      winLines: temp || []
    });
  },
  // 获取胜出连线
  getWinLines(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return lines[i];
      }
    }
    return null;
  }
});