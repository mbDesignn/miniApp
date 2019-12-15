// const WXAPI = require('apifm-wxapi')
// const AUTH = require('../../utils/auth')

// var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["未使用", "已使用", "已过期"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    list: [],
    couponInput: '', // 输入的优惠券码
    unusedCoupons: [{
      value: 20,
      condition: '满298使用',
      time: '2019.12.12-12.12',
      range: '全场商品可用',
      details: [
        '使用时间：2019年12月12日 00:00-59:59',
        '优惠券内容：全部商品可用'
      ]
    }, {
      value: 80,
      condition: '满298使用',
      time: '2019.12.12-12.19',
      range: '全场商品可用',
      details: [
        '使用时间：2019年12月19日 00:00-59:59',
        '优惠券内容：全部商品可用'
      ]
    }], //可领取的优惠券列表
    usedCoupons: [], //已领取的可用优惠券列表
    invalidCoupons: [] //已失效的优惠券
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.setData({
      list: this.data.unusedCoupons
    })
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
  tabClick: function (e) {
    console.log(e)
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
    let list = []
    if (e.currentTarget.id == 0){
      list = this.data.unusedCoupons
    }
    this.setData({
      list
    })
  }
})