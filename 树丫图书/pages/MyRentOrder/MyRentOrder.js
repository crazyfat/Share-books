// pages/Myrend/MyRendOrder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar:["我买(租)到的","我卖(租)出的","我发布的"],
    currentTab: 0,
    url: "https://azhizhi.top",
    Buyitem:[],
    Solditem:[],
    Soldeditem:[],
    phone:"",
    user_id:"",
    rent_id:"",
    rent_recorder_id:"",
    rented:"rented",
    canceled:"canceled",
    payed:"payed",
    confirmed:"confirmed",
    finished:"finished",
    rented:"rented",
    posted:"posted",
    rent_recorder_id:""
  },
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
    //全局变量
  },
  onShow() {
    this.setData({
      currentTab: this.currentTab,
      phone:this.phone
    })
  },
  onLoad:function(){},
  //detail
  detail:function(e){
    var item = e.currentTarget.dataset.id
    console.log(item)
    wx.setStorageSync("bookdetailitem", item)
    wx.navigateTo({
      url: '../detail/detail',
    })
  },
  detail2: function (e) {
    var item = e.currentTarget.dataset.id
    console.log(item)
    wx.setStorageSync("bookdetailitem", item)
    wx.navigateTo({
      url: '../detail2/detail2',
    })
  },
  //联系对方
  communectionrenter1:function(e){
    var that=this;
    var item = e.currentTarget.dataset.id
    console.log("idx:"+item)
    var rent_recorder_id = item.rent_recorder_id
    that.setData({
      rent_recorder_id: rent_recorder_id
    })
    wx.request({
      url: 'https://azhizhi.top/detailRecord',
      method: 'Get',
      data: {
        rent_recorder_id: that.data.rent_recorder_id
      },    //参数为键值对字符串
      header: {
        //设置参数内容类型为x-www-form-urlencoded
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      success: function (res) {
        console.log(res)
        that.setData({
          phone : res.data.saler_phone
        })
        
      }

    })
    console.log(that.data.phone)
    wx.makePhoneCall({
      phoneNumber:that.data.phone,
    })
  },
  communectionrenter2: function (e) {
    var that = this;
    var item = e.currentTarget.dataset.id
    console.log("idx:" + item)
    var rent_recorder_id = item.rent_recorder_id
    that.setData({
      rent_recorder_id: rent_recorder_id
    })
    wx.request({
      url: 'https://azhizhi.top/detailRecord',
      method: 'Get',
      data: {
        rent_recorder_id: that.data.rent_recorder_id
      },    //参数为键值对字符串
      header: {
        //设置参数内容类型为x-www-form-urlencoded
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      success: function (res) {
        console.log(res)
        that.setData({
          phone: res.data.buyer_phone
        })

      }

    })
    console.log(that.data.phone)
    wx.makePhoneCall({
      phoneNumber: that.data.phone,
    })
  },
//订单中状态修改 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    var openid=wx.getStorageSync("openid")
    //获取我买到的列表数据
    wx.request({
      url: 'https://azhizhi.top/rent_history',
      method: 'Get',
      data: {
        open_id: openid,
      },    //参数为键值对字符串
      header: {
        //设置参数内容类型为x-www-form-urlencoded
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
         Orderitem:res.data
        })
      }
    })


    //获取我发发布的列表数据
    wx.request({
      url: 'https://azhizhi.top/postedhistory',
      method: 'Get',
      data: {
        open_id: openid,
      },    //参数为键值对字符串
      header: {
        //设置参数内容类型为x-www-form-urlencoded
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          Solditem: res.data
        })
      }
    })
    
    //我卖出的
    wx.request({
      url: 'https://azhizhi.top/userpostedstatus',
      method: 'GET',
      data: {
        open_id: openid,
      },    //参数为键值对字符串
      header: {
        //设置参数内容类型为x-www-form-urlencoded
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          Soldeditem: res.data
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

  //修改订单状态
  evaluatepage1: function (e) {
    var item = e.currentTarget.dataset.id
    var that = this
    this.setData({
      rent_recorder_id: item.rent_recorder_id
    })
    console.log(that.data.rent_recorder_id)
    wx.request({
      url: 'https://azhizhi.top/confirmed',
      method: 'GET',
      data: {
        rent_recorder_id: that.data.rent_recorder_id,
      },    //参数为键值对字符串
      header: {
        //设置参数内容类型为x-www-form-urlencoded
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      success: function (res) {
        wx.showToast({
          title: "success",
          icon: 'none',    //如果要纯文本，不要icon，将值设为'none'
          duration: 2000
        })
        that.onLoad();
      }

    })
  },
  evaluatepage5:function(e){
    var item = e.currentTarget.dataset.id
    var that=this
    this.setData({
      rent_id:item.rent_id
    })
    console.log(that.data.rent_id)
    wx.request({
      url: 'https://azhizhi.top/refuse',
      method: 'GET',
      data: {
        rent_id: that.data.rent_id,
      },    //参数为键值对字符串
      header: {
        //设置参数内容类型为x-www-form-urlencoded
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      success: function (res) {
        wx.showToast({
          title: "success",
          icon: 'none',    //如果要纯文本，不要icon，将值设为'none'
          duration: 2000
        })
        that.onLoad();
      }

    })
  },
  itsevaluatepage7: function (e) {
    var item = e.currentTarget.dataset.id
    var that = this
    this.setData({
      rent_id: item.rent_id
    })
    wx.request({
      url: 'https://azhizhi.top/confirm_send_back',
      method: 'GET',
      data: {
        rent_id: this.data.rent_id,
      },    //参数为键值对字符串
      header: {
        //设置参数内容类型为x-www-form-urlencoded
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      success: function (res) {
        wx.showToast({
          title: "success",
          icon: 'none',    //如果要纯文本，不要icon，将值设为'none'
          duration: 2000
        })
        that.onLoad();
      }

    })
  },

  itsevaluatepage8: function (e) {
    var item = e.currentTarget.dataset.id
    var openid = wx.getStorageSync("openid")
    var that = this
    this.setData({
      rent_id: item.rent_id
    })
    wx.request({
      url: 'https://azhizhi.top/deleteposted',
      method: 'GET',
      data: {
        rent_id: that.data.rent_id,
        open_id:openid
      },    //参数为键值对字符串
      header: {
        //设置参数内容类型为x-www-form-urlencoded
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      success: function (res) {
        wx.showToast({
          title: "success",
          icon: 'none',    //如果要纯文本，不要icon，将值设为'none'
          duration: 2000
        })
        console.log(that.data.rent_id)
        that.onLoad();
      }

    })
  },
})