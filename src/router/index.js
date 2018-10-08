import Vue from "vue";
import Router from "vue-router";
import home from "@/components/home";
import login from "@/components/login/login";
import account from '@/components/account/router/index';
import author from "@/components/author/author";
import userInfo from "@/components/userInfo/userInfo";
import setUserInfo from "@/components/userInfo/setUserInfo";
import setUserBinding from "@/components/userInfo/setUserBinding";
import studentList from "@/components/student/studentList";
import comStudents from "@/components/comment/comStudents";
import count from "@/components/count/count";
import my from "@/components/my/my";
import feedback from "@/components/my/feedback";
import set from "@/components/my/set";
import about from "@/components/my/about";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: home,
      meta: { requiresAuth: true, keepAlive: true }
    },
    {
      path: "/login",
      name: "login",
      component: login
    },
    {
      path: "/author",
      name: "author",
      component: author
    },
    {
      path: "/userInfo",
      name: "userInfo",
      component: userInfo
    },
    {
      path: "/userInfo/setInfo",
      name: "setUserInfo",
      component: setUserInfo
    },
    {
      path: "/userInfo/setBinding",
      name: "setUserBinding",
      component: setUserBinding
    },
    {
      path: "/studentList",
      name: "studentList",
      component: studentList
    },
    {
      path: "/comStudents",
      name: "comStudents",
      component: comStudents
    },
    {
      path: "/count",
      name: "count",
      component: count
    },
    {
      path: "/my",
      name: "my",
      component: my
    },
    {
      path: "/my/feedback",
      name: "feedback",
      component: feedback
    },
    {
      path: "/my/set",
      name: "set",
      component: set
    },
    {
      path: "/my/about",
      name: "about",
      component: about
    },
    ...account
  ]
});
router.beforeEach((to, from, next) => {
  console.log("to", to);
  console.log("from", from);
  // 定义路由堆栈信息，便于转场动画
  // const fade = ["manager", "teacher", "home", "news", "my", "login"];
  // let toUrlArr = to.fullPath.split("/");
  // let fromUrlArr = from.fullPath.split("/");
  // let toLastRoute = toUrlArr[toUrlArr.length - 1];
  // let fromLastRoute = fromUrlArr[fromUrlArr.length - 1];
  // let routerArr = router.app.$options.store.state.account.routerStack;
  // if (routerArr.find(val => val === to.name)) {
  //   router.app.$options.store.state.account.transitionType = "back";
  // } else {
  //   router.app.$options.store.state.account.transitionType = "forward";
  // }
  // // 在fade数组中转场
  // if (
  //   fade.indexOf(toLastRoute) >= 0 &&
  //   (fade.indexOf(fromLastRoute) >= 0 || fromLastRoute === "")
  // ) {
  //   router.app.$options.store.state.account.transitionType = "fade";
  //   if (to.name === "login") {
  //     router.app.$options.store.state.account.routerStack = ["login"];
  //   }
  // }
  // if (!routerArr.find(val => val === to.name)) {
  //   routerArr.push(to.name);
  // } else {
  //   if (from.name === routerArr[routerArr.length - 1]) {
  //     routerArr.splice(-1, 1);
  //   }
  // }
  //  第一次进入项目
  // this.url = 'https://open.weixin.qq.com/connect/qrconnect?appid=wxc83321efa603dddc&redirect_uri=&response_type=code&scope=snsapi_login#wechat_redirect';
  // console.log(1111111);
  // let token = window.localStorage.getItem("user_token");

  // if (!token && to.path != "/author") {
  //  window.localStorage.setItem("beforeLoginUrl", to.fullPath); // 保存用户进入的url
  //  next("/userInfo");
  //  return false;
  // } else if (token && !store.getters.userInfo) {
  // // //获取用户信息接口
  // //  store
  // //   .dispatch("GetUserInfo", {
  // //    user_token: token
  // //   })
  // //   .catch(err => {
  // //    window.localStorage.removeItem("user_token");
  // //    router.go(0);
  // //    return false;
  // //   });
  // }
  next();
});

export default router;
