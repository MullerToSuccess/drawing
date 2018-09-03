<template>
     <div id="login" class="page" :style="background">
    <div class="icon-box">
      <img src="./logo.png" alt="">
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
