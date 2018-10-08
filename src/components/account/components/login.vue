<template>
  <div id="login" class="page" :style="background">
    <div class="env-change" @click="openEnvPopup()" style="position:fixed;height:40px;width:40px;top:0;left:0;"></div>
    <div class="env-switch" @click="openEnvDialog()" style="position:fixed;height:40px;width:40px;top:0;right:0;"></div>
    <div class="icon-box">
      <img src="@/assets/_images/account/logo.png" alt="">
    </div>
    <div class="form">
      <login-box @afterLogin="afterLogin" @onfocus="onfocus" @onblur="onblur"></login-box>
    </div>
    <van-dialog v-model="showDialog" :show-cancel-button="true" :show-confirm-button="false" :close-on-click-overlay="true">
      <div class="locationMsg">
        代码:【{{location}}】<br>
        版本:【{{version}}】<br>
        环境:【{{$store.getters['runEnv/old']}}】<br>
      </div>
      <switchEnv @getEnv="getEnv"></switchEnv>
    </van-dialog>
  </div>
</template>

<script>
import switchEnv from 'common/components/switchEnv'
import loginBox from './loginBox'
import {Maccount} from '../js/mixins'

export default {
  name: 'Login',
  mixins: [Maccount],
  data () {
    return {
      showDialog: false,
      envPopupClickTimes: 0,
      envDialogClickTimes: 0,
      version: window.version,
      location: window.location.href.split('#')[0],
      offy: 0
    }
  },
  computed: {
    background() {
      return {
        transform: `translate3d(0, ${-this.offy}vh, 0)`
      }
    }
  },
  methods: {
    onfocus () {
      // this.offy = 22
      if (this.$store.state.account.isAndroid) {
        this.offy = 22
      }
    },
    onblur () {
      // this.offy = 0
      if (this.$store.state.account.isAndroid) {
        this.offy = 0
      }
    },
    openEnvPopup() {
      /* eslint-disable */
      this.envPopupClickTimes++;
      //     if(this.envPopupClickTimes%2){
      //       var me=this;
      //       Dialog.alert({
      //         closeOnClickOverlay:true,
      //         message: '<div style="font-size:11px">\
      // 代码:【'+window.location.href.split('#')[0]+'】<br>\
      // 版本:【'+window.version+'】<br>\
      // 环境:【'+me.$store.getters['runEnv/old']+'】<br>\
      //       </div>'
      //       }).then(() => {
      //         // on close
      //       });
      //       return;
      //     }
      //////////////////////////////
      // let self = this;
      // setTimeout(()=> {
      //   this.envPopupClickTimes=0;
      // }, 800);
      setTimeout(()=> {
        if(this.envDialogClickTimes <=0){
          this.envPopupClickTimes=0;
        }
      }, 3000);
      // alert(this.envPopupClickTimes)
      console.log(' this.envPopupClickTimes', this.envPopupClickTimes);
    },
    openEnvDialog() {
      this.envDialogClickTimes++;
      console.log(' this.envDialogClickTimes', this.envDialogClickTimes,this.envPopupClickTimes);
      // alert(this.envPopupClickTimes+'-'+this.envDialogClickTimes )
      if (this.envPopupClickTimes>=2 && this.envDialogClickTimes >= 2) {
        this.showDialog = true;
      }
      setTimeout(()=>{
        this.envPopupClickTimes=0;
        this.envDialogClickTimes=0;
      }, 1000);
    },
    getEnv (env) {
      // window.runEnv = env;
      this.showPopup = false
      this.$store.dispatch('runEnv/changeEnv', env)
      localStorage.setItem("runEnv.env", env)
    }
  },
  components: {
    switchEnv,
    loginBox
  }
}
</script>

<style lang="scss" scoped>
  #login{
    transition: all 0.3s ease;
    .env-change{
      position: absolute;
      top: 0;
      left: 0;
      width: 100px;
      height: 100px;
    }
    .icon-box{
      width: 270px;
      height: 173px;
      margin: 25px auto 0;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .locationMsg{
      font-size: 16px;
    }
  }
</style>
