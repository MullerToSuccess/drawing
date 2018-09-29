<template>
<mt-popup
  v-model="isShow" pop-transition="popup-fade">
  <div class="comment-content">
  <div class="comTitle">
    <span class="comment-tip" @click="goComment()" v-if="checkedName.length === 1">查看学生表现</span>
    点评 <span class="comName">{{ checkedName.length > 0 ? checkedName[0].studentName : '' }}</span>
    <div @click="close" class="comClose">X</div></div>
    <mt-navbar v-model="selected" :value="selected">
      <mt-tab-item id="1">表扬</mt-tab-item>
      <mt-tab-item id="2">警告</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1" class="comment-card-wrapper">
        <mt-cell v-for="(item, index) in commentType" :key="index"  @click="doComment" class="comment-card">
          <!-- <img src="../userInfo/logo.png"> -->
          <span>{{ item.name }}</span>
        </mt-cell>
      </mt-tab-container-item>
      <mt-tab-container-item id="2" class="comment-card-wrapper">
        <mt-cell v-for="(item, index) in commentType" :key="index"  @click="doComment" class="comment-card">
          <!-- <img src="../userInfo/logo.png"> -->
          <span>{{ item.name }}</span>
        </mt-cell>
      </mt-tab-container-item>
    </mt-tab-container>

<!-- <van-card v-for="(item, index) in commentType" :key="index"  @click="doComment"
    class="comment-card">
    <img src="../userInfo/logo.png"
    <div slot="footer">
        <span>{{ item.name }}</span>
    </div>
    </van-card> -->
</div>
</mt-popup>
</template>
<script>
// import
export default {
  data() {
    return {
      selected: 1,
      commentType: [
        {
          name: "德育"
        },
        {
          name: "智育"
        },
        {
          name: "体育"
        }
      ]
    };
  },
  props: ["isShow", "checkedName"],
  methods: {
    overlay() {
      this.$emit("cancelPop");
    },
    close() {
      this.$emit("cancelPop");
    },
    goComment() {
      //学生详细评价统计
      this.$router.push("/");
    },
    doComment() {}
  },
  created() {}
};
</script>
<style scoped>
.comName {
  /* color: #cccccc; */
  font-size: calc(16px);
}
.comClose {
  float: right;
  margin-right: calc(8px / 2);
}
.comTitle {
  margin-top: calc(2px);
  text-align: center;
}
.van-tab {
  display: inline-block;
}
.comment-card-wrapper{
  display: flex;
  margin-top: 5px
}
.comment-card {
  text-align: center;
  display: inline-block;
  width: 40% !important;
  background: #f9f4f4;
  border: 1px solid #f9f4f4;
  margin-left: 5px;
  height: 15vh;
  text-align: center
}
.comment-content {
  width: 300px;
  height: 400px;
}
.comment-tip {
  font-size: 2vw;
  float: left;
}
</style>

