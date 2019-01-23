// pages/recommend/recommend.js
import * as util from "../../utils/util";
import * as API from "../../utils/API";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        recommendList: [],
        currentPage: 0,
        lastPage: 0,
        publicMes: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getRecommendList();
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
    onPullDownRefresh() {
        this.setData({
            videoList: [],
            currentPage: 0,
            lastPage: 0,
        }, () => {
            this.getRecommendList();
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
            })
        } else {
            this.getRecommendList();
        }

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },

    getRecommendList() {
        let {recommendList, currentPage} = this.data;

        currentPage += 1;
        util.ajaxCommon(API.URL_RECOMMEND_USER, {
            page: currentPage,
        }, {
            needToken: true,
            success: (res) => {
                if (res.code == API.SUCCESS_CODE) {
                    if (res.data.data.length) {
                        this.setData({
                            recommendList: recommendList.concat(res.data.data),
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
    },
})
