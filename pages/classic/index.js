// 导入模型
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
    // 期刊信息
    classic: null,
    // 是否是最新期刊
    isLatest: true,
    // 是否是第一期
    isFirst: false
  },
  async onLoad() {
    // 加载期刊信息
    let res = await classicModel.getLatest();
    this.setData({
      classic: res,
    })
    // 将最新一期的期刊索引存入缓存
    wx.setStorageSync('latestIndex', res.index)

  },
  onLike(event) {
    // 调用点赞api
    let behavior = event.detail.behavior;
    likeModel.like(behavior, this.data.classic.id, this.data.classic.type);
  },
  async onNext() {
    // 加载下一期期刊
    let index = this.data.classic.index;
    let res = await classicModel.getNext(index);
    this.setData({
      classic: res,
      //判断当前期刊是不是最新一期 如果是 将isLatest设置为true
      isLatest: this.isLatest(index + 1),
      isFirst: false
    })


  },
  async onPrev() {
    // 加载上一期期刊
    let index = this.data.classic.index;
    let res = await classicModel.getPrev(index);
    this.setData({
      classic: res,
      //判断当前期刊是不是第一期 如果是 将isLatest设置为true
      isFirst: this.isFirst(index - 1),
      isLatest: false
    })

  },
  //是否为第一期
  isFirst(index) {
    return index == 1 ? true : false;
  },
  //是否为最新一期
  isLatest(index) {
    return index == wx.getStorageSync('latestIndex') ? true : false
  }

})