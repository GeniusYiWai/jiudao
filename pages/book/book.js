import {
  BookModel
} from '../../models/book.js'
const bookModel = new BookModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    books: [],
    searching: true,
    more:Number

  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
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
  onReachBottom() {

    this.setData({
      more: Math.random()
    })


  }

})