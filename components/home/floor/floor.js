// components/home/floor/floor.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: {
      type: Object,
      value: {}
    },
    bannerUrl: {
      type: String,
      value: ''
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
    goDetails(e) {
      let id = e.currentTarget.dataset.id;
      wx.navigateTo({
        url: "../../pages/goods-details/goods-details?id=" + id
      })
    },
    goList() {
      console.log(this.data.bannerUrl);
      if (this.data.bannerUrl){
        wx.navigateTo({
          url: "../../pages/deal-group-list/deal-group-list?id=" + this.data.bannerUrl
        })
      } else {
        console.log(123);
      }
    }
  }
})
