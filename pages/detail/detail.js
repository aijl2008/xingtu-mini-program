// pages/detail/detail.js
import * as util from '../../utils/util';
import * as API from '../../utils/API';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: 0,
        videoDetail: {},
        currentPage: 0,
        videoList: [],
        lastPage: 0,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let id = options.scene || options.id;
        this.setData({
            id,
        }, () => {
            this.getVideoDetail();
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
    onPullDownRefresh() {
        this.setData({
            videoList: [],
            currentPage: 0,
            lastPage: 0,
        }, () => {
            this.getVideoList();
        })
    },

    onReachBottom() {
        const {currentPage, lastPage} = this.data;

        if (currentPage >= lastPage) {
            /*到底了*/
        } else {
            this.getVideoList();
        }

    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        const {id, title, cover_url} = this.data.videoDetail;
        util.LogShareVideoToWechat(id);
        return {
            title,
            path: `/pages/detail/detail?id=${id}`,
            imageURL: cover_url,
        }
    },
  goHome(){
      wx.switchTab({
        url: '/pages/index/index',
      })
  },
    getVideoList() {
        let {currentPage, videoList, videoDetail} = this.data;

        currentPage += 1;
        let _this = this;

        util.ajaxCommon(API.URL_GET_VIDEOS, {
            wechat_id: videoDetail.wechat.id,
            video_id: videoDetail.id,
            page: currentPage,
        }, {
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

    getVideoDetail() {
        util.ajaxCommon(`${API.URL_VIDEO_DETAIL}${this.data.id}}`, {}, {
            success: (res) => {
                if (res.code == API.SUCCESS_CODE) {
                    this.setData({
                        videoDetail: res.data,
                    }, () => {
                        this.getVideoList();
                    })
                }
            }
        })
    },

    changeCollection() {
        const {id, videoDetail} = this.data;

        if (videoDetail.liked) {
            util.ajaxCommon(`${API.URL_LIKE_VIDEO}/${id}`, {}, {
                method: 'DELETE',
                needToken: true,
                loading: false,
                success: (res) => {
                    if (res.code == API.SUCCESS_CODE) {
                        wx.showToast({
                            title: res.msg,
                            mask: true,
                            icon: "success",
                            duration: 1500,
                            image: "/images/sad.png"
                        });

                        Object.assign(videoDetail, {
                            liked: false,
                            formatted_liked_number: videoDetail.formatted_liked_number - 1
                        });

                        this.setData({
                            videoDetail
                        });
                    }
                    else {
                        wx.showToast({
                            title: res.msg,
                            mask: true,
                            icon: "success",
                            duration: 1500,
                            image: "/images/sad.png"
                        });
                    }
                }
            });
        } else {
            util.ajaxCommon(`${API.URL_LIKE_VIDEO}`, {
                "video_id": id,
            }, {
                method: 'POST',
                loading: false,
                success: (res) => {
                    if (res.code == API.SUCCESS_CODE) {

                        wx.showToast({
                            title: res.msg,
                            mask: true,
                            icon: "success",
                            duration: 1500,
                            image: "/images/smiling.png"
                        });

                        Object.assign(videoDetail, {
                            liked: true,
                            formatted_liked_number: videoDetail.formatted_liked_number + 1
                        });

                        this.setData({
                            videoDetail
                        });
                    }
                    else {
                        wx.showToast({
                            title: res.msg,
                            mask: true,
                            icon: "success",
                            duration: 1500,
                            image: "/images/sad.png"
                        });
                    }
                }
            });
        }
    },

    changeFollow(event) {
        const {id, videoDetail} = this.data;

        if (videoDetail.wechat.followed) {
            util.ajaxCommon(`${API.URL_FOLLOWED}/${videoDetail.wechat.id}`, {
                'wechat_id': id,
            }, {
                method: "DELETE",
                needToken: true,
                loading: false,
                success: (res) => {
                    if (res.code == API.SUCCESS_CODE) {
                        this.setData({
                            ['videoDetail.wechat.followed']: false,
                        })
                    }
                    else {
                        wx.showToast({
                            title: res.msg,
                            mask: true,
                            icon: "success",
                            duration: 1500,
                            image: "/images/sad.png"
                        });
                    }
                }
            })
        } else {
            util.ajaxCommon(`${API.URL_FOLLOWED}`, {
                'wechat_id': videoDetail.wechat.id,
            }, {
                method: "POST",
                needToken: true,
                loading: false,
                success: (res) => {

                    if (res.code == API.SUCCESS_CODE) {
                        this.setData({
                            ['videoDetail.wechat.followed']: true,
                        })
                    }
                    else {
                        wx.showToast({
                            title: res.msg,
                            mask: true,
                            icon: "success",
                            duration: 1500,
                            image: "/images/sad.png"
                        });
                    }
                }
            })
        }
    },

    saveVideoToAlbum(event) {
        let id = event.currentTarget.dataset.id;
        util.saveVideoToAlbum(id);
    },

    showMore(event) {
        wx.showActionSheet({
            itemList: ["举报"],
            success: function (res) {
                if (res.tapIndex === 0) {
                    wx.navigateTo({
                        url: '/pages/inform/inform?video_id=' + event.target.dataset.id,
                    })
                }
            }
        });
    }
})
