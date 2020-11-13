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
    latestIndex: null,
    firstIndex: 1,
    curretnIndex: null,
    isLatest: true,
    isFirst: false
  },
  async onLoad() {
    let data = await classicModel.getLatest();
    this.setData({
      classic: data,
      latestIndex: data.index,
      curretnIndex: data.index
    })

  },
  onLike(event) {

    let behavior = event.detail.behavior;
    likeModel.like(behavior, this.data.classic.id, this.data.classic.type);
  },
  onNext() {
    if (this.data.curretnIndex == this.data.firstIndex) {
      return
    }
    this.setData({
      curretnIndex: this.data.curretnIndex - 1,
      isLatest: false
    })
    if (this.data.curretnIndex == this.data.firstIndex) {
      this.setData({
        isFirst: true
      })

    }

  },
  onPrev() {
    if (this.data.curretnIndex == this.data.latestIndex) {
      return
    }
    this.setData({
      curretnIndex: this.data.curretnIndex + 1,
      isFirst: false
    })

    if (this.data.curretnIndex == this.data.latestIndex) {
      this.setData({
        isLatest: true
      })

    }
  }



})


// let promise = new Promise((resolve, reject) => {
//   wx.request({
//     url: 'http://www.frontendgo.com:8886/v1/classic/latest',
//     method: 'GET',
//     header: {
//       appkey: 'admin'
//     },
//     success(res) {
//       resolve(res.data)

//     },
//     fail(error) {
//       reject(error)
//     }
//   })

// })

// let res = await promise;
// console.log(res);