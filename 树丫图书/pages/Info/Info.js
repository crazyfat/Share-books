// pages/Info/Info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    islogin:false,
    nickname:'',
    imageUrl:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if (!wx.getStorageSync('openid'))
    {
        wx.redirectTo({
          url: '/pages/login/login',
        })
    }
    else
    {
      var userInfo = wx.getStorageSync('userInfo')
      var openid = wx.getStorageSync('openid')
      that.setData({
        nickname: userInfo.nickName,
        imageUrl: userInfo.avatarUrl
      })
    }
  }


})