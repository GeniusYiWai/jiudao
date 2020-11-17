const paginationBev = Behavior({
  data: {
    dataArray: [],
    total: 0,
    loading: false,
    noneResult: false
  },
  methods: {

    setMoreData(dataArray) {
      const tempArray = this.data.dataArray.concat(dataArray);
      this.setData({
        dataArray: tempArray
      })
      if (tempArray.length == 0) {
        this.setData({
          noneResult: true
        })
      }
    },
    getCurrentStart() {
      return this.data.dataArray.length
    },
    setTotal(total) {
      this.data.total = total;
    },
    hasMore() {
      return this.data.dataArray.length >= this.data.total ? false : true;
    },
    initialize() {
      this.setData({
        dataArray: [],
        total: null,
        loading: false,
        noneResult: false


      })
    },
    isLocked() {
      return this.data.loading ? true : false
    },
    locked() {
      this.setData({
        loading: true,
      })
    },
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