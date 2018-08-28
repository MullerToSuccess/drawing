import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = {
  mcolor: "red",
  mname: "设置",
  isSetting: false
};
const getters = {
  mcolor: state => state.mcolor,
  mname: state => state.mname
};
const mutations = {
  setColor: (state, payload) => {
    state.mcolor = "#ffffff";
  },
  setName: (state, payload) => {
      console.log(222);
    state.mname = (state.isSetting ? '重新设置' : '设置');
    state.isSetting = !state.isSetting;
  }
};

export default new Vuex.Store({
  getters,
  state,
  mutations
});
