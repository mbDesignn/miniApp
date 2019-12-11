Page({
  /**
   * 页面的初始数据
   */
  data: {
    categories: [{ name: '上装', id: 1 }, { name: '裤装', id: 2 }],
    categorySelected: {
      name: '',
      id: ''
    },
    currentGoods: [
      {
        "barCode": "",
        "categoryId": 1872,
        "characteristic": "尼多熊袜子，适合秋冬天",
        "commission": 5,
        "commissionType": 2,
        "dateAdd": "2017-10-30 00:00:00",
        "dateStart": "2017-10-30 00:00:00",
        "dateUpdate": "2019-12-11 22:56:53",
        "gotScore": 0,
        "gotScoreType": 0,
        "id": 6761,
        "kanjia": false,
        "kanjiaPrice": 0,
        "limitation": false,
        "logisticsId": 386,
        "miaosha": false,
        "minPrice": 190,
        "minScore": 0,
        "name": "儿童睡衣男童短袖纯棉夏季薄款男孩中大童卡通宝宝家居服套装夏天",
        "numberFav": 0,
        "numberGoodReputation": 12,
        "numberOrders": 19,
        "numberSells": 14,
        "originalPrice": 490,
        "paixu": 0,
        "pic": "https://cdn.it120.cc/apifactory/2019/07/11/df49fedd-1e93-49ec-b2a8-6eb9fb7c0579.jpg",
        "pingtuan": true,
        "pingtuanPrice": 99,
        "propertyIds": ",871,",
        "recommendStatus": 0,
        "recommendStatusStr": "普通",
        "shopId": 0,
        "status": 0,
        "statusStr": "上架",
        "stores": 9999973,
        "userId": 951,
        "vetStatus": 1,
        "videoId": "",
        "views": 57261,
        "weight": 0
      },
      {
        "barCode": "",
        "categoryId": 1872,
        "characteristic": "尼多熊袜子，适合秋冬天",
        "commission": 5,
        "commissionType": 2,
        "dateAdd": "2017-10-30 10:31:27",
        "dateStart": "2017-10-30 10:24:54",
        "dateUpdate": "2019-12-11 23:16:54",
        "gotScore": 0,
        "gotScoreType": 0,
        "id": 6745,
        "kanjia": false,
        "kanjiaPrice": 0,
        "limitation": false,
        "logisticsId": 386,
        "miaosha": false,
        "minPrice": 236,
        "minScore": 0,
        "name": "幼儿园园服韩版男女童装春秋季班服英伦学院风白色衬衫小学生校服",
        "numberFav": 0,
        "numberGoodReputation": 3,
        "numberOrders": 6,
        "numberSells": 4,
        "originalPrice": 500,
        "paixu": 0,
        "pic": "https://cdn.it120.cc/apifactory/2019/07/11/e9fb59ae-7e66-427d-8d47-642c3b733a0b.jpg",
        "pingtuan": false,
        "pingtuanPrice": 0,
        "recommendStatus": 0,
        "recommendStatusStr": "普通",
        "shopId": 0,
        "status": 0,
        "statusStr": "上架",
        "stores": 4,
        "userId": 951,
        "vetStatus": 1,
        "views": 17198,
        "weight": 0
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