<template>
  <div id="app">
    <v-touch
      @swiperight="onSwipeRight"
      tag="div">
      <transition
        @before-enter="beforeEnter"
        @after-enter="afterEnter"
        @before-leave="beforeLeave"
        @after-leave="afterLeave"
        >
        <!-- <keep-alive :include="aliveCom">
          <router-view></router-view>
        </keep-alive> -->
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </transition>
    </v-touch>
  </div>
</template>
<script>
import { Dialog, Toast } from "vant";
// import { mapGetters, mapActions } from "vuex";
export default {
  name: "App",
  data: function() {
    return {
      back_key_times: 0,
      y1: 0
    };
  },
  computed: {
    // ...mapGetters({
    //   aliveCom: "alivePages/getAliveCom"
    // }),
    // 滑动动画模式
    // rigeman() {
    //   let result = this.$store.state.account.transitionType;
    //   // document.getElementById('app').style.pointerEvents = 'none'
    //   if (result === "back") {
    //     return "slideInLeft";
    //   } else if (result === "forward") {
    //     return "slideInRight";
    //   } else {
    //     return "rigeman";
    //   }
    // }
  },
  created() {
    this.touch = {};
  },
  watch: {
    // $route() {
    //   if (this.$route.meta.keepAlive) {
    //     this.setAlive(this.$route.name);
    //   }
    //   if (this.$route.name === "login") {
    //     this.clearAlive();
    //   }
    // }
  },
  mounted() {
    // 退出启动屏
    window.TeacherUtil && window.TeacherUtil.removeTopViewFromJS();
    let self = this;
    // if (window.platform === "android") {
    //   this.$store.commit("account/setIsAndroid", true);
    // }
    function onReady() {
      document.addEventListener(
        "keydown",
        function(e) {
          if (e.keyCode === 27) {
            window.appPlug.onBackKey();
          }
        },
        false
      );
      window.appPlug.onBackKey = function() {
        if (
          window.location.hash === "#/teacher/home" ||
          window.location.hash === "#/manager/home"
        ) {
          self.back_key_times++;
          setTimeout(function () {
            self.back_key_times--;
          }, 600);
          if (self.back_key_times === 1) {
            Toast({ position: "bottom", message: "再按一次退出应用!" });
          }
          if (self.back_key_times === 2) {
            window.appPlug && window.appPlug.quit();
          }
        } else {
          history.go(-1);
        }
      };
    }
    if (appPlug) {
      appPlug.onReady(onReady);
    }

    // 小屏手机（iphone 5s等）点击文本框不触发键盘的暂定解决方法
    document.addEventListener(
      "click",
      function(e) {
        if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
          e.target.focus();
        }
      },
      false
    );
  },
  methods: {
    // ...mapActions({
    //   setAlive: "alivePages/setAlive",
    //   clearAlive: "alivePages/clearAlive"
    // }),
    onSwipeRight() {
      const fade = [
        "home",
        "my",
        "login",
        "comStudents" //学生点评
      ];
      let UrlArr = this.$route.path.split("/");
      let LastRoute = UrlArr[UrlArr.length - 1];
      if (fade.indexOf(LastRoute) >= 0) return false;
      this.$router.back(-1);
    },
    beforeEnter: el => {
      document.getElementById("app").style.pointerEvents = "none";
    },
    afterEnter: el => {
      document.getElementById("app").style.pointerEvents = "auto";
    },
    beforeLeave: el => {
      document.getElementById("app").style.pointerEvents = "none";
    },
    afterLeave: el => {
      document.getElementById("app").style.pointerEvents = "auto";
    }
  },
  components: {
    Dialog,
    Toast
  }
};
</script>

<style lang="scss">
#app {
  user-select: none;
  position: relative;
}
.slideInLeft-enter {
  transform: translate3d(-20%, 0, 0);
}
.slideInLeft-enter-active {
  animation: slideInLeft 0.5s;
}
.slideInLeft-leave-to {
  transform: translate3d(100%, 0, 0);
}
.slideInLeft-leave-active {
  animation: slideInLeftLeave 0.5s;
}
.slideInRight-enter {
  transform: translate3d(100%, 0, 0);
}
.slideInRight-enter-active {
  animation: slideInRight 0.5s;
}
@keyframes slideInLeft {
  from {
    transform: translate3d(-20%, 0, 0);
  }
  to {
    transform: translate3d(0, 0, 0);
  }
}
@keyframes slideInRight {
  from {
    transform: translate3d(100%, 0, 0);
  }
  to {
    transform: translate3d(0, 0, 0);
  }
}
@keyframes slideInLeftLeave {
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(100%, 0, 0);
  }
}
.page {
  background-color: white;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  min-height: 100vh;
  z-index: 0;
}
.page-right-save {
  margin-right: calc(20px / 2);
  font-size: calc(34px / 2);
}
::-webkit-search-cancel-button {
  display: none;
  opacity: 0;
}
// 题干样式
.image {
  background: url("./assets/images/public/mediaico_s.png") no-repeat scroll -36px
    0 rgba(0, 0, 0, 0);
  height: calc(18px / 2);
  vertical-align: 1px;
  width: calc(18px / 2);
  margin: 0 calc(2px / 2);
  display: inline-block;
}
.video {
  background: url("./assets/images/public/mediaico_s.png") no-repeat scroll -18px
    0 rgba(0, 0, 0, 0);
  height: calc(18px / 2);
  vertical-align: 1px;
  width: calc(18px / 2);
  margin: 0 calc(2px / 2);
  display: inline-block;
}
.audio {
  background: url("./assets/images/public/mediaico_s.png") no-repeat scroll 0 0
    rgba(0, 0, 0, 0);
  height: calc(18px / 2);
  vertical-align: 1px;
  width: calc(18px / 2);
  margin: 0 calc(2px / 2);
  display: inline-block;
}
.pos {
  display: inline-block;
  width: calc(30px / 2);
  margin: 0 calc(5px / 2);
  border-bottom: 1px solid #3e3e3e;
}
</style>
