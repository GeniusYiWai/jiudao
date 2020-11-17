import {
  HTTP
} from '../utils/http.js'
class KeyWordModel extends HTTP {
  key = 'q';
  maxLength = 10;
  //从缓存中获取搜索历史
  getHistory() {
    const words = wx.getStorageSync(this.key);
    if (!words) {
      return [];
    }
    return words;
  }
  //获取热搜
  getHot() {
    return this.request({
      url: "book/hot_keyword"
    })
  }
  //将搜索关键字添加到缓存在
  addToHistory(keyword) {
    let words = this.getHistory();
    //判断是否已经存在
    const has = words.includes(keyword);
    //如果不存在
    if (!has) {
      const length = words.length;
      //判断搜索历史数组长度
      if (length >= this.maxLength) {
        //如果搜索历史过多 删除最后一个
        words.pop();
      }
      //添加到搜索历史数组第一个
      words.unshift(keyword);
      //更新缓存
      wx.setStorageSync(this.key, words);
    }
  }

}

export {
  KeyWordModel
}