import API_ABSTRACT from '@/axios/_api.abstract'
import stroage from '@/store/storage'
let apis = {
  'login': `client/stm/login`, // 56点登录接口
  'yxbLogin': `/user/session/init`, // 优学宝登录接口 用第三方token获取jwt
  'refreshToken': `client/getToken`,
  'dev': `https://dev.anoah.com/yxp_jwt/get/`,
  'prod': 'https://jwt.anoah.com/get/'
}

let jwt = new API_ABSTRACT(apis)
// 56点获取新的或刷新所有 token
jwt.getByLoginInfo = (username, password) => {
  let params = {}
  let api = jwt.apis.login;
  params.username = username;
  params.password = password;
  return jwt.fetch(api, params, 'post')
}

// 通过 usertokent取jwt token
jwt.getByUserToken = (usertoken, options) => {
  let params = {
    "module": "teacher_activity", // [*必传项*] 定义访问的模块，包括“网站”，“教师端服务”，“教师客户端”，“优学帮”等，需要
    "jwtusertoken": ""// 需要返回刷新jwt的token，只有当传入了username和password此项才能设为true
  }
  let api
  if (options.authJwt) {
    api = process.env.NODE_ENV === 'production' ? jwt.apis.prod : (jwt.apis.dev.replace('dev.', window.bus.$store.getters['runEnv/env'] + '.'));
    params.jwtusertoken = usertoken;
    return jwt.fetch(api, params, 'post', options)
  } else {
    api = jwt.apis.refreshToken
    params = {
      refreshToken: usertoken
    }
    return jwt.fetch(api, params, 'post', options)
  }
}

// 使用用户jwt失效 或56用户token失效 改用56用户名密码去请求登录接口重新获取
jwt.onUserTokenFail = () => {
  let username = window.bus.$store.getters['account/user']['username'];
  let password = window.bus.$store.getters['account/user']['password'];
  return jwt.getByLoginInfo(username, password).then(r => { // 通过用户名、密码请求56点登录接口
    stroage['persistent'].set('token', r.token) //   56点业务token
    stroage['persistent'].set('refreshToken', r.refreshToken) // 56点用户token
    stroage['persistent'].set('yxpUserToken', r.yxpUserToken) // 第三方token 获取优学宝jwt
    return jwt.thirdToken();
  }, j => {
    return Promise.reject(j);
  });
}
//  第三方token请求jwt
jwt.thirdToken = () => {
  let params = {
    "device": "pad", // [*必传项*] 访问的设备类型，定义：browser(浏览器）,u-pad(优学派)，pad(第三方pad), 教师机pc端，smartphone,ipad等，需要一起定义
    "module": "teacher_mobile", // [*必传项*] 定义访问的模块，包括“网站”，“教师端服务”，“教师客户端”，“优学帮”等，需要一起定义
    "version": "v1.0", // [*必传项*] module版本号
    "timestamp": "9999999", // [*必传项*]客户端时间戳
    "MAC": "", // （可选项）客户端网卡MAC地址
    "machineid": "", // (可选性)客户端机身编号
    "UUID": "", // (可选项)，设备的UUID,如果是普通的浏览器或者获取不到，则为空
    "username": "", // (可选项)，如要获取带用户身份的jwt需要传递
    "password": "", // (可选项)，如果传递了username,则password必须传递
    "accesstoken": "", // (可选项),第三方授权的TOKEN
    "jwtusertoken": "true"// 需要返回刷新jwt的token，只有当传入了username和password此项才能设为true
  }
  params.accesstoken = stroage['persistent'].get('yxpUserToken')
  let api = jwt.apis.yxbLogin
  return jwt.fetch(api, params, 'post', {'authJwt': true}).then(r => {
    stroage['persistent'].set('jwt', r.jwt)
    window.bus.$store.mutations['account/setUserInfo'](r.userinfo)
  }, j => {
    return Promise.reject(j);
  })
}
// api 请求报jwt错误时调用
jwt.apiAuth = (options) => {
  let usertoken = options.authJwt ? stroage['persistent'].get('jwt.jwtusertoken') : stroage['persistent'].get('refreshToken')
  if (usertoken) {
    return jwt.getByUserToken(usertoken, options).then(r => {
      if (options.authJwt) {
        stroage['persistent'].set('jwt', r);
        return r;
      } else {
        stroage['persistent'].set('token', r.token);
        return r;
      }
    }, j => {
      // 第三方用户token 失败
      console.log('第三方用户token is fail')
      return jwt.onUserTokenFail();
    });
  } else {
    // 如果没有56用户token或者第三方用户token
    console.log('no jwtusertoken')
    return jwt.onUserTokenFail();
  }
}
export default jwt
