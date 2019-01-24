// pages/follow/follow.js
import * as util from '../../utils/util';
import * as API from '../../utils/API';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        videoList: [],
        currentPage: 0,
        lastPage: 0,
        currentId: 0,
      publicMes: "loading",
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        
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
      this.setData({
        videoList: [],
        currentPage: 0,
        lastPage: 0,
      }, () => {
        this.getFollowVideoList();
      });
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
        console.log("onPullDownRefresh");
        this.setData({
            videoList: [],
            currentId: 0,
            currentPage: 0,
          lastPage: 0, publicMes: "loading",
        }, () => {
            this.getFollowVideoList();
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
            this.getFollowVideoList();
        }

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },

    getFollowVideoList() {
        let {videoList, currentPage} = this.data;

        currentPage += 1;
        util.ajaxCommon(API.URL_FOLLOWED, {
            page: currentPage,

        }, {
            needToken: true,
            success: (res) => {
                if (res.code == API.SUCCESS_CODE) {
                    if (res.data.data.length) {
                        this.setData({
                            videoList: videoList.concat(res.data.data),
                            lastPage: res.data.last_page,
                          currentPage, publicMes: "",
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

    collentionChanged(event) {
        const {index, liked} = event.detail;

        let formatted_liked_number = this.data.videoList[index].formatted_liked_number;
        const likeCountStr = `videoList[${index}].liked`;
        const likeNumberStr = `videoList[${index}].formatted_liked_number`;


        this.setData({
            [likeCountStr]: liked,
            [likeNumberStr]: liked ? formatted_liked_number + 1 : formatted_liked_number - 1,
        })
    },

    playFollowedVideo(event) {
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
})
