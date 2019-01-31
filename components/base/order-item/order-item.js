// components/base/order-item/order-item.js
Component({
  externalClasses: ['icon'],
  /**
   * 组件的属性列表
   */
  properties: {
    data: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindGoDetails() {
      wx.navigateTo({
        url: '../../pages/order/order-details',
      })
    }
  }
})
