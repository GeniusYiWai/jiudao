import {
  BookModel
} from '../../models/book.js'
const bookModel = new BookModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 书籍信息
    books: [],
    //是否在搜索
    searching: false,

    more: Number

  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    //加载书籍信息
    let res = await bookModel.getHotList();
    this.setData({
      books: res
    })

  },
  onSearching() {
    this.setData({
      searching: true
    })
  },
  onCancel() {
    this.setData({
      searching: false
    })
  },
  //页面触底调用该函数 向子组件传递一个随机数
  onReachBottom() {
    this.setData({
      more: Math.random()
    })


  }

})