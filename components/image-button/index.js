// components/image-button/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //button按钮的opentype值
    openType: {
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  options: {
    multipleSlots: true
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //抛出点击事件
    onGetUserInfo(event) {
      this.triggerEvent('getuserinfo', event.detail)
    }
  }
})