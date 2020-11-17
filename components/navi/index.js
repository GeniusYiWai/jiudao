// components/navi/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 期刊标题
    title: {
      type: String
    },
    //是否为第一个期刊
    first: {
      type: Boolean
    },
    //是否为最新期刊
    latest: {
      type: Boolean
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 下一个期刊按钮图片
    disLeftSrc: 'images/triangle.dis@left.png',
    // 下一个期刊按钮禁用图片

    LeftSrc: 'images/triangle@left.png',
    // 上一个期刊按钮禁用图片

    disRightSrc: 'images/triangle.dis@right.png',
    // 上一个期刊按钮图片

    RightSrc: 'images/triangle@right.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 下一个期刊
    onLeft() {
      //如果不是最新一期期刊 才触发该函数 否则禁用
      if (!this.properties.latest) {
        this.triggerEvent('left')
      }
    },
    onRight() {
      //如果不是第一期期刊 才触发该函数 否则禁用
      if (!this.properties.first) {
        this.triggerEvent('right')

      }

    }
  }
})