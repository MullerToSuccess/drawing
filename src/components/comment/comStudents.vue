<template>
<div class='studentPanel'>
    <mt-header>
      <mt-button icon="back" slot="left" @click="goback">{{ toggleLeftName }}</mt-button>
      <mt-button icon="more" slot="right" @click="select"></mt-button>
    </mt-header>
    <div class="toggle-button-wrapper">
      <mt-button type="primary" size="small" :class="{active: toggleIndex === 0}" @click="toggle(0)">学生</mt-button>
      <mt-button type="primary" size="small" :class="{active: toggleIndex === 1}" @click="toggle(1)">小组</mt-button>
    </div>
    <popUp :filterTypes='filterTypes' :dateTypes='dateTypes' @cover='cover'></popUp>
    <v-touch
      v-on:swiperight="onSwipeRight"
      v-on:swipeleft="onSwipeLeft" ref="wrapper" class="student-list-wrapper" v-if="tabName === '学生'">
      <!-- <div ref="studentList" class="student-list-wrapper" v-if="tabName === '学生'"> -->
        <scroll class="student-list-wrapper" ref="listStudent">
          <div class="studentItem" v-for="(item, index) in studentList" :key="index" :ref="item.id">
            <div v-bind:class="{checkItem:true, isHidden:isHidden}"><input v-model="checkedNames" :value='item' type="checkbox" /></div>
            <div @click="checkThis(isMulti)">
              <img src='@/assets/_images/public/audio.jpg' style="width:40px;height:40px">   
            <br>     
            <mt-badge type="primary">{{ item.weekScore.get}}</mt-badge>
            <mt-badge type="error">{{ item.weekScore.lose}}</mt-badge>
              <br>
              <span>{{ item.studentName }}</span>
            </div>
          </div>
        </scroll>
    </v-touch>
    <!-- </div> -->
    <v-touch
      v-on:swiperight="onSwipeRight"
      v-on:swipeleft="onSwipeLeft"  class="group-list-wrapper" v-else>
    <!-- <div class="group-list-wrapper" v-else> -->
      <scroll class="group-list-wrapper" ref="listGroup">
      <div class="groupItem" v-for="(item, index) in groupList" :key="index" :ref="item.id">
        <div @click="checkThis()">
          <img src='@/assets/_images/public/audio.jpg' style="width:40px;height:40px">   
        <br>     
      <mt-badge type="primary">{{ item.weekScore.get}}</mt-badge>
        <mt-badge type="error">{{ item.weekScore.lose}}</mt-badge>
          <br>
          <span>{{ item.groupName }}</span>
        </div>
      </div>
      </scroll>
    <!-- </div> -->
    </v-touch>
    
  <tAlphabet :cities="cities" ></tAlphabet>
    <div class="checkMore" :class="{isHidden: !isHidden}">
      
      <div @click="checkMore">
        <span @click="cancelComment" v-if="haveComment" class="cancel-comment">
          撤销上一步
        </span>
        <span>多选</span>
      </div>
    </div>
    <div class="checkMore" :class="{isHidden: isHidden}">
      <div @click="dianping">点评( {{ this.checkedNames.length }} )</div>
      </div>
    <comPop :isShow ='isPopShow' :checkedName="checkedNames"
    @cancelPop='hidePop'></comPop>

    <mt-actionsheet
      :actions="actions"
      v-model="show">
    </mt-actionsheet>
    </div>
</template>
<script>
import comment from "./axios/index";
import scroll from "../common/components/scroll";
import eventBus from "@/model/eventBus";
import { cities, studentList, groupList } from "../common/js/const";
import { Card, Toast } from "vant";
import comPop from "./comPop.vue";
import tAlphabet from "./tAlphabet.vue";
import popUp from "../_common/components/popUp";
export default {
  data() {
    return {
      toggleIndex: 0,
      tabName: "学生",
      hasGroup: false,
      letter: "",
      isMulti: false,
      popContentShow: false,
      popContentShow2: false,
      chooseSort: "az",
      chooseFilter: "default",
      checkedNames: [],
      sortType: [{ name: "1", id: 1 }, { name: "2", id: 2 }],
      toggleLeftName: "",
      commentMore: false,
      isHidden: true,
      haveComment: true,
      studentImg: "@/assets/images/account/delete.png",
      popShow: false,
      cities: cities,
      studentList: studentList,
      groupList: groupList,
      show: false,
      actions: [
        {
          name: "查看班级表现"
        },
        {
          name: "重置分数"
        }
      ],
      filterTypes: [
        { name: "az", cname: "首字母" },
        { name: "total", cname: "总分" },
        { name: "good", cname: "表扬分数" },
        { name: "bad", cname: "警告分数" }
      ],
      dateTypes: [
        { name: "default", cname: "上次重置至今" },
        { name: "today", cname: "今日" },
        { name: "week", cname: "本周" },
        { name: "month", cname: "本月" }
      ]
    };
  },
  created() {
    // comment
    //   .getStudents()
    //   .then(r => {
    //     console.log(r);
    //   });
  },
  watch: {
    letter() {
      if (this.letter) {
        debugger;
        console.log(this.$refs.listStudent)
        this.$refs.listStudent.scrollToElement(this.$refs.listStudent, 300);
      }
    }
  },
  computed: {
    isPopShow: function() {
      return this.popShow;
    }
  },
  mounted() {
    eventBus.$on("change", letter => {
      debugger;
      this.letter = letter;
    });
  },
  methods: {
    onSwipeRight() {
      if (this.toggleIndex) {
        this.toggleIndex = 0;
        this.tabName = "学生";
      } else {
        console.log("left.....");
      }
    },
    onSwipeLeft() {
      if (!this.toggleIndex) {
        this.toggleIndex = 1;
        this.tabName = "小组";
      } else {
        console.log("right.....");
      }
    },
    cover(isCover) {
      console.log(this.$refs);
      // if (isCover) {
      //   this.$refs["studentList"].style.filter = "gray";
      //   this.$refs["studentList"].style.opacity = "0.2";
      // } else {
      //   this.$refs["studentList"].style.filter = "gray";
      //   this.$refs["studentList"].style.opacity = "1";
      // }
    },
    toggle(index) {
      this.toggleIndex = index;
      index === 0 ? (this.tabName = "学生") : (this.tabName = "小组");
      if (!this.hasGroup && this.tabName === "小组") {
        Toast({
          message: "班级还未分组，请先到班级管理中进行分组操作",
          position: "center",
          duration: 2000
        });
      }
    },
    goback() {
      if (!this.isHidden) {
        this.toggleLeftName = "";
        this.isHidden = !this.isHidden;
      } else {
        this.$router.go(-1);
      }
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
    hidePop() {
      this.popShow = false;
    },
    comment() {
      console.log(444);
    },
    checkMore() {
      this.isMulti = true;
      this.toggleLeftName = "取消";
      this.checkedNames = [];
      this.isHidden = !this.isHidden;
    },
    dianping() {
      if (this.checkedNames.length > 0) {
        this.popShow = true;
      } else {
        Toast.fail("请先勾选要点评的学生");
      }
    },
    checkThis() {
      console.log("check this student");
      if (this.isMulti) {
        return;
      }
      this.popShow = true;
    },
    popSort() {
      console.log(this.popContentShow2);
      if (this.popContentShow2) this.popContentShow2 = false;
      this.popContentShow = !this.popContentShow; //切换
    },
    popDate() {
      console.log(this.popContentShow);
      if (this.popContentShow) this.popContentShow = false;
      this.popContentShow2 = !this.popContentShow2; //切换
    },
    sortByType(type) {
      this.popContentShow = !this.popContentShow;
      this.chooseSort = type;
      //区分不同的type进行排序：
    },
    filterByType(type) {
      this.popContentShow2 = !this.popContentShow2;
      this.chooseFilter = type;
    },
    toggleTab(index, title) {
      // console.log(title)
      this.tabName = title;
    },
    cancelComment() {}
  },
  components: {
    comPop,
    tAlphabet,
    popUp,
    scroll
  }
};
</script>
<style lang='scss' scoped>
@import "@/style/vant-edit.scss";
.student-list-wrapper, .group-list-wrapper{
  overflow: hidden;
  height: 90vh;
  // top:36px;
  top: 0;
  bottom: 46px;
  div{
    z-index: 0
  }
}
.cancel-comment {
  position: fixed;
  left: 0;
}
.mint-header {
  height: 46px;
  background: rgba(50, 207, 162, 1);
}
.touchWrapper {
  background: #ed4e5e;
}
.popDiv {
  height: 35px;
  line-height: 35px;
}
.student-list-wrapper,
.group-list-wrapper {
  background: rgb(242, 242, 242);
  height: 90vh;
  overflow-y: auto;
  overflow-x: hidden;
}
.toggle-button-wrapper {
  position: fixed;
  text-align: center;
  left: 22%;
  font-size: 14px;
  border: 1px solid #ffffff;
  border-radius: 5px;
  top: 5px;
  button {
    // border-radius: 0 !important;
    width: 100px;
    height: 30px;
    color: #ffffff;
    background: rgba(50, 207, 162, 1);
  }
  .active {
    color: rgba(50, 207, 162, 1);
    background: #ffffff;
  }
}
.popParent {
  width: 100%;
  position: absolute;
}
.popContent,
.popContent2 {
  cursor: pointer;
  display: none;
  padding: calc(10px);
  text-align: center;
  width: 100%;
  background: #ffffff;
  position: absolute;
  left: 0px;
  top: 0px;
  z-index: 10000;
  // div:hover{
  //   color: red
  // }
}
.colorRed {
  color: red;
}
.sortTip,
.dateTip {
  width: calc(49%);
  display: inline-block;
  text-align: center;
  .van-icon {
    color: red;
  }
}
.popContentShow,
.popContentShow2 {
  display: block;
  div {
    padding: 5px;
  }
}
.checkMore {
  width: 100%;
  bottom: 1px;
  position: fixed;
  bottom: 0;
  display: flex;
  div {
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: #fff;
  }
}
.studentPanel {
  width: 100%;
  height: 100%;
  position: relative;
}
.checkItem {
  float: right;
  /* display: hidden */
}
.isHidden {
  display: none;
  // display: visible;
}
.studentItem,
.groupItem {
  padding: 15px 0px;
  width: 25% !important;
  display: inline-block;
  text-align: center;
  /* margin-left: calc(2px/2); */
  background: rgb(242, 242, 242);
}
.van-nav-bar {
  background: rgba(50, 207, 162, 1);
  color: #ffffff;
}
.van-icon {
  color: #ffffff;
}
.list {
  position: bsolute;
  overflow: hidden;
  top: 40px;
  left: 0;
  right: 0;
  bottom: 0;
  .title {
    line-height: 27px;
    padding-left: 10px;
    background: #eee;
    .button-list {
      padding: 5px 30px 5px 5px;
      overflow: hidden;
      .button-wrapper {
        float: left;
        width: 25%;
        .button {
          margin: 5px;
          padding: 5px;
          font-size: 12px;
          border: 1px solid #ccc;
          border-radius: 3px;
          text-align: center;
        }
      }
    }
  }
  .toast {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
    width: 50px;
    height: 50px;
    background: #ed4e5e;
    border-radius: 50%;
    text-align: center;
    transition: all 0.5s;
    .fade-enter {
      opacity: 0;
    }
    .fade-leave,
    .fade-enter-active {
      opacity: 1;
    }

    .fade-leave-active {
      opacity: 0;
    }

    .letter {
      line-height: 50px;
      font-size: 16px;
      font-weight: 700;
      color: #eee;
    }
  }
}
</style>

