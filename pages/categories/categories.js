// pages/categories/categories.js
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: 'loading',
    data: [],
    totalPage: -1,
    params: {
      id: 0,
      page: 0,
      pageSize: 10,
      sort: 'createTime_desc'
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCategory();
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
  getCategory() {
  // 获取数据
    let that = this;
    util.request("post", util.api.category, { fname: 0}, function (res) {
      that.setData({
        categoryData: res.data
      });
    },false);
  },
  tab(e) {
    var activeId = e.currentTarget.dataset.id;
    var params = this.data.params;
    params.id = activeId;
    params.page = 0;
    this.setData({
      params: params,
      totalPage: -1,
      status: 'loading',
      data: []
    });
    this.getData();
  },
  // 获取数据
  getData() {
    let that = this;
    that.data.params.page++;
    if (that.data.params.page <= that.data.totalPage || that.data.totalPage == -1) {
      util.request("post", util.api.goodsList, that.data.params, function (res) {
        console.log(res);
        that.setData({
          data: that.data.data.concat(res.data.data),
          totalPage: res.data.totalPage
        });
        if (res.data.totalPage == 0 || that.data.params.page == that.data.totalPage) {
          that.setData({
            status: 'end'
          });
        }
      }, false, function () {
        that.setData({
          status: 'end'
        });
      });
    } else {
      that.setData({
        status: 'end'
      });
    }
  },
  sortevent(e) {
    let sort = e.detail.active;
    // 切换排序，初始化数据
    let params = this.data.params;
    params.sort = sort;
    params.page = 0;
    this.setData({
      params: params,
      totalPage: -1,
      status: 'loading',
      data: []
    });
    // 重新获取数据
    this.getData();
  },
})