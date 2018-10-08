<template>
  <div id="forget-pws" class="page" style="z-index: 1">
    <header-bar>
      <div slot="title-name">找回密码</div>
    </header-bar>
    <div class="bind-phone">
      <bind-phone :type="mode" btnText="下一步" @next="next"></bind-phone>
    </div>
    <div class="back-login">
      <router-link :to="{path:'/login'}">返回登录</router-link>
    </div>
    <div class="bottom">
      <div>没有绑定手机？</div>
      <div>请联系分校管理人员或是总部管理员。</div>
    </div>
  </div>
</template>

<script>
import bindPhone from 'common/components/bindPhone'
import HeaderBar from 'common/components/headerBar'
import user from '@/module/account/axios/user'
import {Toast} from 'vant'

export default {
  name: 'forgetPassword',
  data () {
    return {
      phone: '',
      sms: '',
      mode: 'forget'
    }
  },
  methods: {
    next (is, phone, sms) {
      if (is) {
        this.phone = phone
        this.sms = sms
        user.checkSmsVerifycode({
          smsVerifycode: sms,
          mobile: phone
        }).then(succ => {
          this.afterLogin()
        }, () => {
        })
      } else {
        Toast(`此时无法进行下一步！`)
      }
    },
    afterLogin () {
      this.$router.push({
        path: '/login/setNewPassword',
        query: {
          phone: this.phone,
          sms: this.sms
        }
      })
    }
  },
  components: {
    bindPhone,
    HeaderBar
  }
}
</script>

<style lang="scss" scoped>
.back-login{
  margin-top: calc(50px/2);
  text-align: center;
  font-size: calc(32px/2);
}
.bind-phone{
  /*top: calc(100px/2);*/
}
.bottom{
  width: 100%;
  position: fixed;
  bottom: calc(20px/2);
  text-align: center;
  font-size: calc(30px/2);
  div{
    margin-top: calc(15px/2);
  }
}
</style>
