// component/share/share.js
import * as util from "../../utils/util";
import * as API from "../../utils/API";

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    share: {
      type: Object,
      value: {}
    },

    tip: {
      type: String
    },

    className: {
      type: String
    }

  },

  /**
   * 组件的初始数据
   */
  data: {
    show: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    hideShareSelectDialog() {
      console.log("hideShareSelectDialog");
      this.setData({
        show: false
      })
    },
    showShareSelectDialog() {
      console.log("showShareSelectDialog");
      this.setData({
        show: true
      })
    },
    shareToMoment(event) {
      console.log(event.target.dataset);
      hideShareSelectDialog();
      util.saveMemberToAlbum(event.target.dataset.id);
    }
  }
})
