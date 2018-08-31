<template>

<van-popup v-model="isShow" @click-overlay='overlay'>
<div class="comment-content">
    <van-tabs v-model="active">
  <van-tab title='表扬'></van-tab>
  <van-tab title='警告'></van-tab>
  <!-- <van-icon name="close" /> -->
</van-tabs>
<van-card v-for="(item, index) in commentType" :key="index" 
    class="comment-card">
    <img src="../userInfo/logo.png"
    <div slot="footer">
        <span>{{ item.name }}</span>
    </div>
    </van-card>
</div>
</van-popup>
<!-- <van-dialog
  v-model="isShow"
  show-cancel-button
  :before-close="beforeClose"
>
   
</van-dialog> -->
</template>
<script>
export default {
  data() {
    return {
      active: 2,
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
  //   computed:{
  //       isShow
  //   },
  props: ["isShow"],
  methods: {
    overlay() {
      this.$emit("cancelPop");
    }
    // beforeClose(action, done) {
    //   // this.isShow = false;
    //   this.$emit("cancelPop");
    //   if (action === "confirm") {
    //     setTimeout(done, 1000);
    //   } else {
    //     done(false);
    //   }
    // }
  },
  created() {}
};
</script>
<style scoped>
.van-tab {
    display: inline-block;
}
.comment-card {
  text-align: center;
  display: inline-block;
  width: 10% !important;
  background: #f9f4f4;
  border: 1px solid #f9f4f4;
  margin-left: 2px;
}
.comment-content {
  width: 300px;
  height: 400px;
}
</style>

