// component/collectionItem/collectionItem.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        collection: {
            type: Object,
            value: {}
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        loaded: false
    },

    attached() {
        const {cover_url} = this.data.collection;

        if (cover_url) {
            wx.downloadFile({
                url: cover_url,
                success: (res) => {
                    if (res.statusCode === 200) {
                        this.setData({
                            loaded: true,
                            [`collection.cover_url`]: res.tempFilePath
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
            const {id} = this.data.collection;
            wx.navigateTo({
                url: `/pages/detail/detail?id=${id}`,
            })
        }
    }
})
