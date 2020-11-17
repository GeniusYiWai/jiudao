import {
  classicBeh
} from '../classic-beh.js';
//获取全局音乐控制器类
const mMgr = wx.getBackgroundAudioManager();
Component({
  /**
   * 组件的属性列表
   */
  behaviors: [classicBeh],
  properties: {
    //音乐src
    src: {
      type: String,
    },
    // 音乐名
    title: {
      type: String,
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    //音乐播放时显示的图片
    playSrc: 'images/player@play.png',
    //音乐暂停时显示的图片
    pauseSrc: 'images/player@pause.png',
    //音乐是否在播放
    playing: false
  },
  //组件的生命周期函数 相对于onload
  attached() {
    //恢复播放状态
    this.recoverStatus();
    //监听全局播放状态
    this.monitorSwitch()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //点击音乐播放
    onPlay() {
      //改变音乐播放状态
      let playing = this.data.playing;
      //获取当前播放音乐的src
      let src = wx.getStorageSync('src');
      if (!src) {
        src = this.properties.src
      }
      //如果当前播放的音乐src和缓存中存储的src一样 并且音乐正在播放
      if (playing && src == this.properties.src) {
        // 播放暂停
        mMgr.pause();
        // 播放状态设置为false
        playing = false
      } else {
        //否则 音乐开始播放
        mMgr.src = this.properties.src;
        mMgr.title = this.properties.title;
        // 播放状态设置为true
        playing = true;
      }
      this.setData({
        playing
      })
    },
    //监听全局音乐播放状态
    monitorSwitch() {
      // 播放
      mMgr.onPlay(() => {
        this.recoverStatus()
      })
      // 暂停
      mMgr.onPause(() => {
        this.recoverStatus()
      })
      // 停止
      mMgr.onStop(() => {
        this.recoverStatus()
      })
      // 结束
      mMgr.onEnded(() => {
        this.recoverStatus()
      })
    },
    recoverStatus() {
      //判断全局是否有音乐在播放 如果没有 播放状态设置为false
      if (mMgr.paused) {
        this.setData({
          playing: false
        })
        return
      }
      //判断全局是否有音乐在播放 如果有 并且播放的src和全局的src一样 播放状态设置为true
      if (this.properties.src == mMgr.src) {
        this.setData({
          playing: true
        })

      }
    }
  },


})