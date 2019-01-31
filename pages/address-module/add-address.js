// pages/address-module/add-address.js
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: {
      isDefault: 0,
      fullName: '',
      phone: '',
      email: '',
      regionDetail: '',
      province: '',
      city:	'',
      id: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let data = this.data.data;
    if (options.id){
      data.id = options.id;
      this.setData({
        data: data
      });
      this.getData();
    }
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
  getData() {
    let that = this;
    let params = {
      id: that.data.data.id
    }
    util.request("post", util.api.addressDetails, params, function (res) {
      let data = res.data;
      that.setData({
        data: data
      })
    },false);
  },
  // 设置默认
  setDefalut() {
    let data = this.data.data;
    data.isDefault = data.isDefault==1?0:1;
    this.setData({
      data: data
    });
  },
  bindName(e) {
    let data = this.data.data;
    data.fullName = e.detail.value
    this.setData({
      data: data
    })
  },
  bindPhone(e) {
    let data = this.data.data;
    data.phone = e.detail.value
    this.setData({
      data: data
    })
  },
  bindEmail(e) {
    let data = this.data.data;
    data.email = e.detail.value
    this.setData({
      data: data
    })
  },
  bindCH(e) {
    let data = this.data.data;
    data.province = e.detail.value
    this.setData({
      data: data
    })
  },
  bindEH(e) {
    let data = this.data.data;
    data.regionDetail = e.detail.value
    this.setData({
      data: data
    })
  },
  Submit() {
    util.request("post", util.api.addressEdit, this.data.data, function (res) {
      wx.navigateBack({
        delta: 1
      })
      console.log(res);
    }, false);
  }
})