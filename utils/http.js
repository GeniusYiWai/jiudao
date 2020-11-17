import {
  config
} from '../config.js'

class HTTP {

  request({url, data = {}, method = 'GET'}) {
    return new Promise((resovle, reject) => {
      wx.request({
        url: config.api_base_url + url,
        method,
        data,
        header: {
          appkey: config.appkey
        },
        success: (res) => {
          let code = res.statusCode.toString();
          if (code.startsWith('2')) {
            resovle(res.data.msg);
            let message = res.data.error_message;
            if (message != '成功') {
              reject();
              this._show_error(res.data.error_message)
            }
          }
        },
        fail(error) {
          reject();
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