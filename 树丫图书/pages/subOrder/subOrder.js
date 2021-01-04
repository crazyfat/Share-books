// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: {},
    url: "https://zhangyq.fun",
    rented: "rented",
    canceled: "canceled",
    payed: "payed",
    confirmed: "confirmed",
    finished: "finished",
    rented: "rented",
    posted: "posted",
    user: {},
    rent_recorder_id: "",
    city: '',//存放地区
    station: '',//存放维修站
    perList: '',// 存放维修人员
    multiArray: [[], [], []],
    multiIndex: [0, 0, 0],
  },


  /*****获取学校-地区-具体位置 */
  getCityStationPer: function () {
    let that = this
    that.setData({
      city: [ '杭州电子科技大学'],//学校
      station: { '杭州电子科技大学': ['教学区', '宿舍区','餐厅','体院馆','学活'] },//地点分区
      perList: { '教学区': ['1号楼', '2号楼', '3号楼', '4号楼', '5号楼', '6号楼'], '宿舍区': ['1号楼', '2号楼', '3号楼', '4号楼', '5号楼', '6号楼'], '餐厅': ['1号厅', '2号厅', '3号厅', '4号厅', '5号厅', '职工厅'], '体院馆': [], '学活': [] },// 存放具体地点
    })
    that.data.multiArray[0] = that.data.city
    that.data.multiArray[1] = this.getArr(that.data.city[0], that.data.station);
    that.data.multiArray[2] = this.getArr(that.data.multiArray[1][0], that.data.perList);
    that.setData({
      multiArray: that.data.multiArray
    })
  },

  /****列发生改变 */
  bindMultiPickerColumnChange: function (e) {
    let that = this
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        //第一列改变  设置第二列数据
        let arr = that.getArr(that.data.city[e.detail.value], that.data.station)
        data.multiArray[1] = arr
        that.setData({
          multiArray: data.multiArray
        })
        //从第二列中拿出第一项，设置第三组人员
        let arrColumn2 = that.getArr(arr[0], that.data.perList)
        data.multiArray[2] = arrColumn2
        that.setData({
          multiArray: data.multiArray
        })
        break;
      case 1:
        //第二列改变 设置第三列数据
        let arr2 = that.getArr(data.multiArray[1][e.detail.value], that.data.perList)
        data.multiArray[2] = arr2
        that.setData({
          multiArray: data.multiArray
        })
        break;
    }
    },
  getArr: function (value, arr) {
    for (let i in arr) {
      if (value == i) {
        return arr[i]
      }
    }
  },

  /****值发生改变 */
  bindMultiPickerChange: function (e) {
    this.setData({
      multiIndex: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var book = options;
    var userInfo = wx.getStorageSync("userInfo")
    var that = this;
    that.setData({
      options:options,
      userInfo:userInfo
    })
    that.getCityStationPer();
    wx.request({
      url: 'https://zhangyq.fun/postedbook',//这里修改了
      method: 'Get',
      data: {
        rent_id: book.rent_id
      },    //参数为键值对字符串
      header: {
        //设置参数内容类型为x-www-form-urlencoded
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      success: function (res) {
        that.setData({
          item: res.data
        })
        console.log(that.data.item)
      }
    })
  },
  evaluatepage1: function (e) {
    var that = this
    wx.request({
      url: 'https://zhangyq.fun/confirmed',
      method: 'GET',
      data: {
        rent_recorder_id: that.data.item.rentrecord.rent_recorder_id,
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
        wx.navigateTo({
          url: "../MyRentOrder/MyRentOrder",
        })
      }

    })
  },
  pay:function(){
    var openid = wx.getStorageSync('openid');
    var that = this;
    var rent_id = that.data.options.rent_id;
    var rent_time = that.data.options.rent_time;
    wx.showToast({
      icon: 'loading',
      duration: 1000
    })
    if(that.data.options.cata==0){
      setTimeout(function () {
        wx.request({
          url: 'https://zhangyq.fun/rent',
          data: {
            rent_id: rent_id,
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
      }, 1000)
    } else if (that.data.options.cata == 1){
      setTimeout(function () {
        wx.request({
          url: 'https://zhangyq.fun/rent',
          data: {
            rent_id: rent_id,
            open_id: openid,
            rent_time: rent_time
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
      }, 1000)
    }
  }
})