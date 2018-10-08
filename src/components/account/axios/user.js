import API from '@/axios/_api'

let apis = {
  'login': 'client/stm/login', // 56点登录
  'yxbLogin': '/user/session/init', // yxb登录
  'phoneLogin': 'client/stm/loginByPhone', //  手机登录
  'loginOld': '/api_dist/?q=json/user/Login/login&info=',
  'exists': '/user/logon/exists', // 检查账号是否存在
  'reset': '/user/password/reset', // 重置密码
  'captcha': '/common/captcha/send', // 发送验证码
  'valid': '/common/captcha/valid', // 验证验证码
  'area': '/user/area/get', // 获取地区
  'schoolList': '/user/school/city',
  'contact': '/feedback/addContact',
  'envAddr': 'http://e.dev.anoah.com/tool_webview_url/teacher.php',
  'setPassword': 'client/stm/setPassword',
  'bindPhone': 'client/bindPhone',
  'sendSmsVerifycode': 'client/sendSmsVerifycode', // 'client/sendVirtualVerifycode'
  'checkSmsVerifycode': 'client/checkSmsVerifycode'
}

let user = new API(apis)

user.doLoginNew = (params) => {
  return user.fetch(user.apis.login, params, 'post', {"api": 'api56', "auth": false})
}
user.yxbLogin = (params) => {
  return user.fetch(user.apis.yxbLogin, params, 'post', {"auth": false, "authJwt": true})
}
user.phoneLogin = (params) => {
  return user.fetch(user.apis.phoneLogin, params, 'post', {"api": 'api56', "auth": false})
}
user.setPassword = (params) => {
  return user.fetch(user.apis.setPassword, params, 'post', {"api": 'api56', "auth": false})
}
user.sendSmsVerifycode = (params) => {
  return user.fetch(user.apis.sendSmsVerifycode, params, 'post', {"api": 'api56', "auth": false})
}
user.bindPhone = (params) => {
  return user.fetch(user.apis.bindPhone, params, 'post', {"api": 'api56'})
}
user.checkSmsVerifycode = (params) => {
  return user.fetch(user.apis.checkSmsVerifycode, params, 'post', {"api": 'api56', "auth": false})
}
user.exists = (params) => {
  return user.fetch(user.apis.exists, params, 'post', {"auth": false})
}

user.reset = (params) => {
  return user.fetch(user.apis.reset, params, 'post', {"auth": false})
}

user.captcha = (params) => {
  return user.fetch(user.apis.captcha, params, 'post', {"auth": false})
}

user.valid = (params) => {
  return user.fetch(user.apis.valid, params, 'post', {"auth": false})
}

user.area = (params) => {
  return user.fetch(user.apis.area, params, 'post', {"auth": false})
}
user.schoolList = (params) => {
  return user.fetch(user.apis.schoolList, params, 'post', {"auth": false})
}
user.contact = (params) => {
  return user.fetch(user.apis.contact, params, 'post', {'api': 'apis2', "auth": false})
}

user.envList = (params) => {
  return user.fetch(user.apis.envAddr, params, 'post', {'api': 'apis2', "auth": false, "authJwt": true})
}
export default user
