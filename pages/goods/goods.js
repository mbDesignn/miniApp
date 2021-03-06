Page({
  /**
   * 页面的初始数据
   */
  data: {
    categories: [
      { name: '人气星品', id: '1' }, 
      { name: '喷雾/爽肤水', id: '2'},
      { name: '卸妆/洁面', id: '3' },
      { name: '精华', id: '4' },
      { name: '乳液/面霜', id: '5' },
      { name: '手霜', id: '6' }
      ],
    categorySelected: {
      name: '人气星品',
      id: '1'
    },
    currentGoods: [
      {
        "categoryId": 1872,
        "goodsId": 120,
        "characteristic": "CICA 50ml",
        "pic": "../../static/images/goods/cica.png",
      },
      {
        "categoryId": 1872,
        "goodsId":123,
        "characteristic": "大白喷 250ml",
        "pic": "../../static/images/goods/dbp.png",
      },
      {
        "categoryId": 1872,
        "goodsId": 128,
        "characteristic": "修红霜 50ml",
        "pic": "../../static/images/goods/xhs.png",
      },
      {
        "categoryId": 1872,
        "goodsId": 126,
        "characteristic": "精华水 200ml",
        "pic": "../../static/images/goods/jhs.png",
      }
    ],
    onLoadStatus: true,
    scrolltop: 0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.initData();
  },
  initData() {
    let that = this;
    wx.showNavigationBarLoading();
    WXAPI.goodsCategory().then(function (res) {
      var categories = [];
      var categoryName = '';
      var categoryId = '';
      if (res.code == 0) {
        for (var i = 0; i < res.data.length; i++) {
          let item = res.data[i];
          categories.push(item);
          if (i == 0) {
            categoryName = item.name;
            categoryId = item.id;
          }
        }
      }
      that.setData({
        categories: categories,
        categorySelected: {
          name: categoryName,
          id: categoryId
        }
      });
      // console.log(categories);
      that.getGoodsList();
    }).catch((e) => {
      wx.hideNavigationBarLoading();
    });
  },
  getGoodsList: function () {
    let that = this;
    WXAPI.goods({
      categoryId: that.data.categorySelected.id,
      page: 1,
      pageSize: 100000
    }).then(function (res) {
      if (res.code == 404 || res.code == 700) {
        return
      }
      that.setData({
        currentGoods: res.data
      });
      console.log(res.data);
      wx.hideNavigationBarLoading();
    }).catch((e) => {
      wx.hideNavigationBarLoading();
    });
  },
  toDetailsTap: function (e) {
    wx.navigateTo({
      url: "/pages/goods-details/index?id=" + e.currentTarget.dataset.id
    })
  },
  onCategoryClick: function (e) {
    var that = this;
    var id = e.target.dataset.id;
    if (id === that.data.categorySelected.id) {
      that.setData({
        scrolltop: 0,
      })
    } else {
      var categoryName = '';
      for (var i = 0; i < that.data.categories.length; i++) {
        let item = that.data.categories[i];
        if (item.id == id) {
          categoryName = item.name;
          break;
        }
      }
      that.setData({
        categorySelected: {
          name: categoryName,
          id: id
        },
        scrolltop: 0
      });
      that.getGoodsList();
    }
  }
})