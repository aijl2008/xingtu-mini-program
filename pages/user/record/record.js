// pages/user/record/record.js
import * as util from "../../../utils/util";
import * as API from "../../../utils/API";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        historyList: [],
        currentPage: 0,
        lastPage: 0,
        publicMes: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getHistoryList();
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
        this.setData({
            currentPage: 0,
            historyList: [],
        }, () => {
            this.getHistoryList();
        })
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        const {currentPage, lastPage} = this.data;

        if (currentPage >= lastPage) {
            /*到底了*/
            this.setData({
                publicMes: 'noMore'
            });
        } else {
            this.getHistoryList();
        }

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },

    getHistoryList() {
        let {historyList, currentPage} = this.data;

        currentPage += 1;
        util.ajaxCommon(API.URL_GET_MY_HISTORY, {
            page: currentPage,
        }, {
            needToken: true,
            success: (res) => {
                if (res.code == API.SUCCESS_CODE) {
                    if (res.data.data.length) {
                        this.setData({
                            historyList: historyList.concat(res.data.data),
                            lastPage: res.data.last_page,
                            currentPage,
                        })
                    } else {
                        this.setData({
                            publicMes: 'empty',
                        })
                    }
                }
            }
        });
    }
})
