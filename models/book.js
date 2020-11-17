import {
  HTTP
} from '../utils/http.js'
class BookModel extends HTTP {
  getHotList() {
    return this.request({
      url: 'book/hot_list'
    })
  }
  getDetail(isbn) {
    return this.request({
      url: `book/detail/${isbn}`
    })
  }
  getLikeStatus(bid) {
    return this.request({
      url: `book/favor/${bid}`
    })
  }
  getComments(bid) {
    return this.request({
      url: `book/short_comment/${bid}`
    })
  }
  addComments(bid, content) {
    return this.request({
      url: `book/add/short_comment`,
      data: {
        "book_id": bid,
        "content": content
      },
      method: 'POST'
    })
  }
  search(start, q) {
    return this.request({
      url: `book/search?summary=1`,
      data: {
        q,
        start
      }
    })
  }


}
export {
  BookModel
}