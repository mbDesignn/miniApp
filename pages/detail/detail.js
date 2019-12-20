// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsId: '', //1:dbp 2:cica 3:xhs
    urlList:[],
    imgData: [
      "http://139.224.72.205/images/loreal/detai_banner.jpg",
      "http://139.224.72.205/images/loreal/detai_banner.jpg",
      "http://139.224.72.205/images/loreal/detai_banner.jpg",
      "http://139.224.72.205/images/loreal/detai_banner.jpg"
    ],
    width: 750,
    height: 810,
  },

  setContainerHeight: function (e) {

    //图片的原始宽度
    var imgWidth = e.detail.width;

    //图片的原始高度
    var imgHeight = e.detail.height;

    //同步获取设备宽度
    var sysInfo = wx.getSystemInfoSync();
    console.log("sysInfo:", sysInfo);

    //获取屏幕的宽度
    var screenWidth = sysInfo.screenWidth;

    //获取屏幕和原图的比例
    var scale = screenWidth / imgWidth;

    //设置容器的高度
    this.setData({
      height: imgHeight
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('0-0-', options)
    this.setData({
      goodsId: options.goodsId
    })
    this.getUrlList(options.goodsId)
  },
  getUrlList(goodsId){
    let urlList = [];
    let baseUrl = 'http://139.224.72.205/images/loreal/'
    if (goodsId == '1'){
      for(let i=1; i<8; i++){
        urlList.push(baseUrl +`dbp/dbp${i}.png`)
      }
    } else if (goodsId == '2'){
      for (let i = 1; i < 16; i++) {
        urlList.push(baseUrl + `cica/cica${i}.png`)
      }
    }else {
      for (let i = 1; i < 8; i++) {
        urlList.push(baseUrl + `xhs/xhs${i}.png`)
      }
    }
    this.setData({
      urlList
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  addToCart(){
    wx.switchTab({
      url: '/pages/cartGroup/cartGroup'
    })
  },
  gotoBook(){
    wx.navigateTo({
      url: '/pages/book/book?goodsId='+this.data.goodsId
    })
  }
})