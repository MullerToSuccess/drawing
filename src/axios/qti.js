import API from '@/axios/_api'
import qs from 'qs'

let apis = {
  getDcom: 'jwt/resource/dcom/get' // 投票题获取entity_id
}

let qtiApi = new API(apis)

qtiApi.getDcom = (params) => {
  return qtiApi.fetch(qtiApi.apis.getDcom + '?' + qs.stringify(params), undefined, 'get')
}

export default qtiApi
