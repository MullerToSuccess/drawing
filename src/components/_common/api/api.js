import API from '@/axios/_api'

let apis = {
  'clientConfigList': 'client/config/list', //   获取年级数据字典,
  'upload': 'upload/clientUserAvatar', //  'upload/clientUserAvatar',
  'uploadByBase64': 'uploadByBase64/clientUserAvatar',
  'uploadPhoto': 'upload/clientTeacherFeedback',
  "saveAsImage": 'jwt/homework/correct/correct_upload_save',
  'provinceList': 'client/chinaArea/provinceList',
  'updatePassword': 'client/stm/user/updatePassword'//   店长修改他人密码
}

let common = new API(apis)

common.clientConfigList = (params) => {
  return common.fetch(common.apis.clientConfigList, params, 'get', {"api": 'api56'})
}
common.upload = (params) => {
  return common.uploadImage(common.apis.upload, params, 'post', {"api": 'apiUpload'})
}
common.uploadByBase64 = (params) => {
  return common.fetch(common.apis.uploadByBase64, params, 'post', {"api": 'apiUpload'})
}
common.uploadPhoto = (params) => {
  return common.fetch(common.apis.uploadPhoto, params, 'post', {"api": 'apiUpload'})
}
common.saveAsImage = (params) => {
  return common.fetch(common.apis.saveAsImage, params, 'post', {"api": 'api2', "authJwt": false})
}
common.provinceList = (params) => {
  return common.fetch(common.apis.provinceList, params, 'get', {"api": 'api56'})
}
common.updatePassword = (params) => {
  return common.fetch(common.apis.updatePassword, params, 'post', {"api": 'api56'})
}
export default common
