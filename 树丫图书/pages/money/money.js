// pages/money/money.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  charge:function(){
    wx.showToast({
      title: '暂未开通功能',
      icon: 'loading',
      duration: 1000
    })
  },
  onLoad: function () {
    var that = this;
    var openid = wx.getStorageSync('openid');
    wx.request({
      url: 'https://azhizhi.top/user',
      data: {
        open_id: openid,
      },
      method: 'get',
      success: function (res) {
        that.setData({
          userInfo:res.data
        })
        console.log(that.data.userInfo)
        // success
      }
    })
  },
})