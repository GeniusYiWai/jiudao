import {
  ClassicModel
} from '../../models/classic.js'
import {
  LikeModel
} from '../../models/like.js'
const likeModel = new LikeModel;
const classicModel = new ClassicModel;
Page({

  data: {
    classic: null,
    isLatest: true,
    isFirst: false
  },
  async onLoad() {
    let res = await classicModel.getLatest();
    this.setData({
      classic: res,
    })
    wx.setStorageSync('latestIndex', res.index)

  },
  onLike(event) {

    let behavior = event.detail.behavior;
    likeModel.like(behavior, this.data.classic.id, this.data.classic.type);
  },
  async onNext() {

    let index = this.data.classic.index;
    let res = await classicModel.getNext(index);
    this.setData({
      classic: res,
      isLatest: this.isLatest(index + 1),
      isFirst: false
    })


  },
  async onPrev() {
    let index = this.data.classic.index;
    let res = await classicModel.getPrev(index);
    this.setData({
      classic: res,
      isFirst: this.isFirst(index - 1),
      isLatest: false
    })

  },
  isFirst(index) {
    return index == 1 ? true : false;
  },
  isLatest(index) {
    return index == wx.getStorageSync('latestIndex') ? true : false
  }



})