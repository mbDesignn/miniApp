// template/coupon/coupon.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    couponInfo:{
      type: Object,
      value: {},
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    show: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    toggle:function(){
      this.setData({
        show: !this.data.show
      })
    }
  }
})
