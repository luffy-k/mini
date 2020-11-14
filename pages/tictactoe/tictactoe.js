// tictactoe.js
const app = getApp();

Page({
  mixins: [require('../mixins/themeChanged')],
  data: {
    title: 'TicTacToe',
    desc: '',
    isPad: false,
    infoStyle: '',
    boardStyle: '',
    actionStyle: '',
    borders: Array(4).fill(1),
    squares: Array(9).fill(''),
    winLines: [],
    history: [],
    step: 0,
    xIsNext: true,
    status: 'NEXT PLAYER: ',
    player: 'X',
  },
  onLoad: function (options) {
    // Do some initialize when page load.
    const { systemInfo } = app.globalData;
    const width = systemInfo.screenWidth;
    const height = systemInfo.screenHeight;
    let isPad = false;
    let size = width < 700 ? width - 30 : 520;
    if (height < 520) {
      size = height - 30;
    }
    if (size === 520) {
      isPad = true;
    }
    const boardStyle = `width:${size}px;height:${size}px`;
    const infoStyle = `width:${size}px;height:${size * 0.14}px`;
    const actionStyle = `width:${size}px;height:${size * 0.22}px`;
    this.setData({ boardStyle, infoStyle, actionStyle, isPad });
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
    const { squares, winLines, xIsNext, history, step } = this.data;
    if (winLines.length || squares[idx]) {
      return;
    }
    squares[idx] = xIsNext ? 'X' : 'O';
    history.splice(step, history.length - step, {
      k: idx, v: squares[idx]
    });
    const data = this.getStatusData(step+1, idx, true);
    this.setData({
      history,
      ...data
    });
  },
  // 获取状态
  getStatusData(step, idx, isNew){
    const { squares, history, xIsNext } = this.data;
    let temp;
    if(step > 4 && (isNew || step === history.length)){
      temp = this.getWinLines(squares);
    }
    let status, player;
    if (temp && idx) {
      status = 'WINNER: ';
      player = squares[idx];
    } else if(step === 9){
      status = 'Tie Game!';
      player = '';
    }else{
      status = 'NEXT PLAYER: ';
      player = !xIsNext ? 'X' : 'O';
    }
    return {
      winLines: temp || [],
      xIsNext: !xIsNext,
      step, squares, status, player
    };
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
  },
  // 撤回事件
  undo: function () {
    const { history, step, squares } = this.data;
    if (!step) {
      return;
    }
    const { k } = history[step - 1];
    squares[k] = "";
    const data = this.getStatusData(step-1);
    this.setData(data);
  },
  // 恢复事件
  redo: function () {
    const { history, step, squares, xIsNext } = this.data;
    if(step === history.length){
      return;
    }
    const { k, v } = history[step];
    squares[k] = v;
    const data = this.getStatusData(step+1, k);
    this.setData(data);
  },
  // 重置
  reset: function () {
    this.setData({
      squares: Array(9).fill(''),
      winLines: [],
      history: [],
      step: 0,
      xIsNext: true,
      status: 'NEXT PLAYER: ',
      player: 'X'
    });
  },
});