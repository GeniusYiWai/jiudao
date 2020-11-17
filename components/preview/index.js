Component({

  properties: {
    //预览的期刊信息
    classic: {
      type: Object,

    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 期刊的标签
    typeText: ""
  },

  attached() {
    //设置期刊标签
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