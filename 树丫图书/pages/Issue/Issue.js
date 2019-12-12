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
    isbn:'',
    book_name:'',
    book_author:'',
    book_pub:'',
    ISBN:'',
    index:0,
    isSale:true,
    price:'',
    deposit:'',
    rentTime:'',
    pricestatus:"价格",
    isbnCode:'',
    hide:false,
    pics:[],
    addFin:true
  },
  cancle:function(){
    this.setData({
      hide:false
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
  getDeposit: function (e) {
    var that = this
    that.setData({
      deposit: e.detail.value,
    })
  },
  getCode:function(e){
    var that = this
    that.setData({
      isbnCode: e.detail.value,
    })
  },
  getRentTime: function (e) {
    var that = this
    that.setData({
      rentTime: e.detail.value,
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
        pricestatus:"租金/天"
      })
    else
      that.setData({
        isSale: true,
        pricestatus: "价格"
      })

  },
  postOrder:function(){
    var that = this;
    if (!that.data.pics[0]){
      wx.showModal({
        title: '发布失败',
        content: '请添加一张图片',
      })
      return;
    }
    if (that.data.index==0){
      if (!that.data.price){
        wx.showModal({
          title: '发布失败',
          content: '请填写完整信息！',
        })
        return;
      }
    } else if (that.data.index == 1){
        if(!that.data.price || !that.data.rentTime || !that.data.deposit)
    {
      wx.showModal({
        title: '发布失败',
        content: '请填写完整信息！',
      })
      return;
    }
    }
    console.log(that.data.pics[0])
    var openid = wx.getStorageSync('openid');
    wx.uploadFile({
      url:'https://azhizhi.top/bookupdate',
      filePath: that.data.pics[0],
      name: 'picture',
      formData:{
        rent_user_id:openid,
        book_name: that.data.bookInfo.title,
        book_author: that.data.bookInfo.author,
        isbn: that.data.isbnCode,
        price: that.data.price,
        deposit: that.data.deposit,
        rent_time: that.data.rentTime,
        cata: that.data.index,

      },
      header:{
        'ContentType': 'application/json'

      },
      success(res){
        console.log(res.statusCode)
        if(res.statusCode==200){
          wx.showToast({
            title: '发布成功',
            icon: 'success',
            duration: 1000
          })
          setTimeout(function () {
            wx.switchTab({
              url: '../mianInterf/mianInterf',
            })
          }, 1000)
        }
      }
    })
   
  },
  scanCode: function (event) {
    var that=this
    // 允许从相机和相册扫码
    wx.scanCode({
      onlyFromCamera: true,
      scanType: ['barCode'],
      success: res => {
        that.setData({
          isbnCode: res.result,
        })
        console.log(that.data.isbnCode)
      },
      fail: err => {
        console.log(err);
      }
    })
  },
  getInfoByIsbn:function(){
    var that = this
    wx.request({
      url: 'https://azhizhi.top/booktype?',
      data: {
        isbn: that.data.isbnCode
      },
      method: 'GET',
      success: function (res) {
        // success
        that.setData({
          bookInfo: res.data,
          hide: true
        })
        console.log(that.data.bookInfo)
      }
    })
  },
  chooseImg: function (e) {
    var that = this, pics = this.data.pics;
    console.log(pics);
    if (pics.length < 1) {
      wx.chooseImage({
        count: 1, // 最多可以选择的图片张数，默认9
        sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
        sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          var tempFilePaths = res.tempFilePaths;
          // wx.showToast({
          //   title: '正在上传...',
          //   icon: 'loading',
          //   mask: true,
          //   duration: 10000
          // });
          for (var i = 0; i < tempFilePaths.length; i++) {
            pics.push(tempFilePaths[i]);
          }
          console.log(pics);
          that.setData({
            pics: pics,
            addFin:false
          })
        },
      });
    } else {
      wx.showToast({
        title: '最多上传1张图片',
        icon: 'none',
        duration: 3000
      });

    }
  },

})