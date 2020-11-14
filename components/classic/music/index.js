import {
  classicBeh
} from '../classic-beh.js';
const mMgr = wx.getBackgroundAudioManager();
Component({
  /**
   * 组件的属性列表
   */
  behaviors: [classicBeh],
  properties: {
    src: {
      type: String,
    },
    title: {
      type: String,
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    playSrc: 'images/player@play.png',
    pauseSrc: 'images/player@pause.png',
    playing: false
  },

  attached() {
    this.recoverStatus();
    this.monitorSwitch()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //点击音乐播放
    onPlay() {
      let playing = this.data.playing;
      let src = wx.getStorageSync('src');
      if (!src) {
        src = this.properties.src
      }
      if (playing && src == this.properties.src) {
        mMgr.pause();
        playing = false
      } else {
        mMgr.src = this.properties.src;
        mMgr.title = this.properties.title;
        playing = true;
      }
      this.setData({
        playing
      })


    },
    monitorSwitch() {
      mMgr.onPlay(() => {
        this.recoverStatus()
      })
      mMgr.onPause(() => {
        this.recoverStatus()
      })
      mMgr.onStop(() => {
        this.recoverStatus()
      })
      mMgr.onEnded(() => {
        this.recoverStatus()
      })
    },
    recoverStatus() {
      if (mMgr.paused) {
        this.setData({
          playing: false
        })
        return
      }
      if (this.properties.src == mMgr.src) {
        this.setData({
          playing: true
        })

      }
    }
  },


})