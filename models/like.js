import {
  HTTP
} from '../utils/http.js'
class LikeModel extends HTTP {
  like(behavior, artID, category) {
    let url = behavior == 'like' ? 'like' : 'like/cancel';
    return this.request({
      url,
      method: 'POST',
      data: {
        art_id: artID,
        type: category
      }
    })
  }
}
export {
  LikeModel
}