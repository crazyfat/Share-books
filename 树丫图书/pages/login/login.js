// pages/login/login.js
var CountDown = require('../../utils/countdown.js');
var zhenzisms = require('../../utils/zhenzisms.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'',
    code:''
  },
  onLoad:function(){
    this.countdown = new CountDown(this);
  },
  getPhone: function (e) {
    var that = this
    that.setData({
      phone: e.detail.value,
    })
  },
  getCode:function(e){
    var that = this
    that.setData({
      code: e.detail.value,
    })
    if(that.data.code.length==4){
      var result = zhenzisms.client.validateCode(that.data.phone, that.data.code);
      that.setData({
        result:result
      })
      wx.showToast({
        title: that.data.result,
        icon:'loading'
      })
    }
  },
  //获取短信验证码
  getSmsCaptcha(e) {
    var that = this;
    this.countdown.start();
    zhenzisms.client.init('https://sms_developer.zhenzikj.com', '104878', '9dc182a7-e8da-4476-89b5-29e29de7b4f1');
    var params = {};
    params.number = that.data.phone;
    params.message = '验证码为:{code}';
    params.seconds = 60 * 5;
    params.length = 4;
    // params.messageId = '1111111';
    // params.clientIp = '221.221.221.111';
    zhenzisms.client.sendCode(function (res) {
      //这里接收发送后的回调
      wx.showToast({
        title: res.data.data,
        icon: 'none',
        duration: 2000
      })
    }, params);
  },
  onGotUserInfo: function (e) {
    var that=this;
    wx.setStorageSync('userInfo', e.detail.userInfo)
    wx.cloud.init();
    wx.cloud.callFunction({
      // 云函数名称
      name: 'getOpenid',
      // 传给云函数的参数
      data: { },
      success: function (res) {
        wx.setStorageSync('openid', res.result.openid)
        console.log(res.result.openid)
        wx.request({
          url: 'https://zhangyq.fun/regist',
          data: {
            open_id: res.result.openid,
            phone:that.data.phone
          },
          method: 'get',
          success: function (res) {
            console.log(res.data)
            // success
            if (that.data.result=='ok'){
            wx.switchTab({
              url: '/pages/Info/Info',
            })
            }else{
              wx.showToast({
                title: '验证未通过',
                icon:'none'
              })
            }
          }
        })
      },
      fail: console.error
    })
  }
})