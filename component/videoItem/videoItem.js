// component/videoItem/videoItem.js
import * as API from '../../utils/API';
import * as util from '../../utils/util';

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        video: {
            type: Object,
            value: {}
        },

        index: {
            type: Number,
            value: 0,
        },

        currentId: {
            type: Number,
            value: 0
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        loaded: false,
        videoIndex: null,
        videoList: []
    },


    preventTouchMove: function () {

    },

    attached() {
        const {cover_url} = this.data.video;
        if (cover_url) {
            wx.downloadFile({
                url: cover_url,
                success: (res) => {
                    if (res.statusCode === 200) {
                        this.setData({
                            loaded: true,
                            [`video.cover_url`]: res.tempFilePath
                        })
                    }
                }
            });
        }
    },


    /**
     * 组件的方法列表
     */
    methods: {
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
        },

        goVideoDetail() {
            const {id} = this.data.video;
            wx.navigateTo({
                url: `/pages/detail/detail?id=${id}`,
            })
        },

        startPlayer(event) {
            const {id} = event.currentTarget.dataset;
            util.LogPlayVideo(id);
            this.triggerEvent('play-video', {
                id,
            });
        },

        goMemberDetail(event) {
            const {id} = event.currentTarget.dataset;
            wx.navigateTo({
                url: `/pages/member/member?id=${id}`,
            })
        },

        changeCollection(event) {
            const {id, index, status} = event.currentTarget.dataset;
            if (status) {
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
                                image: "/images/smiling.png"
                            });
                            this.triggerEvent('collection-changed', {
                                index: index,
                                liked: false,
                            });
                        }
                        else {
                            wx.showToast({
                                title: res.msg,
                                mask: true,
                                icon: "success",
                                duration: 2500,
                                image: "/images/sad.png"
                            });
                        }
                    }
                });
            } else {
                util.ajaxCommon(API.URL_LIKE_VIDEO, {
                    "video_id": id,
                }, {
                    method: 'POST',
                    loading: false,
                    needToken: true,
                    success: (res) => {
                        if (res.code == API.SUCCESS_CODE) {
                            wx.showToast({
                                title: res.msg,
                                mask: true,
                                icon: "success",
                                duration: 1500,
                                image: "/images/smiling.png"
                            });
                            this.triggerEvent('collection-changed', {
                                index: index,
                                liked: true,
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

        followVideo(event) {
            const {id} = event.currentTarget.dataset;
            util.ajaxCommon(API.URL_FOLLOWED, {
                'wechat_id': id,
            }, {
                method: "POST",
                needToken: true,
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
                        this.triggerEvent('follow-changed', {
                            id,
                        }, {});
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
        },

        saveVideoToAlbum(event) {
            let id = event.currentTarget.dataset.id;
            util.saveVideoToAlbum(id);
        },
    }
})
