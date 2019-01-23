// pages/uploadList/uploadList.js
import * as util from '../../utils/util';
import * as API from '../../utils/API';

Page({
    /**
     * 页面的初始数据
     */
    data: {
        videoList: [],
        activeId: 0,
        currentId: 0,
        currentPage: 0,
        lastPage: 0,
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {
        console.log("onPullDownRefresh");
        this.setData({
            videoList: [],
            currentId: 0,
            currentPage: 0,
            lastPage: 0,
        }, () => {
            this.getVideoList();
        })
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        console.log("onReachBottom");
        const {currentPage, lastPage} = this.data;

        if (currentPage >= lastPage) {
            /*到底了*/
            this.setData({
                publicMes: 'noMore'
            })
        } else {
            this.getVideoList();
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getVideoList();
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
        let _ = this;
        wx.getStorage({
            key: "need-refresh",
            success: function (res) {
                if (res.data == "1") {
                    _.setData({
                        videoList: [],
                        activeId: 0,
                        currentId: 0,
                        currentPage: 0,
                        lastPage: 0,
                    }, () => {
                        _.getVideoList();
                        wx.removeStorage({
                            key: "need-refresh",
                            success: function (res) {
                            }
                        })
                    });
                }
            }
        })
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
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },

    jumpToUpload() {
        wx.navigateTo({
            url: '/pages/uploadVideo/uploadVideo'
        });
    },

    getVideoList() {
        let {activeId, currentPage, videoList} = this.data;
        currentPage += 1;
        util.ajaxCommon(API.URL_GET_MY_VIDEOS, {
            classification: activeId,
            page: currentPage,
        }, {
            loading: false,
            success: (res) => {
                if (res.code == API.SUCCESS_CODE) {
                    if (res.data.data.length) {
                        this.setData({
                            videoList: videoList.concat(res.data.data),
                            lastPage: res.data.last_page,
                            currentPage,
                        })
                    }
                }
            }
        })
    },

    playMyVideo(event) {
        if (this.videoContext) {
            this.videoContext.stop();
        }

        const {id} = event.detail;

        this.setData({
            currentId: id,
        }, () => {
            this.videoContext = wx.createVideoContext(`video_${id}`);
            this.videoContext.play();
        });
    },

});
