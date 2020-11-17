const {
  BookModel
} = require("../../models/book");

// components/like/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

    //点赞状态
    like: {
      type: Boolean,
      // value: false,
      // observer:()=>{

      // }
    },
    //点赞数量
    count: {
      type: Number
    },
    readOnly: {
      type: Boolean
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    //已点赞图片路径
    yesSrc: 'images/like.png',
    //未点赞图片路径
    noSrc: 'images/like@dis.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //点赞事件处理
    onLike(event) {
      if (this.properties.readOnly) {
        return
      }
      let like = this.properties.like;
      let count = this.properties.count;
      count = like ? count - 1 : count + 1;


      this.setData({
        count,
        like: !like
      })

      let behavior = this.properties.like ? 'like' : 'cancel';
      this.triggerEvent('like', {
        behavior
      })

    }
  }
})