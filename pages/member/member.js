// pages/member/member.js
import * as util from "../../utils/util";
import * as API from "../../utils/API";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        videoList: [],
        currentPage: 0,
        lastPage: 0,
        publicMes: '',
        id: 0,
        member: {},
        showModal: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let id = options.scene || options.id;
        this.setData({
            id: id,
            VideoList: [],
            currentPage: 0,
            lastPage: 0,
            publicMes: ''
        }, () => {
            this.getMemberDetail();
        });
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
        console.log("onPullDownRefresh");
        this.setData({
            VideoList: [],
            currentPage: 0,
            lastPage: 0,
            publicMes: ''
        }, () => {
            this.getMemberDetail();
        });
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
            this.getMemberDetail();
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },

    getMemberDetail(id) {
        let {videoList, currentPage, member} = this.data;
        currentPage += 1;
        let _this = this;
        util.ajaxCommon(`${API.URL_MEMBER_DETAIL}` + this.data.id, {}, {
            success: (res) => {
                if (res.code == API.SUCCESS_CODE) {
                    if (res.data.video.length) {
                        this.setData({
                            videoList: videoList.concat(res.data.video.data),
                            lastPage: res.data.video.last_page,
                            currentPage,
                        });
                    } else {
                        this.setData({
                            publicMes: 'empty',
                        })
                    }
                    _this.setData({
                        user: res.data
                    });
                }
                else {
                }
            }
        })
    },


    followUser(event) {
        const {id} = event.currentTarget.dataset;

        util.ajaxCommon(API.URL_FOLLOWED, {
            'wechat_id': id,
        }, {
            method: "POST",
            needToken: true,
            success: (res) => {
                if (res.code == API.SUCCESS_CODE) {
                    this.setData({
                        ['user.followed']: true,
                    })
                }
            }
        });
    },

    cancelFollowUser(event) {
        const {id} = event.currentTarget.dataset;

        util.ajaxCommon(API.URL_FOLLOWED, {
            'wechat_id': id,
        }, {
            method: "POST",
            needToken: true,
            success: (res) => {
                if (res.code == API.SUCCESS_CODE) {
                    this.setData({
                        ['user.followed']: false,
                    })
                }
            }
        });
    },

    jumpVideoDetail(event) {
        const {id} = event.currentTarget.dataset;

        wx.navigateTo({
            url: `/pages/detail/detail?id=${id}`,
        })
    }, shareUser: function () {
        this.setData({
            showModal: true
        })
    },

    preventTouchMove: function () {

    },


    cancelShareUser: function () {
        this.setData({
            showModal: false
        })
    },

    saveMemberToAlbum(event) {
        let id = event.currentTarget.dataset.id;
        util.saveMemberToAlbum(id);
    }

})