// components/navi/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String
    },
    first: {
      type: Boolean
    },
    latest: {
      type: Boolean
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    disLeftSrc: 'images/triangle.dis@left.png',
    LeftSrc: 'images/triangle@left.png',
    disRightSrc: 'images/triangle.dis@right.png',
    RightSrc: 'images/triangle@right.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLeft() {
      if (!this.properties.latest) {
        this.triggerEvent('left')

      }

    },
    onRight() {
      if (!this.properties.first) {
        this.triggerEvent('right')

      }

    }
  }
})