// components/classic/episode/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index: {
      type: Number,
      observer(newVal, oldVal, changedPath) {
        let val = newVal < 10 ? '0' + newVal : newVal;
        this.setData({
          _index: val
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    year: 0,
    month: '',
    _index: 0
  },
  lifetimes: {
    attached() {
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth();
      this.setData({
        year,
        month: month + 1
      })

    },
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})