// component/myVideoItem/myVideoItem.js
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
        goVideoDetail() {
            const {id} = this.data.video;
            wx.navigateTo({
                url: `/pages/detail/detail?id=${id}`,
            })
        },

        saveVideoToAlbum(event) {
            let id = event.currentTarget.dataset.id;
            util.saveVideoToAlbum(id);
        },

        startPlayer(event) {
            const {id} = event.currentTarget.dataset;
            util.LogPlayVideo(id);
            this.triggerEvent('play-video', {
                id,
            });
        },
    }
});
