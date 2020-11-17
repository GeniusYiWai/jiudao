// components/classic/episode/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //期刊索引
    index: {
      type: Number,
      //index newVal：新值 oldVal：旧值  changedPath：包含子字段的字段名相关信息
      observer(newVal, oldVal, changedPath) {
        // console.log(changedPath);
        // 如果传入的index小于10 则加上一个0 否则不做改变
        let val = newVal < 10 ? '0' + newVal : newVal;
        // 这里不能直接setData index 因为index的type是Number  08会被解析成8 最终输出的也是8
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
    // 年份
    year: 0,
    // 月份
    month: '',
    // 期刊索引
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