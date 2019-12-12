// pages/mianInterf/mianInterf.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    book:'',
    url:"https://azhizhi.top"

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    var that=this
    wx.request({
      url: 'https://azhizhi.top/searchrentbook',
      data: {},
      method: 'GET', 
      success: function (res) {
        // success
        that.setData({
          book:res.data
        })
        console.log(that.data.book)
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