const paginationBev = Behavior({
  data: {
    //搜索书籍的信息
    dataArray: [],
    //搜索书籍的总记录条数
    total: 0,
    //是否正在搜索
    loading: false,
    //是否没有结果
    noneResult: false
  },
  methods: {
    //更新搜索书籍数据
    setMoreData(dataArray) {
      //将旧数据与新数据合并
      const tempArray = this.data.dataArray.concat(dataArray);
      //更新
      this.setData({
        dataArray: tempArray
      })
      //如果没有数据
      if (tempArray.length == 0) {

        this.setData({
          //设置为true
          noneResult: true
        })
      }
    },
    //获取搜索的开始位置
    getCurrentStart() {
      return this.data.dataArray.length
    },
    //设置总记录条数
    setTotal(total) {
      this.data.total = total;
    },
    //判断是否有更多数据
    hasMore() {
      return this.data.dataArray.length >= this.data.total ? false : true;
    },
    //初始化
    initialize() {
      this.setData({
        dataArray: [],
        total: null,
        loading: false,
        noneResult: false
      })
    },
    //判断是否上锁
    isLocked() {
      return this.data.loading ? true : false
    },
    //上锁
    locked() {
      this.setData({
        loading: true,
      })
    },
    //解锁
    unLocked() {
      this.setData({
        loading: false,
      })
    },
  }

})
export {
  paginationBev
}