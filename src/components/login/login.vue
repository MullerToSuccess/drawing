<template>
     <div id="login" class="page" :style="background">
    <div class="icon-box">
      <img src="@/assets/_images/public/logo.png" alt="">
      <div class="logo-title">优学优评</div>
    </div>
    <div class="form">
      <login-box @afterLogin="afterLogin" @onfocus="onfocus" @onblur="onblur"></login-box>
    </div>
  </div>
</template>

<script>
import loginBox from './loginBox'
export default {
    computed: {
    background() {
      return {
        transform: `translate3d(0, ${-this.offy}vh, 0)`
      }
    }
  },
  methods: {
    onfocus () {
      this.offy = 22
    //   if (this.$store.state.account.isAndroid) {
    //     this.offy = 22
    //   }
    },
    onblur () {
      this.offy = 0
    //   if (this.$store.state.account.isAndroid) {
    //     this.offy = 0
    //   }
    }
  },
  components: {
    loginBox
  }
}
</script>
<style lang='scss' scoped>
 #login{
    transition: all 0.3s ease;
    background-image: url('../../assets/_images/public/bg.png');
    background-repeat: no-repeat;
    background-size: 100% auto;
    .env-change{
      position: absolute;
      top: 0;
      left: 0;
      width: 100px;
      height: 100px;
    }
    .icon-box{
      width: 180px;
      height: 173px;
      margin: 0 auto;
      text-align: center;
      margin-top: 40px;
      img{
        width: 50%;
        height: 50%;
      }
      logo-title{
        margin-top: 10px;
        font-size: 5vw !important;
        font-weight: bold;
        color: #666666
      }
    }
    .locationMsg{
      font-size: 16px;
    }
  }
</style>
