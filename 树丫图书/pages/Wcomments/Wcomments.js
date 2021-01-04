// pages/test/test.js
Page({
  /**
   * 统一满分为5星
   */
  data: {
    num: 4,//后端给的分数,显示相应的星星
    one_2: 5,
    one_1: 5,
    one: 5,
    url: "https://zhangyq.fun",
  },
  onLoad: function (options) {
    var item = wx.getStorageSync("bookdetailitem")
    var that = this
    var id = options.id;
    wx.request({
      url: 'https://zhangyq.fun/detailRecord',
      method: 'Get',
      data: {
        rent_recorder_id: id
      },    //参数为键值对字符串
      header: {
        //设置参数内容类型为x-www-form-urlencoded
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      success: function (res) {
        that.setData({
          item: res.data,
          rent_recorder_id:res.data.rentrecord.rent_recorder_id,
          renter_id: res.data.rentrecord.renter_id
        })
        console.log("detail res.data:")
        console.log(res.data.rentrecord.renter_id)
      }
    })
  },

  //评分1
  in_xin: function (e) {
    var in_xin = e.currentTarget.dataset.in;
    var one_2;
    if (in_xin === 'use_sc2') {
      one_2 = Number(e.currentTarget.id);
    } else {
      one_2 = Number(e.currentTarget.id) + this.data.one_2;
    }
    this.setData({
      one_2: one_2,
      two_2: 5 - one_2
    })
  },
  //评分2
  in_xinsed: function (e) {
    var in_xin = e.currentTarget.dataset.in;
    var one_1;
    if (in_xin === 'use_sc1') {
      one_1 = Number(e.currentTarget.id);
    } else {
      one_1 = Number(e.currentTarget.id) + this.data.one_1;
    }
    this.setData({
      one_1: one_1,
      two_1: 5 - one_1
    })
  },
  //评分3
  in_xinthr: function (e) {
    var in_xin = e.currentTarget.dataset.in;
    var one;
    if (in_xin === 'use_sc') {
      one = Number(e.currentTarget.id);
    } else {
      one = Number(e.currentTarget.id) + this.data.one;
    }
    this.setData({
      one: one,
      two: 5 - one
    })
  },
  //提交
  submitComment:function(){
    var that = this;
    var total = parseInt((that.data.one + that.data.one_1 + that.data.one_2) / 3);
    console.log(total)
    console.log(that.data.detail)
    console.log(that.data.rent_recorder_id)
    console.log(that.data.renter_id)
    wx.request({
      url: 'https://zhangyq.fun/comment_submit',
      method: 'Get',
      data: {
        buyerid: that.data.rent_recorder_id,
        userid: that.data.renter_id,
        star: total,
        comments: that.data.detail
      },    //参数为键值对字符串
      header: {
        //设置参数内容类型为x-www-form-urlencoded
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        if(res.data.status==200){
          wx.showToast({
            title: '发布成功',
            icon: 'success',
            duration: 1000
          })
          setTimeout(function () {
            wx.redirectTo({
              url: '/pages/userInfo/userInfo',
            })
          }, 1000)
        }
      }
    })
  },
  detailInput: function (e) {
    var that = this;
    that.setData({
      detail: e.detail.value
    })
  },
})