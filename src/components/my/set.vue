<template>
    <div class="feedback-wrapper">
        <header-bar>
            <div slot="title-name">设置</div>
        </header-bar>
        <mt-cell title="检查更新" icon="more" is-link to="/my/feedback">
            <img slot="icon" src="@/assets/_images/my/new.png" width="24" height="24">
        </mt-cell>
        <div class="logout" @click="logout">
            退出登录
        </div>
    </div>
</template>
<script>
import HeaderBar from "../_common/components/headerBar";
import { Toast } from 'mint-ui';
export default {
  data() {
    return {
      haveChecked: 0
    };
  },
  mounted() {},
  methods: {
    goback() {
      this.$router.go(-1);
    },
    logout() {}
  },
  components:{
      HeaderBar
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      console.log(vm);
      if (from.name === "home") {
        vm.haveNewVersion = false;
        Toast({ position: "bottom", message: "不是android!" }); 
        //登录后存入用户信息 是否是android
        if (vm.$store.state.account.isAndroid) {
          let param = [vm.shell_api, vm.updateInfo];
          window.appPlug.checkVersion(
            param,
            succ => {
              if (succ.hasNew === true) {
                vm.haveNewVersion = true;
              }
            },
            fail => {
              Toast(`${fail}`);
              Toast({ position: "bottom", message: "获取最新版本信息失败!" });
            }
          );
          window.appPlug.getCacheSize(
            succ => {
              vm.$route.meta.cache = succ;
              vm.cache = succ;
            },
            fail => {
              Toast({ position: "bottom", message: "获取缓存大小失败!" });
            }
          );
        } else {
          Toast({ position: "bottom", message: "不是android!" });
        }
      } else {
        if (vm.$store.state.account.isAndroid) {
          vm.cache = vm.$route.meta.cache;
        }
      }
    });
  }
};
</script>
<style lang="scss" scoped>
.feedback-wrapper {
  height: 90vh;
  overflow-y: auto;
  overflow-x: hidden;
  background: #f2f2f2;
}
.mint-header {
  height: 46px;
  background: rgba(50, 207, 162, 1);
  .mint-header-title {
    font-size: 4vw !important;
  }
}
.feedback-content {
  text-align: center;
  margin-top: 10px;
  textarea {
    width: 90%;
    height: 25vh;
    border-radius: 10px;
  }
}
.feedback-image,
.feedback-image-title {
  padding: 10px;
}
.check-image {
  background-color: #f5f5f7;
  width: 70px;
  height: 70px;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 15px 20px 0;
  float: left;
  position: relative;
  background: #bebebe;
}
.check-image-div-img {
  width: 100%;
  border-radius: calc(10px / 2);
}
.logout {
  width: 100%;
  height: 30px;
  line-height: 30px;
  bottom: 10px;
  position: fixed;
  font-size: 3vw;
  text-align: center;
  color: red;
}
</style>
