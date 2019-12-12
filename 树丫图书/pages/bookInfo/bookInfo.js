// pages/bookInfo/bookInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookInfo:'',
    url: "https://azhizhi.top",
    hidedata:true
  },
  //呼叫卖家
  callowner:function(){
    var that=this;
    wx.request({
      url: 'https://azhizhi.top/user',
      data: {
        open_id: that.data.bookInfo.rent_user_id
      },
      method: 'GET',
      success: function (res) {
        wx.makePhoneCall({
          phoneNumber: res.data.userTelNum,
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var rent_id = options.rent_id;
    var that = this
    that.setData({
      rentid:rent_id
    })
    wx.request({
      url: 'https://azhizhi.top/postedbook',
      data: {
        rent_id:rent_id
      },
      method: 'GET',
      success: function (res) {
        // success
        that.setData({
          bookInfo: res.data
        })
        console.log(that.data.bookInfo)
        var isbn = res.data.isbn;
        wx.request({
          url: 'https://azhizhi.top/booktype',
          data: {
            isbn: isbn
          },
          method: 'GET',
          success: function (res) {
            // success
            that.setData({
              book: res.data
            })
            console.log(res.data)
          }
        })
      }
    })


  },
  cancel:function(){
    var that=this;
    that.setData({
      hidedata:true
    })
  },
  confirm:function(){
    var that = this;
    wx.showModal({
      title: "提示",
      content: "确定订购？",
      showCancel: true,
      cancelText: "取消",
      cancelColor: "#000",
      confirmText: "确定",
      confirmColor: "#0f0",
      success: function (res) {
        console.log(res)
        if (res.confirm) {
          if (that.data.bookInfo.cata == 1){
            that.setData({
              hidedata:false
            })
          }else{
          that.pay();
          }
        }
      }
    })
  },
  setValue:function(e){
    var that = this
    that.setData({
      rent_time: e.detail.value,
    })
  },
  confirmdata:function(){
    var openid = wx.getStorageSync('openid');
    var that = this
    console.log(that.data.rentid)
    wx.request({
      url: 'https://azhizhi.top/rent',
      data: {
        rent_id: that.data.rentid,
        open_id: openid,
        rent_time:that.data.rent_time
      },
      method: 'get',
      success: function (res) {
        // success
        var title = res.data.message;
        console.log(res.data)
        if (res.data.status == 200) {
          wx.showToast({
            title: title,
            icon: 'success',
            duration: 1000
          })
          setTimeout(function () {
            wx.switchTab({
              url: '../mianInterf/mianInterf',
            })
          }, 1000)
        } else {
          wx.showToast({
            title: title,
            icon: 'loading',
            duration: 1000
          })
        }
      }
    })
  },
  pay:function(){
    var openid = wx.getStorageSync('openid');
    var that = this
    console.log(that.data.rentid)
    wx.request({
      url: 'https://azhizhi.top/rent',
      data: {
        rent_id: that.data.rentid,
        open_id:openid,
        rent_time:99999
      },
      method: 'get',
      success: function (res) {
        // success
        var title=res.data.message;
        console.log(res.data)
        if(res.data.status==200){
          wx.showToast({
            title: title,
            icon:'success',
            duration: 1000
          })
          setTimeout(function () {
            wx.switchTab({
              url: '../mianInterf/mianInterf',
            })
          }, 1000)
        }else{
          wx.showToast({
            title: title,
            icon:'loading',
            duration: 1000
          })
        }
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