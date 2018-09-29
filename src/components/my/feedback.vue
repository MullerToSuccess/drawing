<template>
    <div class="feedback-wrapper">
        <mt-header title="意见反馈">
            <router-link to="/" slot="left">
                <mt-button icon="back" @click="goback()"></mt-button>
            </router-link>
            <mt-button slot="right" @click="saveFeedback()">提交反馈</mt-button>
        </mt-header>
        <div class="feedback-content">
            <textarea placeholder="请简要描述您遇到的具体问题" maxlength="200"></textarea>
            <div class="feedback-image">
                <!-- <span>上传问题截图</span> -->

            </div>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {
    goback() {
      this.$router.go(-1);
    },
    saveFeedback(){
        //提交反馈
    }
  }
};
</script>
<style lang="scss" scoped>
.feedback-wrapper {
  height: 90vh;
  overflow-y: auto;
  overflow-x: hidden;
}
.mint-header {
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
    border-radius: 10px
  }
}
</style>
