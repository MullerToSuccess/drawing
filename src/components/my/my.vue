<template>
<div class="my-wrapper">
  <div class="user-info-wrapper">
    <div class="user-image">
        <img src="@/assets/_images/public/audio.jpg">
      <span>{{ userName }}</span>
    </div>
  </div>
  <div class="item-wrapper">
    <mt-cell title="意见反馈" icon="more" is-link to="/my/feedback">
      <img slot="icon" src="@/assets/_images/my/feedback.png" width="24" height="24">
    </mt-cell>
    <mt-cell title="设置" icon="more" is-link to="/my/set">
      <img slot="icon" src="@/assets/_images/my/set.png" width="24" height="24">
    </mt-cell>
    <mt-cell title="关于我们" icon="more" is-link to="/my/about">
      <img slot="icon" src="@/assets/_images/my/about.png" width="24" height="24">
    </mt-cell>
  </div>
 <mt-tabbar v-model="selected" fixed>
  <mt-tab-item v-for="(item, index) in tabs" :key="index" @click="toggleTab(item.path, index)" :id="index">
    <img slot="icon" :src="selectIndex===index?item.imgSelect:item.imgNormal">
    <span :class="{'t-text-select':selectIndex===index}">{{ item.name }}</span>
  </mt-tab-item>
</mt-tabbar>
</div>
</template>
<script>
import { Tabs } from "../_common/js/const";
export default {
  data() {
    return {
      tabs: Tabs,
      selectIndex: 0,
      selected: 0,
      userName: "乔尚"
    };
  },
  watch: {
    selected: function(id) {
      this.selectIndex = id;
      switch (id) {
        case 0:
          this.$router.push({
            name: "studentList"
          });
          break;
        case 1:
          this.$router.push({
            name: "count"
          });
          break;
        case 2:
          this.$router.push({
            name: "my"
          });
          break;
      }
    }
  },
  methods: {
    toggleTab(path, index) {
      this.selectIndex = index;
      this.$router.push({
        name: path
      });
    },
    goback() {
      this.$router.push({
        name: "studentList"
      });
    }
  }
};
</script>
<style lang='scss' scoped>
@import "@/style/vant-edit.scss";
.my-wrapper {
  height: 90vh;
  background: rgb(242, 242, 242);
  overflow-x: hidden;
  overflow-y: auto;
  font-size: 4vw;
  .user-info-wrapper {
    line-height: 40vw;
    // text-align: center;
    width: 100%;
    height: 40vw;
    background: rgba(50, 207, 162, 1);
    color: #ffffff;
    img {
      height: 10vh;
      width: 10vh;
    }
  }
}
.user-image {
  background-image: url("../../assets/_images/my/bg.png");
  background-repeat: no-repeat;
  background-size: 100% auto;
  padding-left: 30px 
}
.van-icon {
  color: #ffffff;
}
</style>

