// component/memberItem/memberItem.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        member: {
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
        const {cover_url} = this.data.member;

        if (cover_url) {
            wx.downloadFile({
                url: cover_url,
                success: (res) => {
                    if (res.statusCode === 200) {
                        this.setData({
                            loaded: true,
                            [`member.cover_url`]: res.tempFilePath
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
            const {id} = this.data.member;

            wx.navigateTo({
                url: `/pages/detail/detail?id=${id}`,
            })
        }
    }
})
