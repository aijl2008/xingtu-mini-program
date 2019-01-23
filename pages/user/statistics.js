// pages/user/statistics.js
import * as util from "../../utils/util";
import * as API from "../../utils/API";

Page({

    /**
     * 页面的初始数据
     */
  data: {
    navbar: ['总体概述', '播放详情', '粉丝详情'],
    //count:[0,2,3],                                  //记录不同状态记录的数量
    currentTab: 3,
  },
  navbarTap: function (e) {
    var that = this;
    that.setData({
      currentTab: e.currentTarget.dataset.idx,
      TypeItem: that.data.navbar[that.data.currentTab]
    })
  },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      this.get_statistics_data();
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

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
      this.get_statistics_data();
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },

    failedToLoadImage: function (e) {
        console.log(e);
    },

  get_statistics_data() {
        util.ajaxCommon(API.URL_statistics, {}, {
            method: "GET",
            needToken: true,
            success: (res) => {
                if (res.code == 0) {
                    this.setData({
                        data:res.data
                    })
                }
            }
        })
    }
})