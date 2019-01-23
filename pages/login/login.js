// pages/login/login.js
Page({

    /**
     * 页面的初始数据
     */
    data: {},

    getUserInfo(res) {
        wx.login({
            success(codeRes) {
                if (codeRes.code) {
                    wx.request({
                        url: 'https://www.xiangtu.net.cn/api/mini_program/token',
                        data: {
                            code: codeRes.code,
                            iv: res.detail.iv,
                            encryptedData: res.detail.encryptedData
                        },
                        method: 'POST',
                        success: (result) => {
                            if (result.data.code == 0) {
                                wx.setStorageSync('token', result.data.data.token.accessToken);
                                wx.navigateBack({
                                    delta: 1
                                });
                            }
                            else {
                                wx.showToast({
                                    title: result.data.msg,
                                    image: "/images/sad.png"
                                });
                            }
                        },
                        fail: function (res) {
                            wx.showToast({
                                title: "获取用户失败",
                                image: "/images/sad.png"
                            });
                        },
                    });
                }
                else {
                    wx.showToast({
                        title: '登录失败！',
                        image: "/images/sad.png"
                    });
                }
            }
        });
    }
});
