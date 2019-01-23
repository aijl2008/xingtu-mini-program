//index.js
//获取应用实例
import * as util from '../../utils/util';
import * as API from '../../utils/API';


const app = getApp()

Page({
    data: {
        navList: [],
        videoList: [],
        activeId: 0,
        currentId: 0,
        currentPage: 0,
        lastPage: 0
    },

    onLoad(options) {
        this.getNavList();
    },

    onPullDownRefresh() {
        this.setData({
            videoList: [],
            currentId: 0,
            currentPage: 0,
            lastPage: 0,
        }, () => {
            this.getVideoList();
        })
    },

    onHide: function () {
      this.setData({
        currentId: 0
      });
    },

    onReachBottom() {
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
     * 用户点击右上角分享
     */
    onShareAppMessage: function (event) {
        if (event.from == 'button') {
            const {id, title, cover} = event.target.dataset;
            util.LogShareVideoToWechat(id);
            return {
                title,
                path: `/pages/detail/detail?id=${id}`,
                imageURL: cover,
            }
        }
    },

    getNavList() {
        util.ajaxCommon(API.URL_GET_HEADER_NAV, {}, {
            loading: false,
            success: (res) => {
                if (res.code == API.SUCCESS_CODE) {
                    if (res.data.length) {
                        this.setData({
                            navList: res.data,
                            activeId: res.data[0].id,
                        }, () => {
                            this.getVideoList();
                        });
                    }
                }
            }
        });
    },

    getVideoList() {
        let {activeId, currentPage, videoList} = this.data;

        currentPage += 1;

        util.ajaxCommon(API.URL_GET_VIDEOS, {
            classification: activeId,
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

    changeNav(event) {
        const {id} = event.currentTarget.dataset;

        this.setData({
            activeId: id,
            videoList: [],
            currentId: 0,
            currentPage: 0,
            lastPage: 0,
        }, () => {
            this.getVideoList();
        });
    },

    playHomeVideo(event) {
        if (this.videoContext) {
            this.videoContext.pause();
        }
        const {id} = event.detail;
        this.setData({
            currentId: id,
        }, () => {
            this.videoContext = wx.createVideoContext(`video_${id}`);
            this.videoContext.play();
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

    followChanged(event) {
        let {id} = event.detail;
        let {videoList} = this.data;

        for (let item of videoList) {
            if (item.wechat.id == id) {
                item.wechat.followed = true;
            }
        }

        this.setData({
            videoList,
        })
    }
})
