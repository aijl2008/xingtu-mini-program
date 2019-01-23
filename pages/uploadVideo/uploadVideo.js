const VodUploader = require('../../lib/vod-web-sdk-v5.1');
import * as util from '../../utils/util';
import * as API from '../../utils/API';

const app = getApp()

Page(
    {
        data: {
            fileName: '',
            visibility: 1,
            visibilities: [
                {name: '公开，所有的人可以观看', value: '1'},
                {name: '保护，仅我自已和我的粉丝可以观看', value: '2'},
                {name: '私密，仅我自己可以观看', value: '3'},
            ],
            visibilitiesShow: ['公开，所有的人可以观看', '保护，仅我自已和我的粉丝可以观看', '私密，仅我自己可以观看'],
            classification: 0,
            classifications: [],
            classificationsShow: [],

        },


        onLoad(options) {
            this.get_classifications();
        },

        get_classifications() {
            util.ajaxCommon(API.URL_GET_HEADER_NAV, {}, {
                success: (res) => {
                    if (res.code == API.SUCCESS_CODE) {
                        if (res.data.length) {
                            let classificationsShow = [];
                            for (let item of res.data) {
                                classificationsShow.push(item.name);
                            }

                            this.setData({
                                classifications: res.data,
                                classificationsShow,
                            });
                        }
                    }
                }
            });
        },

        bindPickerChangeVisibilities: function (e) {
            this.setData({
                visibility: e.detail.value
            });
        },
        bindPickerChangeClassifications: function (e) {
            this.setData({
                classification: e.detail.value
            });
        },

        /**
         * 生命周期函数--监听页面显示
         */
        onShow: function () {
          wx.setStorage({
            key: "need-refresh",
            data: "1"
          })
        },
        getSignature: function (callback) {
            wx.showToast({
              title: "获取签名中",
              icon: 'loading',
              duration: 5000,
              mask: true
            });
            util.ajaxCommon(API.URL_VOD_SIGNATURE, {}, {
                needToken: true,
                loading:false,
                success: (res) => {
                    if (res.code == API.SUCCESS_CODE) {
                        if (res.data && res.data.signature) {
                            callback(res.data.signature);
                            wx.showToast({
                                title: "上传中",
                                icon: 'loading',
                                duration: 50000,
                                mask: true
                            });
                        } else {
                            wx.showToast({
                                title: "获取签名失败",
                                icon: 'loading',
                                duration: 1500,
                                mask: true
                            });
                            return '获取签名失败';
                        }
                    }
                }
            });

        },
        inputChange: function (evt) {
            this.setData({
                fileName: evt.detail.value
            });
        },
        chooseFile: function () {
            var This = this;

          const { visibility, visibilities, classification, classifications, fileName} = this.data;
            wx.chooseVideo({
                sourceType: ['album', 'camera'],
                compressed: true,
                maxDuration: 60,
                success: function (file) {
                    VodUploader.start({
                        videoFile: file,
                        fileName: This.fileName,
                        getSignature: This.getSignature, 
                        success: function (result) {
                        },
                        error: function (result) {
                            wx.hideLoading();
                            wx.hideToast();
                            wx.showModal({
                                title: '上传失败',
                                content: JSON.stringify(result),
                                showCancel: false
                            });
                        },
                        progress: function (result) {
                            wx.showToast({
                              title: `上传中${parseInt(result.percent * 100)}%`,
                                icon: 'loading',
                                duration: 50000,
                                mask: true,
                            });
                        },
                        finish: (result) => {

                            /**
                             * 通知服务器上传成功
                             */
                            var formData = {
                              title: fileName,
                                url: result.videoUrl,
                                cover_url: "",
                                file_id: result.fileId,
                                visibility: visibilities[visibility].value,
                                classification_id: classifications[classification].id
                            };


                            util.ajaxCommon(API.URL_VIDEO_UPLOAD_SUCCESS, formData, {
                                method: "POST",
                                needToken: true,
                                loading:false,
                                success: (res) => {
                                    if (res.code == API.SUCCESS_CODE) {
                                        wx.showToast({
                                            title: '上传成功',
                                            mask: true,
                                            complete: (res) => {
                                                wx.navigateBack({
                                                    delta: 1
                                                });
                                                wx.hideToast();
                                            }
                                        });
                                    }
                                }
                            });
                        }
                    });
                }
            })
        }
    })
