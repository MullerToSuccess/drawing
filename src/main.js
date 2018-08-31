// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import MuseUI from 'muse-ui'
// import 'muse-ui/dist/muse-ui.css'
import store from './components/draw/store/index.js'

// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';

import Vant from 'vant';
import 'vant/lib/vant-css/index.css';

Vue.use(Vant);
// Vue.use(MuseUI)
// Vue.use(ElementUI)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
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