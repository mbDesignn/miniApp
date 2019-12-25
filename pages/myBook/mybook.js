var app = getApp()

Page({
  data: {
    currentTab: 0
  },

  setContainerHeight: function(e) {
    //创建节点选择器
    var query = wx.createSelectorQuery();
    //选择id
    query.select('#mjltest').boundingClientRect()
    query.exec(function (res) {
      //res就是 所有标签为mjltest的元素的信息 的数组
      console.log(res);
      //取高度
      console.log(res[0].height);
    })
    // //图片的原始宽度
    // var imgWidth = e.detail.width;

    // //图片的原始高度
    // var imgHeight = e.detail.height;

    // //同步获取设备宽度
    // var sysInfo = wx.getSystemInfoSync();
    // console.log("sysInfo:", sysInfo);

    // //获取屏幕的宽度
    // var screenWidth = sysInfo.screenWidth;

    // //获取屏幕和原图的比例
    // var scale = screenWidth / imgWidth;

    // //设置容器的高度
    // this.setData({
    //   height: imgHeight
    // })
  },
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.setContainerHeight()
  },
  //滑动切换
  swiperTab: function(e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  //点击切换
  clickTab: function(e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  }
})