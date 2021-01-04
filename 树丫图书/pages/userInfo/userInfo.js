Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ["发布", "评价"],
    currentTab:0,
    book: '',
    url: "https://zhangyq.fun"

  },


  onLoad: function (options) {

    var that = this;
    var userInfo = wx.getStorageSync('userInfo');
    var openid = wx.getStorageSync("openid")
    that.setData({
      nickname: userInfo.nickName,
      imageUrl: userInfo.avatarUrl
    })
    wx.request({
      url: 'https://zhangyq.fun/comment_history',
      data: {
        open_id: openid
      },
      method: 'GET',
      success: function (res) {
        // success
        var comment = res.data;
        comment.reverse();
        that.setData({
          comment: comment
        })
        console.log(that.data.comment)
      }
    })
    wx.request({
      url: 'https://zhangyq.fun/postedhistory',
      data: {
        open_id:openid
      },
      method: 'GET',
      success: function (res) {
        // success
        var book = res.data;
        book.reverse();
        that.setData({
          book: book
        })
        console.log(that.data.book)
      }
    })
    wx.request({
      url: 'https://zhangyq.fun/user',
      data: {
        open_id:"ovcQ95bRwtBpNTe8rnNBejZ8REdY"
      },
      method: 'GET',
      success: function (res) {
        that.setData({
          user: res.data
        })
        console.log(res.data)
      }
    })


  },
  onPullDownRefresh() {
    this.onLoad();
    console.log("正在下拉刷新");
  },
  getMoreInfo: function (e) {
    wx.navigateTo({
      url: '/pages/bookInfo/bookInfo?rent_id=' + e.currentTarget.id,
    })
  },
  search: function () {
    wx.navigateTo({
      url: '/pages/search/search'
    })
  },
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
    //全局变量
  },
})