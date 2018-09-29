// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// import Vant from 'vant';
// import 'vant/lib/vant-css/index.css';

// document.addEventListener('deviceready', function() {
//   new Vue({
//       el: '#app',
//       router,
//       store,
//       template: '<App/>',
//       components: { App }
//   })
//   window.navigator.splashscreen.hide()
// }, false);

import Vue from 'vue'
import App from './App'
// import store from './store/index.js'
import store from './components/draw/store/index.js'
import router from './router'

// import '@/assets/css/element.min.css'
import '@/assets/css/base.css'
import '@/assets/css/global.css'
// import 'font-awesome/css/font-awesome.css'

//使用vant
import '@/assets/css/vant-index.css';
import Vant, {Lazyload} from 'vant';

//使用mint-ui
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

import util from '@/utils/index.js'
// import dayjs from 'dayjs';

import Axios from 'axios';
import '../lib/mqttws31.js'
// import '../lib/app_plug.js'
import '../lib/html2canvas.js'
import mqtt from '@/utils/LMQqtt.js'

// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts'
// 引入柱状图
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import '@/style/global.scss'
import '@/style/index.scss'
import '@/../lib/swiper.min.css'
import Swiper from '@/../lib/swiper.min.js'
// import qtiApi from '@/axios/qti.js'
// import studentList from '@/plugins/studentList/index'
// 引入全局过滤器
// import * as filters from '@/filter/index'
import Tree from 'element-ui';
import VueTouch from 'vue-touch'
// import FastClick from 'fastclick'

// FastClick.attach(document.body)
Vue.use(VueTouch, {name: 'v-touch'})

VueTouch.config.swipe = {

  threshold: 70

}
Vue.use(Tree);
Vue.use(Vant);
Vue.use(MintUI);


Vue.use(Lazyload, {
  loading: 'static/loading-svg/loading-spin.svg'
})
window.HW = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

// Vue.use(studentList)

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
Vue.prototype.Swiper = Swiper

// Vue.prototype.$dayjs = dayjs;

Vue.prototype.$http = Axios;

// Vue.prototype.$qtiApi = qtiApi;


window.Vue = Vue
Vue.prototype.$echarts = echarts

Vue.prototype.util = util
Vue.config.productionTip = false
Vue.config.devtools = process.env.NODE_ENV !== 'production';
window.bus = new Vue()
window.bus.$store = store;
window.bus.mqtt = mqtt;
// 初始化老版本qti参数，和动态引入需要icombase
window.ICOM_EVN_VAR = {
  js_local: true,
  debug: true,
  lib_address: `../QTI/jslibs/`,
  base: `../QTI/icoms/`,
  api_address: `${store.getters['runEnv/old']}/api/`,
  api_address_dist: `${store.getters['runEnv/old']}/api_dist/`,
  api_address_router: `${store.getters['runEnv/old']}/api_router/`,
  api_cache: true
}
window.bus.addQti = function (src, id) {
  let head = document.getElementsByTagName('head')[0]
  let script = document.createElement('script')
  script.type = 'text/javascript'
  script.src = src
  if (id) {
    script.id = id
  }
  head.appendChild(script)
}
window.bus.addQti(`../QTI/jquery.js`)
window.bus.addQti(`../QTI/icombase.js`, 'icombase')

