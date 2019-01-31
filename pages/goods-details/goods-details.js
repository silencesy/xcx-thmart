// pages/goods-details/goods-details.js
const util = require('../../utils/util.js');
const WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    goodsData: null,
    visible: false,
    number: 1,
    type: 'all'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    });
    this.getData();
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 获取数据
  getData() {
    let that = this;
    let params = {
      id: that.data.id
    }
    util.request("post", "Item/detail", params, function (res) {
      let detailsdata = res.data.detail;
      WxParse.wxParse('detailsdata', 'html', detailsdata, that, 12);
      that.setData({
        goodsData: res.data
      })
    },false);
  },
  handleCancel() {
    this.setData({
      visible: false
    });
  },
  openBuyInfo(e) {
    let type = e.currentTarget.dataset.type;
    this.setData({
      visible: true,
      type: type
    });
  },
  previewImage: function (e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: [current] // 需要预览的图片http链接列表  
    })
  },
  handleChangeNumber({ detail }) {
    this.setData({
      number: detail.value
    })
  },
  // 收场商品
  bindsSaveGoods() {
    let that = this;
    let goodsData = that.data.goodsData;
    let isCollect = that.data.goodsData.isCollect==1?0:1;
    let id = that.data.goodsData.id;
    let params = {
      type: 1,
      contentId: id,
      isCollect: isCollect
    }
    util.request("post", util.api.collect, params, function (res) {
      goodsData.isCollect = isCollect;
      that.setData({
        goodsData: goodsData
      })
    }, false);
  }
})