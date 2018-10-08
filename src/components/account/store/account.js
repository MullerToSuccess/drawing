import stroage from '@/store/stroage.js'
import userApi from '@/module/account/axios/user.js'
import {SHA256} from '@/utils/sha256'
import {Toast} from 'vant'
export default {
  namespaced: true,
  state: {
    isLogin: false,
    username: stroage['persistent'].get('user.username') ? stroage['persistent'].get('user.username') : '',
    password: stroage['persistent'].get('user.password') ? stroage['persistent'].get('user.password') : '',
    phone: stroage['persistent'].get('phone') ? stroage['persistent'].get('phone') : '',
    userIdentity: stroage['persistent'].get('userIdentity') ? stroage['persistent'].get('userIdentity') : '',
    schoolId: stroage['persistent'].get('schoolId') ? stroage['persistent'].get('schoolId') : '',
    userId: stroage['persistent'].get('userId') ? stroage['persistent'].get('userId') : '',
    classId: stroage['persistent'].get('classId') ? stroage['persistent'].get('classId') : [],
    sms: '',
    mobileBind: stroage['persistent'].get('mobileBind') ? stroage['persistent'].get('mobileBind') : '',
    userInfo: stroage['persistent'].get('userinfo') ? stroage['persistent'].get('userinfo') : {},
    isAndroid: false,
    keyBoradHeihgt: 0,
    routerStack: [], // 路由堆栈
    transitionType: 'fade' // 路由转场模式
  },
  getters: {
    username: state => state.username,
    userIdentity: state => state.userIdentity,
    password: state => state.password,
    schoolId: state => state.schoolId,
    classId: state => state.classId,
    phone: state => state.phone,
    sms: state => state.sms,
    loginInfo: state => state.loginInfo,
    userInfo: state => state.userInfo,
    userId: state => state.userId
  },
  mutations: {
    setKeyBoradHeihgt(state, payload) {
      state.keyBoradHeihgt = payload
    },
    setIsAndroid(state, payload) {
      state.isAndroid = payload
    },
    setIsLogin(state, isLogin) {
      state.isLogin = isLogin
      // 登录成功后会话更新登录状态
      stroage['persistent'].set('user.isLogin', isLogin)
    },
    setUsername(state, val) {
      state.username = val
    },
    setPassword(state, val) {
      state.password = val
    },
    setUserInfo(state, val) {
      state.userInfo = val
    },
    setClassId (state, val) {
      state.classId = val
    },
    setSms(state, val) {
      state.sms = val
    },
    setUserId(state, val) {
      state.userId = val
    },
    setPhone(state, val) {
      state.phone = val
    },
    setUserIdentity(state, val) {
      state.userIdentity = val
      stroage['persistent'].set('user.userIdentity', val)
    },
    setMobileBind(state, val) {
      state.mobileBind = val
      stroage['persistent'].set('user.mobileBind', val)
    },
    setSchoolId(state, val) {
      state.schoolId = val
    }
  },
  actions: {
    doLogin({state, commit}) {
      return userApi.doLoginNew({
        loginnum: state.username,
        password: SHA256(state.password)
      }).then(r => {
        saveMeesage({state, commit}, r)
      })
    },
    phoneLogin({state, commit}, params) {
      console.log(params)
      return userApi.phoneLogin({
        mobile: params.phone,
        smsVerifycode: params.sms
      }).then(r => {
        saveMeesage({state, commit}, r)
      })
    },
    doLoginOut({state, commit}) {
      stroage['persistent'].remove('neverShowBindPhone')
      commit('setIsLogin', false)
    },
    refreshLocalIsLogin({state}) {
      state.isLogin = state.isLogin ? state.isLogin : stroage['persistent'].get('user.isLogin')
    },
    refreshLocalIdentity({state}) {
      state.userIdentity = state.userIdentity ? state.userIdentity : stroage['persistent'].get('user.userIdentity')
    },
    refreshMobileBind({state}) {
      state.mobileBind = state.mobileBind ? state.mobileBind : stroage['persistent'].get('user.mobileBind')
    }
  }
}

function saveMeesage({state, commit}, r) {
  // 切换用户登录清空历史数据
  if (stroage['persistent'].get('user.username') !== state.username) {
    let env = stroage['persistent'].get('runEnv.env') || ''
    let mqtt = stroage['persistent'].get('mqtt')
    stroage['persistent'].clear()
    // window.bus.$store.commit('news/clearMqtt', {})
    stroage['persistent'].set('runEnv.env', env)
    stroage['persistent'].set('mqtt', mqtt)
  }
  // 登录成功后持久用户名和密码
  if (r.schoolList.length === 0) {
    Toast(`无学校`)
    return false
  }
  console.log(r.userId)
  stroage['persistent'].set('user.username', state.username)
  stroage['persistent'].set('user.password', state.password)
  stroage['persistent'].set('refreshToken', r.refreshToken) // 56用户token
  stroage['persistent'].set('token', r.token) //  56点业务token
  stroage['persistent'].set('userIdentity', r.role)
  stroage['persistent'].set('schoolId', r.schoolList[0].id)
  stroage['persistent'].set('userId', r.userId)
  stroage['persistent'].set('phone', r.mobile)
  stroage['persistent'].set('mobileBind', r.mobileBind)

  commit('setIsLogin', true)
  commit('setPhone', r.mobile)
  commit('setUserIdentity', r.role)
  commit('setSchoolId', r.schoolList[0].id)
  commit('setUserId', r.userId)
  commit('setMobileBind', r.mobileBind)
  console.log('==========')
  console.log(r)
  let array = state.userIdentity
  for (let i = 0; i < array.length; i++) {
    if (array[i] === 2) {
      let arr = []
      r.schoolList[0].classList.forEach((v, i) => {
        arr.push(v.id)
      })
      stroage['persistent'].set('yxpUserToken', r.yxpUserToken) // 第三方token
      stroage['persistent'].set('classId', arr)
      commit('setClassId', arr)
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
        "accesstoken": "" // (可选项),第三方授权的TOKEN
      }
      // let params2 = {
      //   'device': 'PC_BROWSER',
      //   'module': 'YOUXUE-BAN',
      //   'version': 'v1.0',
      //   'timestamp': new Date().getTime() / 1000,
      //   'account': state.username,
      //   'password': state.password,
      //   'jwtusertoken': true
      // }
      params.accesstoken = stroage['persistent'].get('yxpUserToken')
      //  调用优学宝登录接口
      return userApi.yxbLogin(params).then(r => {
        stroage['persistent'].set('jwt', r.jwt)
        stroage['persistent'].set('userinfo', r.userinfo)
        commit('setUserInfo', r.userinfo)
      }, j => {
        return Promise.reject(j)
      })
    }
  }
}
