import {
  HTTP
} from '../utils/http.js'
class ClassicModel extends HTTP {
  getLatest() {
    return this.request({
      url: 'classic/latest',
    })
  }
  getPrev(index) {
    return this.request({
      url: 'classic/' + 'previous/' + index
    })
  }
  getNext(index) {
    return this.request({
      url: 'classic/' + 'next/' + index
    })
  }
  getMyLike() {
    return this.request({
      url: 'classic/favor'
    })

  }
}
export {
  ClassicModel
}