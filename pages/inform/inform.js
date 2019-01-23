// pages/inform/inform.js
import * as util from "../../utils/util";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        video_id: 0,
        content: "",
        radioItems: [
            {name: '广告', value: '广告'},
            {name: '色情、暴力', value: '色情、暴力'},
            {name: '抄袭、侵权', value: '抄袭、侵权'},
            {name: '未成年人不当行为', value: '未成年人不当行为'},
            {name: '内容质量差，引人不适', value: '内容质量差，引人不适'},
            {name: '违反法规，政治敏感', value: '违反法规，政治敏感'},
            {name: '标题党，封面与内容不符', value: '标题党，封面与内容不符'},
            {name: '无法播放', value: '无法播放'},
            {name: '播放卡顿', value: '播放卡顿'},
            {name: '清晰度差', value: '清晰度差'},
            {name: '暂停、快进、全屏等操作无反应', value: '暂停、快进、全屏等操作无反应'},
            {name: '其他原因', value: '其他原因'},
        ],
    },

    radioChange(e) {
        const checked = e.detail.value
        const changed = {}
        for (let i = 0; i < this.data.radioItems.length; i++) {
            if (checked.indexOf(this.data.radioItems[i].name) !== -1) {
                changed['radioItems[' + i + '].checked'] = true
            } else {
                changed['radioItems[' + i + '].checked'] = false
            }
        }
        this.setData(changed);
        this.setData(
            {content: checked}
        );
    },

    informToAdmin: function () {
        if (!this.data.content) {
            wx.showModal({
                title: "系统消息",
                showCancel: false,
                content: "请选择投诉内容"
            });
            return;
        }
        util.inform(
            {
                video_id: this.data.video_id,
                content: this.data.content
            }
        );
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let id = options.scene || options.video_id;
        this.setData({
            video_id: id
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

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})