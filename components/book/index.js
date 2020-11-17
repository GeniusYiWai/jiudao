// components/book/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //数据信息
    book: {
      type: Object
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onTap() {
      // 书籍id
      const bid = this.properties.book.id;
      // 书籍isbn
      const isbn = this.properties.book.isbn;
      //跳转到书籍详情页面
      wx.navigateTo({
        url: `/pages/book-detail/book-detail?bid=${bid}&isbn=${isbn}`,
      })
    }
  }
})