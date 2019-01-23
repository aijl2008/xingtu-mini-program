const URL_PREFIX = 'https://www.xiangtu.net.cn';
const SUCCESS_CODE = 0;

/*首页分类*/
const URL_GET_HEADER_NAV = `${URL_PREFIX}/api/classifications`;

/*视频列表*/
const URL_GET_VIDEOS = `${URL_PREFIX}/api/videos`;
const URL_PLAY_VIDEO = `${URL_PREFIX}/api/videos/play/`;
const URL_SHARE_VIDEO_TO_WECHAT = `${URL_PREFIX}/api/videos/share_to_wechat/`;
const URL_SHARE_VIDEO_TO_MOMENT = `${URL_PREFIX}/api/videos/share_to_moment/`;

const URL_MEMBER_DETAIL = `${URL_PREFIX}/api/users/`;

/*收藏、收藏列表*/
const URL_LIKE_VIDEO = `${URL_PREFIX}/api/my/liked`;

/*关注、关注列表*/
const URL_FOLLOWED = `${URL_PREFIX}/api/my/followed`;

const URL_LOGIN = `${URL_PREFIX}/api/mini_program/token`;

/*视频详情*/
const URL_VIDEO_DETAIL = `${URL_PREFIX}/api/videos/`;

/*个人信息*/
const URL_USER_DETAIL = `${URL_PREFIX}/api/my/profile`;

/*vod上传签名*/
const URL_VOD_SIGNATURE = `${URL_PREFIX}/api/qcloud/signature/vod`;

/*保存上传信息*/
const URL_VIDEO_UPLOAD_SUCCESS = `${URL_PREFIX}/api/my/videos`;

/*我的视频 */
const URL_GET_MY_VIDEOS = `${URL_PREFIX}/api/my/videos`;

/*我看过的视频 */
const URL_GET_MY_HISTORY = `${URL_PREFIX}/api/my/history`;

/*推荐用户 */
const URL_RECOMMEND_USER = `${URL_PREFIX}/api/wechat/recommend`;

const QR_CODE_USER = `${URL_PREFIX}/qr_code/user`;
const QR_CODE_VIDEO = `${URL_PREFIX}/qr_code/video`;

const URL_statistics = `${URL_PREFIX}/api/my/statistics`;

const URL_INFORM = `${URL_PREFIX}/api/inform`;

export {
    URL_PREFIX,
    SUCCESS_CODE,
    URL_GET_HEADER_NAV,
    URL_GET_VIDEOS,
    URL_LIKE_VIDEO,
    URL_FOLLOWED,
    URL_LOGIN,
    URL_VIDEO_DETAIL,
    URL_USER_DETAIL,
    URL_VOD_SIGNATURE,
    URL_VIDEO_UPLOAD_SUCCESS,
    URL_GET_MY_VIDEOS,
    URL_RECOMMEND_USER,
    URL_GET_MY_HISTORY,
    QR_CODE_USER,
    QR_CODE_VIDEO,
    URL_PLAY_VIDEO,
    URL_INFORM,
    URL_statistics,
    URL_MEMBER_DETAIL,
    URL_SHARE_VIDEO_TO_WECHAT,
    URL_SHARE_VIDEO_TO_MOMENT,
};
