import API from '@/axios/_api'

let apis = {
  iclassLiveTeacher: '/api/?q=json/ebag/mutual/iclassLiveTeacher&'
}

let iclass = new API(apis)

iclass.judgeIclassLive = (params) => {
  return iclass.fetch(iclass.apis.iclassLiveTeacher, params, 'get', {api: 'old'})
}
export default iclass
