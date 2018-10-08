<template>
  <div id="phone-login" class="page" style="z-index: 1">
    <bind-phone class="phone" btnText="登录" @next="next"></bind-phone>
    <div class="pwd-login">
      <router-link :to="{path:'/login'}" tag="div">用户账号登录</router-link>
    </div>
  </div>
</template>

<script>
import BindPhone from 'common/components/bindPhone'
import {mapGetters, mapActions} from 'vuex'
import {Toast} from 'vant'
import {Maccount} from '../js/mixins'

export default {
  name: 'phoneLogin',
  mixins: [Maccount],
  computed: {
    ...mapGetters({
      phone: 'account/phone',
      sms: 'account/sms'
    })
  },
  methods: {
    next (is, phone, sms) {
      if (is) {
        this.phoneLogin({phone: phone, sms: sms}).then(succ => {
          this.afterLogin()
        }, () => {
        })
      } else {
        Toast(`此时无法进行登录！`)
      }
    },
    ...mapActions({
      phoneLogin: 'account/phoneLogin'
    })
  },
  components: {
    BindPhone
  }
}
</script>

<style lang="scss" scoped>
  .phone{
    margin-top: calc(50px/2);
  }
  .pwd-login{
    text-align: center;
    color: #383838;
    font-size: 16px;
    margin-top: 50px;
  }
</style>
