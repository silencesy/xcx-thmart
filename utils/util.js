const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
// 封装request
const request = (method, path, para, backfun, layer = true, failedfun, mustlogin = false ) => {
  if (layer) {
    wx.showToast({
      title: 'loading',
      icon: 'loading',
      duration: 10000,
      mask: true
    });
  }
  var token = wx.getStorageSync('token') || null;
  const url = 'https://proj6.thatsmags.com/thmartApi/';
  // const url = 'http://proj7.thatsmags.com/';
  if (mustlogin && !token) {
    return false;
  }
  wx.request({
    url: url + path,
    data: para,
    header: {
      TOKEN: token
    },
    method: method,
    // dataType: 'json',
    // responseType: 'text',
    success: function (res) {
      if (layer) {
        wx.hideToast();
      }
      if (res.code == 0) {
        // 错误处理

      } else {
        // 用户token处理
        if (res.data && res.data.token) {
          wx.setStorageSync("token", res.data.token);
        }
        if (backfun) {
          backfun(res.data);
        }
      }
    },
    fail: function (res) {
      if (layer) {
        wx.hideToast();
      }
      if (failedfun) {
        failedfun(data);
      }
      else {
        console.log(res);
      }
    }
    // complete: function(res) {},
  })
}
// 是否登录函数
const isRegister = ()=>{
  let isRegisterFlag;
  const value = wx.getStorageSync('isRegister')
  isRegisterFlag = value==1?true:false;
  return isRegisterFlag;
}
const privilegeJump = () => {
  if (!isRegister()) {
    wx.navigateTo({
      url: '../authorization/authorization',
    })
    return false;
  } else {
    return true;
  }
}

// 接口集合
const api = {
  home: 'Ads/Home/list', //首页
  ads: 'Ads/list', //配置广告位置
  group: 'Item/groupBuying', //团购
  goodsList: 'Item/list', //商品列表
  article: 'Article/list', //文章列表
  category: 'Category/list', //分类列表
  login: 'User/Wx/miniProgram', //小程序登录
  // 购物车
  cartList: 'Cart/list', //购物车列表
  cartDelete: 'Cart/delete', //购物车删除
  cartEditNumber: 'Cart/editNumber', //购物车编辑
  cartSelect: 'Cart/changeSelectAndTotalPrice', //购物车选择
  //地址
  addressList: 'User/Address/list', //地址列表
  changeDefault: 'User/Address/changeDefault', //设置默认地址
  deleteAddress: 'User/Address/delete', //删除地址
  addressDetails: 'User/Address/detail', //地址详情
  addressEdit: 'User/Address/edit', //编辑地址
  // 收藏
  collectList: 'Collect/list',
  collect: 'Collect/collect',
  // 订单
  orderList: 'Order/list'
}


module.exports = {
  formatTime: formatTime,
  request: request,
  api: api,
  isRegister: isRegister,
  privilegeJump: privilegeJump
}
