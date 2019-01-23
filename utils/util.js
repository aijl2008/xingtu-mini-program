import * as API from "./API";

const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

const checkToken = function () {
    const token = wx.getStorageSync('token');

    if (token) {
        return true;
    } else {
        // 查看是否授权
        wx.navigateTo({
            url: "/pages/login/login"
        });

        return false;
    }
}


const gotoVideoPlayerPagem = function () {

}

/**
 * 全局通用网络请求方法
 */
const ajaxCommon = function (url, data, {method = "GET", loading = true, needToken, success, fail, complete, needHideLoadingIndicator = false}) {
    if (needToken) {
        if (!checkToken()) {
            return false;
        }
    }
    if (loading) {
        wx.showToast({
            mask: true,
            title: "网络请求中",
            icon: "loading",
            duration: 10000
        });
    }
    let finalData = {};
    let token = wx.getStorageSync('token');
    Object.assign(finalData, data);

    wx.request({
        url,
        header: {
            Accept: 'application/json',
            Authorization: token ? `Bearer ${token}` : '',
        },
        data: finalData,
        method: method,
        success: function (response) {
            if (response.data.code == 401) {
                wx.showToast({
                    title: '请重新登录',
                    icon: 'none',
                    mask: true,
                    complete: (res) => {
                        wx.removeStorage({
                            key: 'token',
                            success() {
                                wx.navigateTo({
                                    url: '/pages/login/login',
                                })
                            }
                        });
                    }
                })
            } else if (typeof success === 'function') {
                success(response.data);
            }
            else {
            }
            if (loading) {
                wx.hideToast();
            }

        },
        fail: function (res) {
            if (typeof fail === 'function') {
                fail(res);
            } else {
                wx.showToast({
                    title: '网络不太给力',
                    image: "/images/sad.png"
                })
            }
        },
        complete: function (res) {
            if (typeof complete === 'function') {
                complete(res);
            }
        }
    })
};

const saveMemberToAlbum = function (id) {
    wx.showToast({
        title: '正在制作二维码',
        icon: "loading",
        duration: 50000
    });
    wx.downloadFile({
        url: `${API.QR_CODE_USER}?page=pages/member/member&scene=${id}`,
        success(res) {
            wx.hideToast();
            wx.saveImageToPhotosAlbum({
                filePath: res.tempFilePath,
                success(res) {
                    wx.showModal({
                        title: '二维码已保存到手机相册',
                        content: '请从手机相册选择图片并分享',
                        showCancel: false,
                        success: function (res) {
                            if (res.confirm) {
                            } else if (res.cancel) {
                            }
                        }
                    })
                },
                fail(res) {
                    wx.hideToast();
                    wx.showToast({
                        title: '分享失败',
                        icon: 'success',
                        image: "/images/sad.png",
                        duration: 1500
                    });
                }
            })
        },
        fail: function (res) {
            console.log('下载失败');
        },
        complete: function () {
        }
    })
}

const inform = function (data) {
    ajaxCommon(
        API.URL_INFORM,
        data,
        {
            method: 'POST',
            needToken: false,
            loading: false,
            success: (res) => {
                wx.showModal({
                    title: '系统提示',
                    content: '举报成功',
                    showCancel: false,
                    success: function (res) {
                        wx.navigateBack({
                            delta: 1
                        })
                    }
                })
            }
        }
    );
}

const saveVideoToAlbum = function (id) {
    wx.showToast({
        title: '正在制作二维码',
        icon: "loading",
        duration: 50000
    });
    wx.downloadFile({
        url: `${API.QR_CODE_VIDEO}?page=pages/detail/detail&scene=${id}`,
        success(res) {
            wx.hideToast();
            wx.saveImageToPhotosAlbum({
                filePath: res.tempFilePath,
                success(res) {
                    wx.showModal({
                        title: '二维码已保存到手机相册',
                        content: '请从手机相册选择图片并分享',
                        showCancel: false,
                        success: function (res) {
                            LogShareVideoToMoment(id);
                        }
                    })
                },
                fail(res) {
                    wx.hideToast();
                    wx.showToast({
                        title: '分享失败',
                        icon: 'success',
                        image: "/images/sad.png",
                        duration: 1500
                    });
                }
            })
        },
        fail: function (res) {
            console.log('下载失败');
        },
        complete: function () {
        }
    })
}

const LogPlayVideo = function (id) {
    ajaxCommon(API.URL_PLAY_VIDEO + id, {}, {
        method: 'POST',
        needToken: false,
        loading: false,
        success: (res) => {
        }
    });
};

const LogShareVideoToWechat = function (id) {
    ajaxCommon(API.URL_SHARE_VIDEO_TO_WECHAT + id, {}, {
        method: 'POST',
        needToken: false,
        loading: false,
        success: (res) => {
        }
    });
};

const LogShareVideoToMoment = function (id) {
    ajaxCommon(API.URL_SHARE_VIDEO_TO_MOMENT + id, {}, {
        method: 'POST',
        needToken: false,
        loading: false,
        success: (res) => {
        }
    });
};
module
    .exports = {
    formatTime,
    formatNumber,
    ajaxCommon,
    checkToken,
    saveVideoToAlbum,
    saveMemberToAlbum,
    inform,
    LogPlayVideo,
    LogShareVideoToWechat,
    LogShareVideoToMoment
}