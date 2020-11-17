// components/tag/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //显示的文字
    text: {
      type: String
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  //启用插槽
  options: {
    multipleSlots: true
  },
  //外部样式
  externalClasses: ['tag-class'],
  /**
   * 组件的方法列表
   */
  methods: {
    onTap() {
      //将点击的标签的文字传递出去
      this.triggerEvent('tapping', {
        content: this.properties.text
      })
    }
  }
})