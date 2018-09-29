<template>
<div class='studentPanel'>
    <!-- <van-nav-bar
    title="学生列表"
    :left-text="toggleLeftName"
    :left-arrow = isHidden
    @click-left="goback"
    >
    <van-tabs type="card" slot="title" @change="toggleTab">
        <van-tab title="学生" ></van-tab>
        <van-tab title="小组" ></van-tab>
    </van-tabs>
    <div slot="left"><van-icon v-if="isHidden" name="arrow-left" />{{ this.toggleLeftName }}</div>
    <van-icon name="search" slot="right"  @click="select"/>
    </van-nav-bar> -->

    <mt-header>
      <mt-button icon="back" slot="left" @click="goback">{{ toggleLeftName }}</mt-button>
      <mt-button icon="more" slot="right" @click="select"></mt-button>
      <!-- <mt-tab-container v-model="active">
      <mt-tab-container-item id="tab-container1" slot="">
        </mt-tab-container-item>
      </mt-tab-container> -->
    </mt-header>
    <div class="toggle-button-wrapper">
      <mt-button type="primary" size="small" :class="{active: toggleIndex === 0}" @click="toggle(0)">学生</mt-button>
      <mt-button type="primary" size="small" :class="{active: toggleIndex === 1}" @click="toggle(1)">小组</mt-button>
    </div>
    <div class="popDiv">
      <div class="sortTip" @click="popSort">排序: {{ this.chooseSort }} <van-icon name="success" /></div>
      <div class="dateTip" @click="popDate">筛选：{{ this.chooseFilter }} <van-icon name="success" /></div>
      <div class="popParent">
        <div class="popContent" :class="{popContentShow: this.popContentShow}">
          <div @click="sortByType('az')" :class="{ colorRed: chooseSort === 'az' }">按首字母排序</div>
          <div @click="sortByType('total')" :class="{ colorRed: chooseSort === 'total' }">按总分排序</div>
          <div @click="sortByType('good')" :class="{ colorRed: chooseSort === 'good' }">按表扬分数排序</div>
          <div @click="sortByType('bad')" :class="{ colorRed: chooseSort === 'bad' }">按警告分数排序</div>
        </div>
        <div class="popContent2" :class="{popContentShow2: this.popContentShow2}">
          <div @click="filterByType('default')" :class="{ colorRed: chooseFilter === 'default' }">默认：上次重置至今</div>
          <div @click="filterByType('today')" :class="{ colorRed: chooseFilter === 'today' }">今日</div>
          <div @click="filterByType('week')" :class="{ colorRed: chooseFilter === 'week' }">本周</div>
          <div @click="filterByType('month')" :class="{ colorRed: chooseFilter === 'month' }">本月</div>
        </div>
      </div>
    </div>
    <div class="student-list-wrapper" v-if="tabName === '学生'">
      <div class="studentItem" v-for="(item, index) in studentList">
        <div v-bind:class="{checkItem:true, isHidden:isHidden}"><input v-model="checkedNames" :value='item' type="checkbox" /></div>
        <div @click="checkThis()">
          <img src='@/assets/_images/public/audio.jpg' style="width:40px;height:40px">   
        <br>     
        <mt-badge type="primary">{{ item.weekScore.get}}</mt-badge>
        <mt-badge type="error">{{ item.weekScore.lose}}</mt-badge>
          <br>
          <span>{{ item.studentName }}</span>
        </div>
      </div>
    </div>
    <div class="group-list-wrapper" v-else>
      <div class="groupItem" v-for="(item, index) in groupList">
        <div @click="checkThis()">
          <img src='@/assets/_images/public/audio.jpg' style="width:40px;height:40px">   
        <br>     
      <mt-badge type="primary">{{ item.weekScore.get}}</mt-badge>
        <mt-badge type="error">{{ item.weekScore.lose}}</mt-badge>
          <br>
          <span>{{ item.groupName }}</span>
        </div>
      </div>
    </div>
  <!-- <tAlphabet :cities="cities"></tAlphabet> -->
    <div class="checkMore" :class="{isHidden: !isHidden}"><van-button size="large" @click="checkMore">多选</van-button></div>
    <div class="checkMore" :class="{isHidden: isHidden}">
      <van-button size="large" @click="dianping">点评( {{ this.checkedNames.length }} )</van-button>
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
import Bscroll from "better-scroll";
import eventBus from "@/model/eventBus";
import { Card, Toast } from "vant";
import comPop from "./comPop.vue";
import tAlphabet from "./tAlphabet.vue";
export default {
  data() {
    return {
      toggleIndex: 0,
      tabName: "学生",
      hasGroup: false,
      letter: "",
      popContentShow: false,
      popContentShow2: false,
      chooseSort: "az",
      chooseFilter: "default",
      checkedNames: [],
      sortType: [{ name: "1", id: 1 }, { name: "2", id: 2 }],
      toggleLeftName: "",
      commentMore: false,
      isHidden: true,
      studentImg: "@/assets/images/account/delete.png",
      popShow: false,
      studentList: [
        {
          id: 1,
          studentName: "ddd",
          weekScore: {
            get: 1,
            lose: 1
          }
        },
        {
          id: 2,
          studentName: "乔尚",
          weekScore: {
            get: 1,
            lose: 1
          }
        },
        {
          id: 3,
          studentName: "xxx",
          weekScore: {
            get: 1,
            lose: 1
          }
        },
        {
          id: 4,
          studentName: "乔尚",
          weekScore: {
            get: 1,
            lose: 1
          }
        },
        {
          id: 5,
          studentName: "乔尚",
          weekScore: {
            get: 1,
            lose: 1
          }
        },
        {
          id: 6,
          studentName: "乔尚",
          weekScore: {
            get: 1,
            lose: 1
          }
        },
        {
          id: 7,
          studentName: "乔尚",
          weekScore: {
            get: 1,
            lose: 1
          }
        },
        {
          id: 8,
          studentName: "乔尚",
          weekScore: {
            get: 1,
            lose: 1
          }
        },
        {
          id: 9,
          studentName: "乔尚",
          weekScore: {
            get: 1,
            lose: 1
          }
        }
      ],
      groupList: [
        {
          id: 1,
          groupName: "ddd",
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
  watch: {
    letter() {
      if (this.letter) {
        debugger;
        const element = this.$refs[this.letter][0];
        this.scroll.scrollToElement(element, 300);
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
    this.$nextTick(() => {
      this.scroll = new Bscroll(this.$refs.wrapper, {
        click: true
      });
    });
  },
  methods: {
    toggle(index) {
      this.toggleIndex = index;
      index === 0 ? (this.tabName = "学生") : (this.tabName = "小组");
      if (!this.hasGroup && this.tabName === '小组') {
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
    }
  },
  components: {
    comPop,
    tAlphabet
  }
};
</script>
<style lang='scss' scoped>
@import "@/style/vant-edit.scss";
.mint-header {
  height: 46px;
  background: rgba(50, 207, 162, 1);
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
  /* display: visible; */
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

