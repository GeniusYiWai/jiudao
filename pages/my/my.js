import {
  BookModel
} from '../../models/book.js'
const bookModel = new BookModel()
import {
  ClassicModel
} from '../../models/classic.js'
const classicModel = new ClassicModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorized: false,
    userInfo: {},
    bookCount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.userAuthorized();
    this.getMyBookCount();
    this.getMyLike();

  },
  onGetUserInfo() {
    this.userAuthorized()
  },
  async getMyLike() {
    const res = await classicModel.getMyLike();
    this.setData({
      classics: res
    })
  },
  async getMyBookCount() {
    const res = await bookModel.getMyBookCount();
    this.setData({
      bookCount: res.count
    })
  },
  userAuthorized() {
    wx.getSetting({
      success: data => {
        if (data.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: data => {
              this.setData({
                userInfo: data.userInfo,
                authorized: true,

              })
            }
          })
        }

      },
    })
  }

})