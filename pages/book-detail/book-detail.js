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
    //书籍评论
    comments: [],
    // 书籍详情
    book: {},
    // 书籍点赞状态
    likeStatus: false,
    // 数据点赞数量
    likeCount: 0,
    // 是否正在发送评论
    posting: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    wx.showLoading({
      title: '加载中',
    })
    // 加载书籍信息
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
  //点赞书籍
  async onLike(event) {
    const action = event.detail.behavior;
    let res = await likeModel.like(action, this.data.book.id, 400);

  },
  //点击输入短片触发该事件
  onFakePost() {
    // 显示输入界面和遮罩
    this.setData({
      posting: true
    })
  },
  //取消发送评论
  onCancel() {
    // 关闭输入界面和遮罩
    this.setData({
      posting: false
    })
  },
  //发送评论
  onPost(event) {
    //评论内容可以是用户自己输入的 或者是点击热评输入的
    const content = event.detail.content || event.detail.value;
    //过滤评论
    if (content.trim() == "") {
      return
    }
    //计算长度
    if (content.trim().length > 12) {
      wx.showToast({
        title: '最多12个字',
        duration: 1000,
        icon: "none",
      })
      return
    }
    // 手动将用户的评论unshift到评论列表数组
    let comments = this.data.comments;
    comments.unshift({
      content,
      nums: 1
    })
    // 关闭输入界面
    this.setData({
      comments,
      posting: false
    })
    //调用发送评论api
    let res = bookModel.addComments(this.data.book.id,
      content);
  }

})