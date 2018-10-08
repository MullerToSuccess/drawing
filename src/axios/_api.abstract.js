'use strict'
import http from './_axios'
import qs from 'qs'
import { Toast } from 'vant'
import store from '@/store/storage'

class API_ABSTRACT {
  // 为对象添加属性
  constructor (apis = []) {
    this.apis = apis
  }

  // 检查返回数据，status非1时，默认弹出轻提示
  checkStatus (data, opt) {
    if (data.status === 1 || data.code === 0) {
      return data.recordset || data.data || data
      // JWT验证异常
    }
    if (data.status === -100 || data.status === -102 || data.status === -101 || data.code === 1001 || data.code === 401 || data.code === 4011 || data.code === 4012 || data.code === 4013 || data.code === 500) {
      Toast(`${data.msg}`)
      return Promise.reject(data)
      // 取数据异常
    } else {
      if (opt.errorTips) {
        if (data.msg === 'OK' && typeof data.recordset === 'string') {
          data.msg = data.recordset
        }
        let msg = data.msg;
        if (opt.Auth) {
          // msg += '(' + data.status + ')'
        }
        Toast({position: 'bottom', message: msg})
      }
      return Promise.reject(data)
    }
  }

  // 获取数据通用方法
  fetch (url, data, type = 'post', options = {'errorTips': true, 'api': 'api2', 'authJwt': false, 'dataType': ''}) {
    options = Object.assign({ 'errorTips': true, 'api': 'api2', 'auth': true, 'authJwt': false, 'dataType': '' }, options);
    const apiDomain = window.bus.$store.getters['runEnv/' + options.api] ? window.bus.$store.getters['runEnv/' + options.api] : window.bus.$store.getters['runEnv/' + options.api]
    url = !~url.indexOf('http') ? apiDomain + url : url
    if (type === 'post') {
      // data = qs.stringify(data)
      data = options.dataType === 'json' ? JSON.stringify(data) : qs.stringify(data)
      return http.post(url, data, options).then(r => {
        return this.checkStatus(r, options)
      })
    } else if (type === 'get') {
      data = options.api === 'old' ? { 'info': JSON.stringify(data) } : data
      return http.get(url, data, options).then(r => {
        // if (url.indexOf('VerifyQrcode') > 0) {
        //   return r
        // }
        return this.checkStatus(r, options)
      })
    }
  }

  uploadImage (url, formData, type = 'post', options = {'errorTips': true, 'api': 'old'}) {
    const apiDomain = window.bus.$store.getters['runEnv/' + options.api] ? window.bus.$store.getters['runEnv/' + options.api] : window.bus.$store.getters['runEnv/' + options.api]
    url = !~url.indexOf('http') ? apiDomain + url : url
    return http.uploadImage(url, formData, type, options).then(r => {
      if (options.api === 'apiUpload') {
      } else {
        r.recordset = {'result': r.result}
      }
      return this.checkStatus(r, options)
    })
  }

  doParams() {

  }
}

export default API_ABSTRACT
