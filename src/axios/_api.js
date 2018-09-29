'use strict'
import API_ABSTRACT from '@/axios/_api.abstract'
import jwt from '@/axios/jwt'
import stroage from '@/store/stroage'

class API extends API_ABSTRACT {
  refreshAuthFetch(url, data, type = 'post', options = {'errorTips': true, 'api': 'api2', 'authJwt': false}) {
    options = Object.assign({'errorTips': true, 'api': 'api2', 'auth': true, 'authJwt': false}, options);
    return jwt.apiAuth(options).then(r => {
      let token = options.authJwt ? stroage['persistent'].get('jwt.jwt') : stroage['persistent'].get('token')
      options['headers'] = {};
      options.authJwt ? options['headers']['authorization'] = token : options['headers']['token'] = token
      // 再调一次接口
      return super.fetch(url, data, type, options);
    }, j => {
      // 去登录
      stroage['persistent'].remove('userinfo');
      stroage['persistent'].set('user.isLogin', false);
      window.location.hash = "#/login"
      return Promise.reject(j);
    });
  };

  authFetch(url, data, type = 'post', options = {'errorTips': true, 'api': 'api2', 'authJwt': false}) {
    options = Object.assign({'errorTips': true, 'api': 'api2', 'auth': true, 'authJwt': false}, options);
    let token = options.authJwt ? stroage['persistent'].get('jwt.jwt') : stroage['persistent'].get('token');
    if (token) {
      let headers = options.headers;
      options['headers'] = {};
      options.authJwt ? options['headers']['authorization'] = token : options['headers']['token'] = token
      Object.assign(options.headers, headers);
      return super.fetch(url, data, type, options).then(r => {
        return r;
      },
      // token失效
      j => {
        if (j.status === -100 || j.status === -101 || j.status === -102 || j.code === 401 || j.code === 4011 || j.code === 4012 || j.code === 4013) {
          return this.refreshAuthFetch(url, data, type, options);
        } else {
          return Promise.reject(j);
        }
      });
    } else {
      // 没有jwt
      return this.refreshAuthFetch(url, data, type, options);
    }
  };

  fetch(url, data, type = 'post', options = {'errorTips': true, 'api': 'api2', 'auth': true, 'authJwt': false}) {
    options = Object.assign({'errorTips': true, 'api': 'api2', 'auth': true, 'authJwt': false}, options);
    if (!options['auth']) {
      return super.fetch(url, data, type, options);
    } else {
      return this.authFetch(url, data, type, options);
    }
  };

  uploadImage(url, data, type = 'post', options = {'errorTips': true, 'api': 'api2', 'auth': true, 'authJwt': false}) {
    options = Object.assign({'errorTips': true, 'api': 'api2', 'auth': true, 'authJwt': false}, options);
    let token = stroage['persistent'].get('token');
    options['headers'] = {};
    options['headers']['token'] = token;
    return super.uploadImage(url, data, type, options);
  };
}

export default API
