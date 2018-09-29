<template>
    <div class="feedback-wrapper">
        <!-- <mt-header title="意见反馈">
            <router-link to="/" slot="left">
                <mt-button icon="back" @click="goback()"></mt-button>
            </router-link>
            <mt-button slot="right" @click="saveFeedback()">提交反馈</mt-button>
        </mt-header> -->
        <header-bar>
            <div slot="title-name">意见反馈</div>
            <div slot="right-area" class="right">
                <span @click="saveFeedback()">提交反馈</span>
            </div>
        </header-bar>
        <div class="feedback-content">
            <textarea placeholder="请简要描述您遇到的具体问题" maxlength="200"></textarea>
        </div>
        <div class="feedback-image-title">
            <span>上传问题截图 ({{ haveChecked }}/8)</span>
        </div>
        <div class="feedback-image">
                <!-- <span>上传问题截图</span> -->
            <div class="check-image-container">
                <div class="check-image" @click="clickPhoto(item, 'before')">
                    <div class="check-image-div">
                        <img class="check-image-div-img" src="@/assets/_images/teacher/take-photo.png">
                    </div>
                    <div><span>点击上传</span></div>
                </div>
                <div class="clear-both"></div>
            </div>
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
    },
    clickPhoto() {},
    saveFeedback() {
      //提交反馈
    }
  },
  components:{
      HeaderBar
  }
};
</script>
<style lang="scss" scoped>
@import '@/style/variable.scss';
.feedback-wrapper {
  height: 90vh;
  overflow-y: auto;
  overflow-x: hidden;
}
.right{
    position: absolute;
    width: calc(200px/2);
    display: flex;
    left: -30px;
    top: 0;
    span{
      font-size: $header-list-s;
      color: $header-text-color;
    }
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
  font-size: 3vw;
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
</style>
