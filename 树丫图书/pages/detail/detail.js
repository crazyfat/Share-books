// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item:{},
    url:"https://zhangyq.fun",
    rented: "rented",
    canceled: "canceled",
    payed: "payed",
    confirmed: "confirmed",
    finished: "finished",
    rented: "rented",
    posted: "posted",
    user: {}, 
    rent_recorder_id:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   var item=wx.getStorageSync("bookdetailitem")
   var that=this
    wx.request({
      url: 'https://zhangyq.fun/detailRecord',
      method: 'Get',
      data: {
        rent_recorder_id: item.rent_recorder_id
      },    //参数为键值对字符串
      header: {
        //设置参数内容类型为x-www-form-urlencoded
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      success: function (res) {
        that.setData({
          item: res.data
        })
        console.log("detail res.data:")
        console.log(res.data)
      }
    })
  },
  evaluatepage1: function (e) {
    var that = this
    wx.request({
      url: 'https://zhangyq.funp/confirmed',
      method: 'GET',
      data: {
        rent_recorder_id: that.data.item.rentrecord.rent_recorder_id,
      },    //参数为键值对字符串
      header: {
        //设置参数内容类型为x-www-form-urlencoded
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      success: function (res) {
        wx.showToast({
          title: "success" ,
          icon: 'none',    //如果要纯文本，不要icon，将值设为'none'
          duration: 2000
        })
        wx.navigateTo({
          url: "../MyRentOrder/MyRentOrder",
        })
      }

    })
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

  }
})