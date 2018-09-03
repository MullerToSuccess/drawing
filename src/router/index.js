import Vue from 'vue'
import Router from 'vue-router'
// import draw from '@/components/draw/draw'
import login from '@/components/login/login'
import wechat from '@/components/wechat/wechat'
import author from '@/components/author/author'
import userInfo from '@/components/userInfo/userInfo'
import setUserInfo from '@/components/userInfo/setUserInfo'
import setUserBinding from '@/components/userInfo/setUserBinding'
import studentList from '@/components/student/studentList'
import comStudents from '@/components/comment/comStudents'
import count from '@/components/count/count'
import my from '@/components/my/my'


Vue.use(Router)


const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    }, {
      path: '/wechat',
      name: 'wechat',
      component: wechat
    }, {
      path: '/author',
      name: 'author',
      component: author
    }, {
      path: '/userInfo',
      name: 'userInfo',
      component: userInfo
    }, {
      path: '/userInfo/setInfo',
      name: 'setUserInfo',
      component: setUserInfo
    }, {
      path: '/userInfo/setBinding',
      name: 'setUserBinding',
      component: setUserBinding
    }, {
      path: '/studentList',
      name: 'studentList',
      component: studentList
    }, {
      path: '/comStudents',
      name: 'comStudents',
      component: comStudents
    }, {
      path: '/count',
      name: 'count',
      component: count
    }, {
      path: '/my',
      name: 'my',
      component: my
    }
  ]
})
// router.beforeEach((to, from, next) => {
//   //  第一次进入项目
//   // this.url = 'https://open.weixin.qq.com/connect/qrconnect?appid=wxc83321efa603dddc&redirect_uri=&response_type=code&scope=snsapi_login#wechat_redirect';
//   console.log(1111111);
//   let token = window.localStorage.getItem("user_token");

//   if (!token && to.path != "/author") {
//    window.localStorage.setItem("beforeLoginUrl", to.fullPath); // 保存用户进入的url
//    next("/userInfo");
//    return false;
//   } else if (token && !store.getters.userInfo) {
//   // //获取用户信息接口
//   //  store
//   //   .dispatch("GetUserInfo", {
//   //    user_token: token
//   //   })
//   //   .catch(err => {
//   //    window.localStorage.removeItem("user_token");
//   //    router.go(0);
//   //    return false;
//   //   });
//   }
//   next();
// })

export default router;