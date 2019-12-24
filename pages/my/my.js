Page({
  data: {
    wxlogin: true,
    mybgUrl:'http://139.224.72.205/images/loreal/my/mybg.png',
    mybannerUrl:'http://139.224.72.205/images/loreal/my/banner.png',
    showOneButtonDialog: false,
    oneButton: [{ text: '复制微信号' }],
    balance: 0.00,
    freeze: 0,
    score: 0,
    score_sign_continuous: 0,
    rechargeOpen: false // 是否开启充值[预存]功能
  },
  onLoad() {
    let rechargeOpen = wx.getStorageSync('RECHARGE_OPEN')
    if (rechargeOpen && rechargeOpen == "1") {
      rechargeOpen = true
    } else {
      rechargeOpen = false
    }
    this.setData({
      rechargeOpen: rechargeOpen
    })
  },
  onShow() {
    // const _this = this
    // this.setData({
    //   version: CONFIG.version,
    //   vipLevel: app.globalData.vipLevel
    // })
    // AUTH.checkHasLogined().then(isLogined => {
    //   this.setData({
    //     wxlogin: isLogined
    //   })
    //   if (isLogined) {
    //     _this.getUserApiInfo();
    //     _this.getUserAmount();
    //   }
    // })
    // // 获取购物车数据，显示TabBarBadge
    // TOOLS.showTabBarBadge();
  },
  tapBanner(){
    this.setData({
      showOneButtonDialog: true
    })
  },
  tapDialogButton() {
    const self = this;
    wx.setClipboardData({
      //准备复制的数据
      data: 'sgmb1806',
      success: function (res) {
        self.setData({
          showOneButtonDialog: false
        })
        wx.showToast({
          title: '复制成功，去添加好友吧',
          icon: 'none'
        })
      }
    })
    
  },
  gotoOrderlist(){
    wx.navigateTo({
      url: '/pages/myBook/mybook',
    })
  },
  gotoCoupons(){
    wx.navigateTo({
      url: '/pages/coupons/coupons',
    })
  },
  gotoService() {
    console.log('跳转客服。。。。')
    // wx.navigateTo({
    //   url: '/pages/service/service',
    // })
  },
  gotoBrandStory() {
    wx.navigateTo({
      url: '/pages/brandStory/brandStory',
    })
  },
  gotoTutorial() {
    wx.navigateTo({
      url: '/pages/tutorial/tutorial',
    })
  },
  onGotUserInfo(e) {
    if (!e.detail.userInfo) {
      wx.showToast({
        title: '您已取消登录',
        icon: 'none',
      })
      return;
    }
    if (app.globalData.isConnected) {
      AUTH.register(this);
    } else {
      wx.showToast({
        title: '当前无网络',
        icon: 'none',
      })
    }
  },
  aboutUs: function () {
    wx.showModal({
      title: '关于我们',
      content: '本系统基于开源小程序商城系统 https://github.com/EastWorld/wechat-app-mall 搭建，祝大家使用愉快！',
      showCancel: false
    })
  },
  loginOut() {
    AUTH.loginOut()
    wx.reLaunch({
      url: '/pages/my/index'
    })
  },
  getPhoneNumber: function (e) {
    if (!e.detail.errMsg || e.detail.errMsg != "getPhoneNumber:ok") {
      wx.showModal({
        title: '提示',
        content: e.detail.errMsg,
        showCancel: false
      })
      return;
    }
    var that = this;
    WXAPI.bindMobileWxa(wx.getStorageSync('token'), e.detail.encryptedData, e.detail.iv).then(function (res) {
      if (res.code === 10002) {
        this.setData({
          wxlogin: false
        })
        return
      }
      if (res.code == 0) {
        wx.showToast({
          title: '绑定成功',
          icon: 'success',
          duration: 2000
        })
        that.getUserApiInfo();
      } else {
        wx.showModal({
          title: '提示',
          content: '绑定失败',
          showCancel: false
        })
      }
    })
  },
  getUserApiInfo: function () {
    var that = this;
    WXAPI.userDetail(wx.getStorageSync('token')).then(function (res) {
      if (res.code == 0) {
        let _data = {}
        _data.apiUserInfoMap = res.data
        if (res.data.base.mobile) {
          _data.userMobile = res.data.base.mobile
        }
        that.setData(_data);
      }
    })
  },
  getUserAmount: function () {
    var that = this;
    WXAPI.userAmount(wx.getStorageSync('token')).then(function (res) {
      if (res.code == 0) {
        that.setData({
          balance: res.data.balance.toFixed(2),
          freeze: res.data.freeze.toFixed(2),
          score: res.data.score
        });
      }
    })
  },
  goAsset: function () {
    wx.navigateTo({
      url: "/pages/asset/index"
    })
  },
  goScore: function () {
    wx.navigateTo({
      url: "/pages/score/index"
    })
  },
  goOrder: function (e) {
    wx.navigateTo({
      url: "/pages/order-list/index?type=" + e.currentTarget.dataset.type
    })
  },
  cancelLogin() {
    this.setData({
      wxlogin: true
    })
  },
  processLogin(e) {
    if (!e.detail.userInfo) {
      wx.showToast({
        title: '已取消',
        icon: 'none',
      })
      return;
    }
    AUTH.register(this);
  },
})