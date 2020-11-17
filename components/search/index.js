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
    //判断页面是否到底部 如果到底部则调用loadMore函数加载更多数据
    more: {
      type: Number,
      observer() {
        //一旦more的值发生了改变就会调用
        this.loadMore();
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    //热搜关键字
    hotWords: [],
    //搜索历史
    historyWords: [],
    //是否正在搜索
    searching: false,
    //搜索关键字
    q: "",

  },
  attached() {
    //加载热搜
    this.getHot();
    //加载搜索历史
    this.getHistory();
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //加载更多
    loadMore() {
      //如果没有搜索关键字 return
      if (!this.data.q) {
        return
      }
      //如果上锁了 return
      if (this.isLocked()) {
        return
      }
      //上锁
      this.locked();
      //如果有更多数据 加载更多数据
      if (this.hasMore()) {
        bookModel.search(this.getCurrentStart(), this.data.q).then((res) => {
          //合并数据
          this.setMoreData(res.books);
          //解锁
          this.unLocked()
        }, () => {
          //数据加载失败 解锁
          this.unLocked()
        })
      }

    },
    //取消搜索
    onCancel() {
      this.triggerEvent('cancel');
    },
    //获取热搜
    async getHot() {
      let res = await keywordModel.getHot();
      this.setData({
        hotWords: res.hot
      })
    },
    //搜索
    async onConfirm(event) {
      this.setData({
        //正在搜索
        searching: true,
      })
      //获取搜索关键字 要么是用户输入的 要么是用户点击标签的
      const q = event.detail.value || event.detail.content;
      //第一次加载数据 从0开始
      const res = await bookModel.search(0, q);
      //合并数据
      this.setMoreData(res.books);
      //设置总记录条数
      this.setTotal(res.total);
      //设置搜索关键字到输入框
      this.setData({
        q,
      })
      //添加到搜索历史缓存
      keywordModel.addToHistory(q);
    },
    //获取搜索历史
    getHistory() {
      const historyWords = keywordModel.getHistory();
      this.setData({
        historyWords
      })
    },
    //删除搜索关键字
    onDelete() {
      //初始化
      this.initialize()
      this.setData({
        q: '',
        searching: false,
        loading: false
      })
    },

  }
})