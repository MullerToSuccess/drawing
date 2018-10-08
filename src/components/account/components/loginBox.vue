<template>
  <div>
    <div class="password-login" v-show="toggleFlag">
      <yx-field @focus="onfocus" @blur="onblur" v-model.trim="username" label="账号/手机号" label-icon="user" placeholder="请输入登录账号" @click-clear="username = ''"></yx-field>
      <yx-field @focus="onfocus" @blur="onblur" v-model.trim="password" type="password" label="密码" label-icon="password" placeholder="请输入密码" @click-clear="password = ''"></yx-field>
    </div>
    <div class="login-btn" @click="login">
      <div class="login-btn">登录</div>
    </div>
    <div class="phone-login">
      <router-link :to="{path:'/login/phoneLogin',query:{redirect:$route.query.redirect | ''}}" tag="span">手机验证码登录</router-link>
    </div>
    <div class="forget-pwd">
      <router-link :to="{path:'/login/forgetPassword'}" tag="span">忘记密码</router-link>
    </div>
  </div>
</template>

<script>
import YxField from 'common/components/yx-field'
import {Toast} from 'vant'
import {mapGetters, mapActions} from 'vuex'

export default {
  name: 'loginBox',
  data () {
    return {
      toggleName: ['用户密码登录', '手机快速登陆'],
      toggleFlag: true
    }
  },
  computed: {
    username: {
      get () {
        return this.$store.state.account.username
      },
      set (val) {
        this.$store.commit('account/setUsername', val)
      }
    },
    password: {
      get () {
        return this.$store.state.account.password
      },
      set (val) {
        this.$store.commit('account/setPassword', val)
      }
    },
    ...mapGetters({
      mobileBind: 'account/mobileBind'
    })
  },
  methods: {
    onfocus () {
      // this.$emit('onfocus')
      if (this.$store.state.account.isAndroid) {
        this.$emit('onfocus')
      }
    },
    onblur () {
      // this.$emit('onblur')
      if (this.$store.state.account.isAndroid) {
        this.$emit('onblur')
      }
    },
    login () {
      if (this.username === '' || this.password === '') {
        Toast({position: 'bottom', message: '账号和密码不能为空'})
        return
      }
      this.doLogin().then(r => {
        this.$emit('afterLogin')
      }, j => {
      })
    },
    ...mapActions({
      doLogin: 'account/doLogin'
    })
  },
  components: {
    YxField
  }
}
</script>

<style lang="scss" scoped>
  .password-login{
    padding: 0 38px;
  }
  .login-btn{
    width: 300px;
    height: 45px;
    margin: 52.5px auto 0;
    background: #fee101;
    letter-spacing: 4px;
    text-align: center;
    line-height: 45px;
    border-radius: 20px;
    font-size: 18px;
  }
  .phone-login,.forget-pwd{
    text-align: center;
    color: #383838;
    font-size: 16px;
  }
  .phone-login{
    margin-top: 31px;
  }
  .forget-pwd{
    margin-top: 30px;
  }
</style>
