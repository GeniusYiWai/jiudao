Component({

  properties: {
    classic: {
      type: Object,

    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    typeText: ""
  },

  attached() {
    this.setType()
  },
  /**
   * 组件的方法列表
   */
  methods: {

    setType() {
      var typeText = {
        100: "电影",
        200: "音乐",
        300: "句子"
      } [this.properties.classic.type]
      this.setData({
        typeText
      })
    }
  }
})