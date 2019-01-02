// component/recommendItem/recommendItem.js
import * as util from "../../utils/util";
import * as API from "../../utils/API";

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        recommend: {
            type: Object,
            value: {}
        }
    },

    /**
     * 组件的初始数据
     */
    data: {},

    /**
     * 组件的方法列表
     */
    methods: {
        followUser() {
            const {id} = this.data.recommend;

            util.ajaxCommon(API.URL_FOLLOWED, {
                'wechat_id': id,
            }, {
                method: "POST",
                needToken: true,
                success: (res) => {
                    if (res.code == API.SUCCESS_CODE) {
                        this.setData({
                            ['recommend.followed']: true,
                        })
                    }
                }
            });
        },

      goMemberDetail(event) {
          const { id } = event.currentTarget.dataset;

          wx.navigateTo({
            url: `/pages/member/member?id=${id}`,
          })
        },

        jumpVideoDetail(event) {
            const {id} = event.currentTarget.dataset;

            wx.navigateTo({
                url: `/pages/detail/detail?id=${id}`,
            })
        }
    }
})
