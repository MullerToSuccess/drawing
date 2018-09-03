<template>
  <div id="yx-field">
    <div class="label-text" v-if="label">{{label}}</div>
    <div class="input-box">
      <img class="login-input-icon" :src="getIcon()"/>
      <input ref="input" class="login-input" :class="{'sms':sms}" :readonly="isInput" :type="type" :value="value" :placeholder="placeholder" @input="$emit('input', $event.target.value)" @focus="on_focus" @blur="on_blur">
      <img class="clear-icon" src="@/assets/images/account/delete.png" alt="" v-show="value.length > 0 && !isInput" @click="$emit('click-clear')">
    </div>
    <hr :color="hrColor" style="border-bottom: 1px">
  </div>
</template>
<script>
export default {
  name: 'yx-field',
  props: {
    value: {
      type: [String, Number]
    },
    placeholder: {
      type: String
    },
    type: {
      type: String,
      default: 'text'
    },
    label: {
      type: String
    },
    labelIcon: {
      type: String
    },
    clearIcon: {
      type: Boolean
    },
    focus: {
      type: Boolean,
      default: false
    },
    onfocusBool: {
      type: Boolean,
      default: false
    },
    isInput: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      hrColor: '#e5e5e5',
      sms: false
    }
  },
  mounted () {
    if (this.labelIcon === 'sms') this.sms = true
    if (this.onfocusBool) this.onfocus()
  },
  methods: {
    on_focus () {
      this.$emit('focus')
      this.hrColor = '#b6bec6'
    },
    on_blur () {
      this.$emit('blur')
      this.hrColor = '#e5e5e5'
    },
    onfocus () {
      this.$refs.input.focus()
    },
    getIcon () {
      let url = ''
      if (this.labelIcon === 'user') {
        url = require('@/assets/_images/account/icon-user.png')
      } else if (this.labelIcon === 'password') {
        url = require('@/assets/_images/account/icon-pwd.png')
      } else if (this.labelIcon === 'phone') {
        url = require('@/assets/_images/account/phone.png')
      } else {
        url = require('@/assets/_images/account/sms.png')
      }
      return url
    }
  },
  watch: {
    focus (newVal) {
      if (newVal) this.onfocus()
    }
  }
}
</script>
<style lang="scss" scoped>
 @import "@/style/variable.scss";
//  @import "./variable.scss";
  #yx-field{
    margin: 10px 0;
    .label-text{
      font-size: calc(30px/2);
      color: $color-text-d;
      height: calc(30px/2);
      line-height: calc(30px/2);
      letter-spacing: calc(2px/2);
      margin-bottom: calc(18px/2);
    }
    .login-input-icon{
      display: inline-block;
      width: calc(42px/2);
      height: calc(42px/2);
      margin-right: calc(8px/2);
      vertical-align: text-bottom;
    }
    .input-box{
      width:100%;
      height: calc(50px/2);
      line-height:calc(50px/2);
      position: relative;
      /* .label-icon{
         width:calc(50px/2);
         text-align:center;
       }*/
      input{
        width:calc(100% - 30px);
        height: calc(40px/2);
        line-height: calc(40px/2);
        color:#222525;
        font-size: calc(30px/2);
        overflow-x:auto;
        outline: none;
        border: none;
      }
      .sms{
        width: calc(100% - 115px);
      }
      .clear-icon{
        position:absolute;
        right: calc(0px/2);
        width: calc(30px/2);
        top: 50%;
        margin-top: calc(-10px/2);
      }
    }
  }
</style>
