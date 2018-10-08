<template>
  <transition name="slide" style="z-index: 1">
    <div id="phone-login">
      <header-bar>
        <div slot="title-name">绑定手机</div>
      </header-bar>
      <div class="noBind">{{prompt}}</div>
      <bind-phone class="phone" btnText="绑定手机" @next="next"></bind-phone>
    </div>
  </transition>
</template>

<script>
import BindPhone from "common/components/bindPhone";
import HeaderBar from "common/components/headerBar";
import { mapGetters, mapActions } from "vuex";
import user from "@/module/account/axios/user";
import { Toast } from "vant";
import { Maccount } from "../js/mixins";

export default {
  name: "phoneLogin",
  mixins: [Maccount],
  data() {
    return {
      prompt: ""
    };
  },
  computed: {
    ...mapGetters({
      phone: "account/phone",
      sms: "account/sms"
    })
  },
  created() {
    if (this.$route.params.editPhone) {
      this.prompt = "请输入新手机号";
    } else {
      this.prompt = "当前账户还未绑定手机号！";
    }
  },
  methods: {
    ...mapActions({
      getUserInfo: "my/getUserInfo"
    }),
    next(is, phone, sms) {
      // 绑定接口
      if (is) {
        user
          .bindPhone({
            smsVerifycode: sms,
            mobile: phone
          })
          .then(
            succ => {
              this.$store.state.account.mobileBind = 1;
              localStorage.setItem(
                "mobileBind",
                this.$store.state.account.mobileBind
              );
              this.$store.state.account.phone = phone;
              localStorage.setItem("phone", phone);
              this.afterLogin();
              this.getUserInfo().then(r => {
                this.$router.push("/manager/my");
              });
            },
            () => {}
          );
      } else {
        Toast(`此时无法进行绑定！`);
      }
    }
  },
  components: {
    BindPhone,
    HeaderBar
  }
};
</script>

<style lang="scss" scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s;
}

.slide-enter,
.slide-leave-to {
  transform: translate3d(100%, 0, 0);
}

#phone-login {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #fff;
  .phone {
    margin-top: calc(50px / 2);
  }
  .noBind {
    margin-top: calc(100px / 2);
    padding: 0 calc(76px / 2);
    font-size: calc(34px / 2);
  }
  .pwd-login {
    text-align: center;
    color: #383838;
    font-size: calc(36px / 2);
    margin-top: calc(125px / 2);
  }
}
</style>
