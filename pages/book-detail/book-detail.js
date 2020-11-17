import {
  BookModel
} from '../../models/book.js'
const bookModel = new BookModel();
import {
  LikeModel
} from '../../models/like.js'
const likeModel = new LikeModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments: [],
    book: {},
    likeStatus: false,
    likeCount: 0,
    posting: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    wx.showLoading({
      title: '加载中',
    })
    const bid = options.bid;
    const isbn = options.isbn;
    const detail = await bookModel.getDetail(isbn);
    const likeStatus = await bookModel.getLikeStatus(bid);
    const comments = await bookModel.getComments(bid);


    this.setData({
      comments: comments.comments,
      book: detail,
      likeStatus: likeStatus.like_status == 1 ? 'true' : false,
      likeCount: likeStatus.fav_nums
    })

    wx.hideLoading()
  },

  async onLike(event) {
    const action = event.detail.behavior;
    let res = await likeModel.like(action, this.data.book.id, 400);

  },
  onFakePost() {
    this.setData({
      posting: true
    })
  },
  onCancel() {
    this.setData({
      posting: false
    })
  },
  onPost(event) {

    const content = event.detail.content || event.detail.value;
    if (content.trim() == "") {
      return
    }
    if (content.trim().length > 12) {
      wx.showToast({
        title: '最多12个字',
        duration: 1000,
        icon: "none",
      })
      return

    }
    let comments = this.data.comments;
    comments.unshift({
      content,
      nums: 1
    })
    this.setData({
      comments,
      posting: false
    })
    let res = bookModel.addComments(this.data.book.id,
      content);
  }

})