// pages/bookInfo/bookInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookInfo: '',
    url: "https://zhangyq.fun",
    hidedata: true
  },
  //呼叫卖家
  callowner: function () {
    var that = this;
    wx.request({
      url: 'https://zhangyq.fun/user',
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
  afterLike:function(){
    var open_id = wx.getStorageSync('openid');
    var that = this;
    wx.request({
      url: 'https://zhangyq.fun/postedbook',
      data: {
        rent_id: that.data.rent_id
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
          url: 'https://zhangyq.fun/booktype',
          data: {
            isbn: isbn
          },
          method: 'GET',
          success: function (res) {
            // success
            that.setData({
              book: res.data
            })
            console.log(that.data.book)
          }
        })
        wx.request({
          url: 'https://zhangyq.fun/iflike',
          data: {
            rent_id: that.data.rent_id,
            open_id: open_id
          },
          method: 'GET',
          success: function (res) {
            console.log(res.data);
            that.setData({
              likeNum: res.data.status
            })
            if (res.data.message == "已点赞")
              that.setData({
                likeStatus: 1
              })
            else if (res.data.message == "尚未点赞")
              that.setData({
                likeStatus: 0
              })
          }
        })
      }
    })

  },
  onLoad: function (options) {
    var rent_id = options.rent_id;
    var open_id = wx.getStorageSync('openid');
    var that = this
    that.setData({
      rent_id: rent_id
    })
    wx.request({
      url: 'https://zhangyq.fun/postedbook',
      data: {
        rent_id: rent_id
      },
      method: 'GET',
      success: function (res) {
        console.log(res.data)
        // success
        that.setData({
          bookInfo: res.data
        })
        var isbn = res.data.isbn;
        var userid = res.data.rent_user_id;
        wx.request({
          url: 'https://zhangyq.fun/booktype',
          data: {
            isbn: isbn
          },
          method: 'GET',
          success: function (res) {
            // success
            that.setData({
              book: res.data
            })
          }
        })
        wx.request({
          url: 'https://zhangyq.fun/user',
          data: {
            open_id: userid
          },
          method: 'GET',
          success: function (res) {
            // success
            that.setData({
              user: res.data
            })
            console.log(res.data)
          }
        })
        wx.request({
          url: 'https://zhangyq.fun/iflike',
          data: {
            rent_id: rent_id,
            open_id: open_id
          },
          method: 'GET',
          success: function (res) {
            console.log(res.data)
            that.setData({
              likeNum: res.data.status
            })
            if (res.data.message=="已点赞")
              that.setData({
                likeStatus: 1
              })
            else if (res.data.message == "尚未点赞")
              that.setData({
                likeStatus: 0
              })
          }
        })
      }
    })


  },
  getLike:function(){
    var that = this;
    var open_id = wx.getStorageSync('openid');
    console.log(open_id);
    wx.request({
      url: 'https://zhangyq.fun/like',
      data: {
        rent_id:that.data.rent_id,
        open_id:open_id
      },
      method: 'GET',
      success: function (res) {
        console.log(res)
      }
    })
    that.afterLike();
  },
  cancel: function () {
    var that = this;
    that.setData({
      hidedata: true
    })
  },
  confirm: function () {
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
          if (that.data.bookInfo.cata == 1) {
            that.setData({
              hidedata: false
            })
          } else {
            /*that.pay();*/
              wx.navigateTo({
                url: '../subOrder/subOrder?rent_id=' + that.data.rent_id + '&cata=0',
              })
          }
        }
      }
    })
  },
  setValue: function (e) {
    var that = this
    that.setData({
      rent_time: e.detail.value,
    })
  },
  confirmdata: function () {
    var that=this
    wx.navigateTo({
      url: '../subOrder/subOrder?rent_id=' + that.data.rent_id + '&rent_time=' + that.data.rent_time + '&cata=1',
    })
    /*
    var openid = wx.getStorageSync('openid');
    var that = this
    console.log(that.data.rentid)
    wx.request({
      url: 'httpss://azhizhi.top/rent',
      data: {
        rent_id: that.data.rentid,
        open_id: openid,
        rent_time: that.data.rent_time
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
    */
  },
  pay: function () {
    var openid = wx.getStorageSync('openid');
    var that = this
    console.log(that.data.rentid)
    wx.request({
      url: 'https://zhangyq.fun/rent',
      data: {
        rent_id: that.data.rentid,
        open_id: openid,
        rent_time: 99999
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
})