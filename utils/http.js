import {
  config
} from '../config.js'

class HTTP {

  constructor() {

  }
  request(params) {
    return new Promise((resovle, reject) => {
      if (!params.method) {
        params.method = 'GET'
      }
      wx.request({
        url: config.api_base_url + params.url,
        method: params.method,
        data: params.data,
        header: {
          appkey: config.appkey
        },
        success: (res) => {
          let code = res.statusCode.toString();
          if (code.startsWith('2')) {
            resovle(res.data.msg);
            let message = res.data.error_message;
            if (message != '成功') {
              this._show_error(res.data.error_message)
            }
          }
        },
        fail(error) {
          reject(error)
          this._show_error('错误');
        }
      })
    })

  }

  _show_error(message) {
    wx.showToast({
      title: message,
      duration: 1000,
      icon: 'none'

    })
  }


}
export {
  HTTP
}