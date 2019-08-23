// pages/Issue/Issue.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookPic:'../images/add.png',
    textHidden:false,
    photoHidden:true,
    mybookPic:'',
    status:['出售','出租'],
    month: ['1个月', '2个月', '3个月', '4个月', '5个月', '6个月', '7个月', '8个月', '9个月', '10个月', '11个月','12个月'],
    isbn:'',
    book_name:'',
    book_author:'',
    book_pub:'',
    ISBN:'',
    index:0,
    R_index: 0,
    isSale:true,
    price:'',
    pricestatus:"价格"
  },
  getBookname:function(e){
    var that = this
    that.setData({
      book_name: e.detail.value,
    })
  },
  getBookauthor: function (e) {
    var that = this
    that.setData({
      book_author: e.detail.value,
    })
  },
  getBookpub: function (e) {
    var that = this
    that.setData({
      book_pub: e.detail.value,
    })
  },
  getBookisbn: function (e) {
    var that = this
    that.setData({
      ISBN: e.detail.value,
    })
  },
  getPrice: function (e) {
    var that = this
    that.setData({
      price: e.detail.value,
    })
  },
  listenStatus:function(e){
    var that=this
    that.setData({
      index:e.detail.value,
    })
    if (e.detail.value==1)
      that.setData({
        isSale: false,
        pricestatus:"租金/月"
      })
    else
      that.setData({
        isSale: true,
        pricestatus: "价格"
      })

  },
  listenDeadline: function (e) {
    var that = this
    that.setData({
      D_index: e.detail.value,
    })
  },
  postOrder:function(){
    var that = this;
    wx.request({
      url: 'http://101.200.149.111/bookupdate',
      method: 'post',
      data: {
        isbn:that.data.ISBN,
        password: e.detail.value.password,
      },

      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        console.log(util.formatTime)
        // console.log(res)
      }
    })
  },
  choice: function () {
    var that = this
    wx.chooseImage({
      count: 1, // 默认9  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
        var tempFilePaths = res.tempFilePaths
        that.setData({
          textHidden: true,
          mybookPic: tempFilePaths,
          photoHidden: false
        })
        console.log(that.data.mybookPic)
      }
    })
  },

})