<template>
<div>
  <div class="title-name">班级优学</div>
<van-collapse v-model="activeNames">
  <van-collapse-item title="小学-2018级" name="1">
    <!-- <van-panel title="标题" desc="描述信息" status="状态">
    </van-panel> -->
    <div v-for="(item, index) in classInfo" :key="index" @click="goComments()">
        <div class="tab-lists">
        <scroll class="tab-view">
            <div>
            <div class="tab">
                <div class="tab-content">
                <div class="tab-photo">
                    <!-- <img src='studentInfo.userPhoto' v-lazy="studentInfo.userPhoto" v-if="studentInfo.userPhoto"> -->
                    <img src='../userInfo/logo.png' v-if="item.classPhoto">
                    <span class="icon" v-else>{{item.className}}</span>
                </div>
                <div class="tab-text">
                    <div>
                    <span class="name">{{item.className}}</span><br>
                    <span class="homeworkTimes">{{item.totalStudent}}</span>个学生
                    </div>
                    <div class="checkTime">
                    <div class="checkFeedback">
                        <span class="name">班主任：{{item.teacherName}}</span>
                        <span>表扬：{{ item.weekSroce.get }}</span
                        <span>惩罚：{{ item.weekSroce.lose }}</span>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </scroll>
        </div>
    </div>
  </van-collapse-item>
  <van-collapse-item title="小学-2017级" name="2">
  </van-collapse-item>
</van-collapse>
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
import scroll from "../common/components/scroll";
import HeaderBar from "../_common/components/headerBar";
export default {
  data() {
    return {
      selectIndex: 0,
      selected: 0,
      tabs: Tabs,
      activeNames: ["1"],
      classInfo: [
        {
          classPhoto: "../userInfo/logo.png",
          //   userName: '乔尚',
          date: "2018-8-31",
          totalStudent: 100,
          className: "一班",
          weekSroce: {
            get: 1,
            lose: 1
          },
          teacherName: "乔尚"
        },
        {
          classPhoto: "../userInfo/logo.png",
          //   userName: '乔尚',
          date: "2018-8-31",
          totalStudent: 100,
          className: "2班",
          weekSroce: {
            get: 1,
            lose: 1
          },
          teacherName: "乔尚"
        },
        {
          classPhoto: "../userInfo/logo.png",
          //   userName: '乔尚',
          date: "2018-8-31",
          totalStudent: 100,
          className: "3班",
          weekSroce: {
            get: 1,
            lose: 1
          },
          teacherName: "乔尚"
        }
      ]
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
  computed: {},
  created() {},
  methods: {
    toggleTab(path, index) {
      this.selectIndex = index;
      this.$router.push({
        name: path
      });
    },
    goComments() {
      this.$router.push({
        name: "comStudents"
      });
    }
  },
  mounted: function() {},
  components: {
    scroll,
    HeaderBar
  }
};
</script>
<style  lang="scss" scoped>
@import "@/style/variable.scss";
.title-name{
    position: fixed;
    top: 0;
    z-index: 50;
    width: 100%;
    height: calc(100px/2);
    line-height: calc(100px/2);
    text-align: center;
    font-size: $header-title;
    color: $header-text-color;
    background-color: $header-background-color;
  }
.mint-header {
  height: 46px;
  background: rgba(50, 207, 162, 1);
  .mint-header-title {
    font-size: 4vw;
  }
}
.van-nav-bar {
  background: rgba(50, 207, 162, 1);
  color: #ffffff;
}
.panel-img {
  width: calc(90px / 2);
  height: calc(90px / 2);
}
.panel-left {
  width: 30%;
}
.panel-right {
  width: 60%;
}
.panel-left,
.panel-right {
  display: inline-block;
}
.tab-lists {
  margin-bottom: calc(20px / 2);
  .tab-view {
    height: 100%;
    overflow: hidden;
    .tab {
      padding: 0 calc(26px / 2);
      background: #fff;
      .tab-content {
        display: flex;
        justify-content: space-between;
        height: calc(130px / 2);
        .tab-photo {
          width: calc(86px / 2);
          height: calc(86px / 2);
          margin-top: calc(25px / 2);
          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
        .tab-text {
          width: 76%;
          margin-top: 10px;
          font-size: 14px;
          letter-spacing: calc(2px / 2);
          div {
            margin-bottom: 8px;
          }
          div:last-child {
            // margin-right: calc(70px/2);
          }
          .user,
          .course,
          .time {
            color: #000;
          }
          .mode {
            color: green;
          }
        }
      }
    }
  }
}
.tabs {
  display: flex;
  justify-content: center;
  height: calc(110px / 2);
  position: fixed;
  bottom: 0;
  padding-top: calc(5px / 2);
  border-top: 1px solid $color-line;
  background: #fafcfd;
  .tab {
    margin: 0 calc(94px / 2);
    .t-img {
      width: calc(66px / 2);
      height: calc(66px / 2);
      img {
        width: 100%;
        height: 100%;
      }
    }
    .t-text {
      text-align: center;
      margin-top: calc(5px / 2);
      font-size: $header-list-s;
      color: #776e6e;
    }
    .t-text-select {
      color: #eebb45;
    }
  }
}
.tab-text > div {
  width: 40%;
  display: inline-block;
}
</style>