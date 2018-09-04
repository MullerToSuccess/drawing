<template>
<div class='studentPanel'>
    <van-nav-bar
    title="学生列表"
    :left-text="toggleLeftName"
    :left-arrow = isHidden
    @click-left="goback"
    >
    <van-tabs type="card" slot="title">
        <van-tab title="学生"></van-tab>
        <van-tab title="小组"></van-tab>
    </van-tabs>
    <div slot="left"><van-icon v-if="isHidden" name="arrow-left" />{{ this.toggleLeftName }}</div>
    <van-icon name="search" slot="right"  @click="select"/>
    </van-nav-bar>
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
    
    <!-- <select id="sendSybol" v-model="sortType">
      <option  v-for="type  in sortType"  :value="type.id" >{{type.name}}</option>
    </select> -->

    <div class="studentItem" v-for="(item, index) in studentList" :key="index">
      <!-- <img :src='studentImg'><br> -->
      <div v-bind:class="{checkItem:true, isHidden:isHidden}"><input v-model="checkedNames" :value='item' type="checkbox" /></div>
      <div @click="checkThis()">
        <img src='./logo.png' style="width:40px;height:40px">   
      <br>     
    <van-tag mark type="primary">{{ item.weekScore.get}}</van-tag>
      <van-tag mark type="danger">{{ item.weekScore.lose}}</van-tag>
        <br>
        <span>{{ item.studentName }}</span>
      </div>
      
    </div>
    <div class="checkMore" :class="{isHidden: !isHidden}"><van-button size="large" @click="checkMore">多选</van-button></div>
    <div class="checkMore" :class="{isHidden: isHidden}"><van-button size="large" @click="dianping">点评( {{ this.checkedNames.length }} )</van-button></div>
    <comPop :isShow ='isPopShow' :checkedName="checkedNames"
    @cancelPop='hidePop'></comPop>
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
import { Card } from "vant";
import comPop from "./comPop.vue";
export default {
  data() {
    return {
      popContentShow: false,
      popContentShow2: false,
      chooseSort: "az",
      chooseFilter: 'default',
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
  computed: {
    isPopShow: function() {
      return this.popShow;
    }
  },
  methods: {
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
      this.popShow = true;
    },
    checkThis() {
      console.log("check this student");
      this.popShow = true;
    },
    popSort() {
      console.log(this.popContentShow2);
      if(this.popContentShow2) this.popContentShow2 = false;
      this.popContentShow = !this.popContentShow; //切换
    },
    popDate() {
      console.log(this.popContentShow);
      if(this.popContentShow) this.popContentShow = false;
      this.popContentShow2 = !this.popContentShow2; //切换
    },
    sortByType(type) {
      this.popContentShow = !this.popContentShow;
      this.chooseSort = type;
      //区分不同的type进行排序：
    },
    filterByType(type){
       this.popContentShow2 = !this.popContentShow2;
      this.chooseFilter = type;
    }
  },
  components: {
    comPop
  }
};
</script>
<style lang='scss' scoped>
.popParent {
  // height:100px;
  width: 100%;
  position: absolute;
}
.popContent, .popContent2 {
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
.popContentShow, .popContentShow2 {
  display: block;
}
.checkMore {
  width: 100%;
  bottom: 1px;
  position: absolute;
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
.studentItem {
  padding: 15px 0px;
  width: 25% !important;
  display: inline-block;
  text-align: center;
  /* margin-left: calc(2px/2); */
  background: #ffffff;
}
.van-nav-bar {
  background: rgba(50, 207, 162, 1);
  color: #ffffff;
}
.van-icon {
  color: #ffffff;
}
</style>

