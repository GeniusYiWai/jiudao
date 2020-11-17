import {
  KeyWordModel
} from '../../models/keyword.js'
const keywordModel = new KeyWordModel()
import {
  BookModel
} from '../../models/book.js'
const bookModel = new BookModel()
import {
  paginationBev
} from '../behaviors/pagination.js'
Component({
  /**
   * 组件的属性列表
   */
  behaviors: [paginationBev],
  properties: {
    more: {
      type: Number,
      observer() {
        this.loadMore();
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    hotWords: [],
    historyWords: [],
    searching: false,
    q: "",

  },
  attached() {
    this.getHot();
    this.getHistory();
  },

  /**
   * 组件的方法列表
   */
  methods: {
    loadMore() {
      if (!this.data.q) {
        return
      }
      if (this.isLocked()) {
        return
      }
      this.locked();
      if (this.hasMore()) {
        bookModel.search(this.getCurrentStart(), this.data.q).then((res) => {
          this.setMoreData(res.books);
          this.unLocked()
        }, () => {
          this.unLocked()
        })
      }

    },

    onCancel() {
      this.triggerEvent('cancel');
    },
    async getHot() {
      let res = await keywordModel.getHot();
      this.setData({
        hotWords: res.hot
      })
    },
    async onConfirm(event) {
      this.setData({
        searching: true,
      })
      const q = event.detail.value || event.detail.content;
      const res = await bookModel.search(0, q);
      this.setMoreData(res.books);
      console.log(this.data.noneResult);

      this.setTotal(res.total);
      this.setData({
        q,
      })
      keywordModel.addToHistory(q);
    },
    getHistory() {
      const historyWords = keywordModel.getHistory();
      this.setData({
        historyWords
      })
    },
    onDelete() {
      this.initialize()
      this.setData({
        q: '',
        searching: false,
        loading: false
      })
    },

  }
})