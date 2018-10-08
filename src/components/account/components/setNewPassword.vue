<template>
  <div id="set-new-password" class="page" style="z-index: 2">
    <header-bar>
      <div slot="title-name">找回密码</div>
    </header-bar>
    <div class="set-new-pws">
      <div class="title">请设置新密码</div>
      <yx-field v-model.trim="pwd" :value="pwd" label="新密码" label-icon="password" placeholder="输入密码" @click-clear="pwd = ''"></yx-field>
      <yx-field v-model.trim="pwdN" :value="pwdN" label="确认密码" label-icon="password" placeholder="输入密码" @click-clear="pwdN = ''"></yx-field>
    </div>
    <div class="login-btn" @click="sure">
      <div class="login-btn">确定</div>
    </div>
  </div>
</template>

<script>
import YxField from 'common/components/yx-field'
import HeaderBar from 'common/components/headerBar'
import {Toast} from 'vant'
import {mapGetters} from 'vuex'
import {SHA256} from '@/utils/sha256'
import User from '../axios/user'
export default {
  name: 'setNewPassword',
  data () {
    return {
      pwd: '',
      pwdN: ''
    }
  },
  computed: {
    ...mapGetters({
      phone: 'account/phone',
      sms: 'account/sms'
    })
  },
  methods: {
    sure () {
      if (this.pwd === this.pwdN && this.pwd !== '') {
        this.post()
      } else {
        this.pwd = ''
        this.pwdN = ''
        Toast('两次输入密码不一样！')
      }
    },
    post () {
      User.setPassword({
				validatedCode:this.$route.query.sms,
        newPassword: SHA256(this.pwd)
//      mobile: this.$route.query.phone,
//      smsVerifycode: this.$route.query.sms,
//      newPassword: SHA256(this.pwd)
      }).then(succ => {
        Toast({position: 'bottom', message: '密码设置成功'})
        this.$store.commit('account/setPassword', '')
        localStorage.clear()
        this.$router.push({
          path: '/login'
        })
      }).catch(err => {
        Toast({position: 'bottom', message: err.msg})
      })
    }
  },
  components: {
    YxField,
    HeaderBar
  }
}
</script>

<style lang="scss" scoped>
  .set-new-pws{
    margin-top: calc(50px/2);
    padding: 0 calc(50px/2);
    .title{
      margin-bottom: calc(35px/2);
      font-size: calc(34px/2);
    }
  }
  .login-btn{
    width: calc(600px/2);
    height: calc(90px/2);
    margin: 105px auto 0;
    background: #fee101;
    text-align: center;
    line-height: calc(90px/2);
    border-radius: calc(40px/2);
    font-size: calc(36px/2);
  }
</style>
