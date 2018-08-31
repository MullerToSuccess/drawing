<template>
<div>
    <van-nav-bar
    title="学生列表"
    left-text="返回"
    left-arrow
    @click-left="goback"
    >
    <van-tabs type="card" slot="title">
        <van-tab title="学生"></van-tab>
        <van-tab title="小组"></van-tab>
    </van-tabs>
    <van-icon name="arrow-left" slot="left" />
    <van-icon name="search" slot="right"  @click="select"/>
    </van-nav-bar>
    <van-card v-for="(item, index) in studentList" :key="index" 
    class="comment-card" @click="comment">
    <img src="../userInfo/logo.png">
    <div slot="footer">
        <van-button type='primary' size="mini"  @click="comStudent">表扬 {{ item.weekScore.get}}</van-button>
        <van-button type='danger' size="mini" @click="comStudent">惩罚 {{ item.weekScore.lose}}</van-button>
        <br>
        <span>{{ item.studentName }}</span>
    </div>
    </van-card>
    <comPop :isShow='isPopShow' @cancelPop='hidePop'></comPop>
    <van-actionsheet
    v-model="show"
    :actions="actions"
    @select="onSelect"
    cancel-text="取消"
    @cancel="onCancel"
    />
</div>
</template>
<script>
import comPop from "./comPop.vue";
export default {
  data() {
    return {
      popShow:false,
      studentList: [
        {
          studentName: "乔尚",
          weekScore: {
            get: 1,
            lose: 1
          }
        },
        {
          studentName: "乔尚",
          weekScore: {
            get: 1,
            lose: 1
          }
        },
        {
          studentName: "乔尚",
          weekScore: {
            get: 1,
            lose: 1
          }
        },
        {
          studentName: "乔尚",
          weekScore: {
            get: 1,
            lose: 1
          }
        },
        {
          studentName: "乔尚",
          weekScore: {
            get: 1,
            lose: 1
          }
        },
        {
          studentName: "乔尚",
          weekScore: {
            get: 1,
            lose: 1
          }
        },
        {
          studentName: "乔尚",
          weekScore: {
            get: 1,
            lose: 1
          }
        },
        {
          studentName: "乔尚",
          weekScore: {
            get: 1,
            lose: 1
          }
        },
        {
          studentName: "乔尚",
          weekScore: {
            get: 1,
            lose: 1
          }
        }
      ],
      show: false,
      actions: [
        {
          name: "查看班级表现"
        },
        {
          name: "重置分数"
        }
      ]
    };
  },
  computed:{
      isPopShow: function(){
          return this.popShow
      }
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    select() {
      this.show = true;
    },
    onSelect(item) {
      // 点击选项时默认不会关闭菜单，可以手动关闭
      this.show = false;
      //   Toast(item.name);
    },
    onCancel() {},
    comStudent() {
        this.popShow = true;
    },
    hidePop(){
        this.popShow = false;
    },
    comment(){
        console.log(444);
    }
  },
  components:{
      comPop
  }
};
</script>
<style scoped>
.van-nav-bar {
  background: rgba(50, 207, 162, 1);
  color: #ffffff;
}
.van-icon {
  color: #ffffff;
}
.comment-card {
  text-align: center;
  display: inline-block;
  width: 20% !important;
  background: #f9f4f4;
  border: 1px solid #f9f4f4;
  margin-left: 2px;
}
/* .van-tabs{
    color: rgba(50, 207, 162, 1);

}
.van-tabs__nav--card {
    margin: 0 15px;
    border-radius: 2px;
    box-sizing: border-box;
    border: 1px solid #fff;
    border-radius: 7px;
    height: 30px;
    width: 30%;
} */
/* .van-tabs__nav--card .van-tab.van-tab--active {
    color: rgba(50, 207, 162, 1) !important;
} */
</style>

