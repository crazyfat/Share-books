// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    book:'',
    url: "https://azhizhi.top"
  },
  searchBy:function(e){
    var that = this
    that.setData({
      title: e.detail.value,
    })
  },

  searchBk:function(){
    var that=this;
    console.log(that.data.title)
    wx.request({
      url: 'https://azhizhi.top/searchrentbook',
      data: {
        book_name:that.data.title
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
  }
})