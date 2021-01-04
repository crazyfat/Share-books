// pages/mianInterf/mianInterf.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    book:'',
    url:"https://zhangyq.fun"

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow:function(){
    this.onLoad();
  },
  onLoad: function (options) {
    
    var that=this
    wx.request({
      url: 'https://zhangyq.fun/searchrentbook',
      data: {},
      method: 'GET', 
      success: function (res) {
        // success
        var book = res.data;
        book.reverse();
        that.setData({
          book:book
        })
        console.log(that.data.book)
      }
    })
    wx.request({
      url: 'https://zhangyq.fun/user',
      data: {
        open_id: "ovcQ95WXYPkoxpmUuiH8P72kMsFI"
      },
      method: 'GET',
      success: function (res) {
        console.log(res)
      }
    })
    
  },
  onPullDownRefresh() {
    this.onLoad();
    console.log("正在下拉刷新");
  },
  getMoreInfo:function(e){
    wx.navigateTo({                               
      url: '/pages/bookInfo/bookInfo?rent_id=' + e.currentTarget.id,
    })
  },
  search: function () {
    wx.navigateTo({
      url: '/pages/search/search'
    })
  },

})