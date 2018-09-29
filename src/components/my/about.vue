<template>
    <div class="feedback-wrapper">
        <!-- <mt-header title="关于我们">
            <router-link to="/" slot="left">
                <mt-button icon="back" @click="goback()"></mt-button>
            </router-link>
        </mt-header> -->
        <header-bar>
        <div slot="title-name">关于我们</div>
      </header-bar>
        <div class="logo-wrapper">
            <div class="logo-image">
                <div class="logo">
                    <img src="@/assets/logo.png">
                </div>
                <div class="name">优学优评</div>
                <div class="version">V1.0.0</div>
            </div>
        </div>
        <mt-cell title="微信公众号" icon="more" is-link to="/my/feedback" value="优学派智慧课堂">
            <img slot="icon" src="@/assets/logo.png" width="24" height="24">
        </mt-cell>
        <div class="copyright">
            深圳市优学天下教育发展股份有限公司C版权所有
        </div>
    </div>
</template>
<script>
import HeaderBar from "../_common/components/headerBar";
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
    }
  },
  components:{
      HeaderBar
  }
};
</script>
<style lang="scss" scoped>
.feedback-wrapper {
  height: 90vh;
  overflow-y: auto;
  overflow-x: hidden;
  font-size: 4vw;
}
.mint-header {
  height: 46px;
  background: rgba(50, 207, 162, 1);
  .mint-header-title {
    font-size: 4vw !important;
  }
}
.copyright {
  width: 100%;
  bottom: 10px;
  position: fixed;
  font-size: 3vw;
  text-align: center;
}
.logo-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 30vh;
  text-align: center;
  width: 100%;
  height: 30vh;
  background: #ffffff;
  color: #000000;
  .logo-image {
    height: 30vh;
    div {
      display: block;
      width: 100%;
    }
    .logo {
      height: 5vh;
    }
    // display: flex;
    img {
      height: 10vh;
      width: 10vh;
    }
    .version,
    .name {
      height: 5vh;
      color: #bebebe;
    }
  }
}
</style>
