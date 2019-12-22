// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: [{
      name: 'USA',
      value: ''
    }],
    realVal: '',
    num: 1,
  },
  bindMinus() {
    if (this.data.num >= 2) {
      this.setData({
        num: this.data.num - 1
      })
    }else {
      console.log('即将删除产品！')
    }

  },
  bindPlus() {
    this.setData({
      num: this.data.num + 1
    })
  },
  radioChange: function (e) {
    this.data.realVal = e.detail.value;
    console.log(this.data.realVal);
  },
  bindtapRadio: function (e) {
    var items = this.data.goods;
    for (var i = 0; i < items.length; i++) {
      if (items[i].name == this.data.realVal) {
        for (var j = 0; j < items.length; j++) {
          // console.log("items[j].checked = ", items[j].checked);
          if (items[j].checked && j != i) {
            items[j].checked = false;
          }
        }
        items[i].checked = !(items[i].checked);
        console.log("-----:", items);
        // this.setData(this.data.items[i]);

      }
    }
    this.setData({
      goods: items
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})