// 期刊组件共同的Behavior
let classicBeh = Behavior({
  properties: {
    // 期刊图片
    img: {
      type: String
    },
    // 期刊内容
    content: {
      type: String
    },
    // 期刊是否显示
    hidden: {
      type: Boolean
    }
  }

})
export {
  classicBeh
}