<template>
  <div id="bing-phone">
    <div class="bindphonediv">
      <yx-field @blur="blur" :isInput="isInput" :onfocusBool="onfocusBool" :focus="focus" v-model.trim="phone" :value="phone" label="手机号" label-icon="phone" placeholder="请输入手机号" @click-clear="phone = ''"></yx-field>
      <div class="regular" v-show="regular">请输入正确的手机号！</div>
      <div class="sms-content">
        <yx-field v-model.trim="sms" :value="sms" label="验证码" label-icon="sms" placeholder="请输入验证码" @click-clear="sms = ''"></yx-field>
        <div @click="sendsms" class="sms" :class="{greenButton:!smsUseable}">{{content}}</div>
      </div>
    </div>
    <div class="login-btn" @click="bind">
      <div class="login-btn">{{btnText}}</div>
    </div>
  </div>
</template>
<script>
import YxField from 'common/components/yx-field'
import {mapGetters, mapMutations} from 'vuex'
import {Toast} from 'vant'
import user from '@/module/account/axios/user'
import stroage from '@/store/stroage.js'

export default {
  name: 'BindPhone',
  props: {
    btnText: {
      type: String,
      default: '验证手机号'
    },
    type: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      onfocusBool: true,
      title: '绑定手机号',
      validPhone: '',
      smsUseable: false,
      content: '发送验证码',
      timer: null,
      timeLen: 60,
      isSend: false,
      focus: false,
      phone: '',
      sms: '',
      regular: false,
      isInput: false
    }
  },
  computed: {
    ...mapGetters({
      editMsg: 'managerCommon/editMsg'
    })
  },
  created () {
    if (this.$route.name === 'mEditPhone' || this.$route.name === 'tEditPhone') {
      this.phone = this.$route.params.phone
      this.isInput = true
    }
    if (this.$route.name === 'phoneBinding') {
      this.phone = stroage['persistent'].get('phone')
    }
  },
  methods: {
    ...mapMutations({
      setPhone: 'account/setPhone'
    }),
    blur () {
    },
    sendsms () {
      if (this.isSend && !this.timer) {
        let bool = this.$route.name !== 'phoneBinding'
        this.captcha(bool)
      } else {
        return false
      }
    },
    captcha (bool) {
      user.sendSmsVerifycode({
        mobile: this.phone,
        fetchNum: this.type === 'forget' ? 2 : 1,
        needBind: this.$route.params.editPhone ? !bool : bool
      }).then(succ => {
        this.smsUseable = true
        Toast('验证码发送成功')
        this.timer = setInterval(() => {
          if (this.timeLen < 0) {
            this.clear_interval(this.timer)
            this.content = '发送验证码'
            this.timeLen = 60
            this.smsUseable = false
            return false
          }
          this.content = `${this.timeLen}s`
          this.timeLen--
        }, 1000)
      }).catch((err) => {
        if (err.mobileBind === false) {
          Toast(`当前手机未绑定，请先使用账号登录！`)
        } else {
          Toast(err.msg)
        }
        this._initTimer()
      })
    },
    clear_interval () {
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
    },
    bind () {
      if (this.sms === '') {
        Toast(`验证码不能为空`)
        return
      }
      if (this.isSend) {
        if (this.$route.name === 'mEditPhone' || this.$route.name === 'tEditPhone') {
          user.checkSmsVerifycode({
            smsVerifycode: this.sms,
            mobile: this.phone
          }).then(r => {
            this.$router.push({
              name: this.$route.name === 'mEditPhone' ? 'mResizeBind' : 'tResizeBind',
              params: {
                editPhone: true
              }
            })
          })
        } else {
          this.$emit('next', true, this.phone, this.sms)
        }
      }
    },
    _initTimer () {
      this.clear_interval(this.timer)
      this.content = '发送验证码'
      this.smsUseable = false
      this.timeLen = 60
      this.sms = ''
    }
  },
  watch: {
    phone (newVal) {
      const str = newVal
      const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57]|19[89])[0-9]{8}$/
      if (reg.test(str)) {
        this.isSend = true
        this.regular = false
      } else {
        this.isSend = false
        this.focus = true
        this.regular = true
      }
    }
  },
  components: {
    YxField
  }
}
</script>
<style lang="scss" scoped>
 @import "@/style/variable.scss";
  .bindphonediv
  {
    padding: 0 calc(76px/2);
  }
  .mobilephonefield{
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 91%;
  }

  .textfield{
    width: 70%;
  }

  .greenButton{
    background: $green-primary-color !important;
  }

  .van-button--disabled
  {
    color: #ffffff;
  }
  .textfield.van-hairline::after {
    border:none;
  }
  .regular{
    width: 100%;
    text-align: right;
    font-size: calc(30px/2);
    color: red;
  }
  .sms-content{
    position: relative;
    .sms{
      position: absolute;
      top: calc(35px/2);
      right: 0;
      width: calc(170px/2);
      height: calc(60px/2);
      line-height: calc(60px/2);
      text-align: center;
      background: grey;
      color: #fff;
      font-size: calc(28px/2);
      border-radius: calc(9px/2);
    }
  }
  .login-btn{
    width: calc(600px/2);
    height: calc(90px/2);
    margin: calc(105px/2) auto 0;
    background: #fee101;
    text-align: center;
    line-height: calc(90px/2);
    border-radius: calc(40px/2);
    font-size: calc(36px/2);
  }
</style>
