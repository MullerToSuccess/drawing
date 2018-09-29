'use strict'
import axios from 'axios'
import { Toast } from 'vant'
let loading
function startLoading () {
  loading = Toast.loading({
    duration: 0,
    forbidClick: true,
    loadingType: 'spinner'
  })
}
function endLoading () {
  loading.clear()
}

let needLoadingRequestCount = 0
export function showFullScreenLoading () {
  if (needLoadingRequestCount === 0) {
    startLoading()
  }
  needLoadingRequestCount++
}

export function tryHideFullScreenLoading () {
  if (needLoadingRequestCount <= 0) return
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    endLoading()
  }
}
/**  axios基础配置 */
axios.defaults.timeout = 15000
// axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
// axios.defaults.withCredentials = true

axios.interceptors.request.use(config => {
  // loading
  showFullScreenLoading()
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  return response
}, error => {
  // console.log('error', error.response, JSON.stringify(error))
  let response = { 'status': -404, 'statusText': '请检查网络或稍后重试' }
  response = error.response || response
  return Promise.resolve(response)
})

function responseFormat (response) {
  // loading
  tryHideFullScreenLoading()
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304)) {
    return response.data
  }
  // 异常状态下，保持格式统一
  return {
    status: response.status,
    msg: response.statusText,
    data: response.data
  }
}

export default {
  post (url, data, options) {
    let send = {
      method: 'post',
      url,
      data: data,
      headers: {
        // 'X-Requested-With': 'XMLHttpRequest',
        // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    };
    Object.assign(send.headers, options.headers);

    return axios(send).then(
      (response) => {
        return responseFormat(response)
      }
    )
  },
  get (url, params, options) {
    let send = {
      method: 'get',
      url,
      params: params,
      headers: {
        // 'X-Requested-With': 'XMLHttpRequest',
        // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    };
    Object.assign(send.headers, options.headers);
    return axios(send).then(
      (response) => {
        return responseFormat(response)
      }
    )
  },
  uploadImage (url, formData, type, options) {
    let send = {
      method: type,
      url,
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    };
    Object.assign(send.headers, options.headers);
    return axios(send).then(
      (response) => {
        return responseFormat(response)
      }
    )
  }
}
