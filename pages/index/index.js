//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    imgData: [
      "http://139.224.72.205/images/loreal/banner.png",
      "http://139.224.72.205/images/loreal/banner.png",
      "http://139.224.72.205/images/loreal/banner.png",
      "http://139.224.72.205/images/loreal/banner.png"
    ],
    width:750,
    height: 588,
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
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  gotoDetai(e){
    console.log(e)
    wx.navigateTo({
      url: '/pages/detail/detail?goodsId=' + e.target.dataset.goodsid,
    })
  },
  iconTap(e){
    switch (e.currentTarget.dataset.type) {
      case "1":
        wx.navigateTo({
          url: '/pages/getCoupons/getCoupons',
        })
        break;
      case "2":
        wx.navigateTo({
          url: '/pages/starProduct/starProduct',
        })
        break;
      case "3":
        wx.switchTab({
          url: '/pages/goods/goods'
        })
        break;
      case "4":
        wx.navigateTo({
          url: '/pages/brandStory/brandStory',
        })
        break;
      default:
        break;
    }
  }
})