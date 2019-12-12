// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:''
  },
  getPhone: function (e) {
    var that = this
    that.setData({
      phone: e.detail.value,
    })
  },
  onGotUserInfo: function (e) {
    var that=this;
    wx.setStorageSync('userInfo', e.detail.userInfo)
    wx.cloud.init();
    wx.cloud.callFunction({
      // 云函数名称
      name: 'getOpenid',
      // 传给云函数的参数
      data: { },
      success: function (res) {
        wx.setStorageSync('openid', res.result.openid)
        console.log(res.result.openid)
        wx.request({
          url: 'https://azhizhi.top/regist',
          data: {
            open_id: res.result.openid,
            phone:that.data.phone
          },
          method: 'get',
          success: function (res) {
            console.log(res.data)
            // success
            wx.switchTab({
              url: '/pages/Info/Info',
            })
          }
        })
      },
      fail: console.error
    })
  }
})