<template>
<div>
    <van-nav-bar
    title="班级优学"
    />
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
  <ul class="tabs">
      <li class="tab" v-for="(item, index) in tabs" :key="index" @click="toggleTab(item.path, index)">
        <div class="t-img">
          <img ref="imgRef" v-if="index === 1" alt="">
          <img ref="imgRef" v-else-if  alt="">
        </div>
        <div class="t-text" :class="{'t-text-select':selectIndex===index}">{{item.name}}</div>
      </li>
    </ul>
</van-collapse>
</div>
</template>

<script>
export default {
  data() {
    return {
      selectIndex: 0,
      tabs: [
        {
          path: "comStudents",
          imgSelect: "",
          imgNormal: "",
          name: "点评"
        },
        {
          path: "count",
          imgSelect: "",
          imgNormal: "",
          name: "统计"
        },
        {
          path: "my",
          imgSelect: "",
          imgNormal: "",
          name: "我的"
        }
      ],
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
      ],
      
    };
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
    }, 
    
  },
  mounted: function() {},
  components: {}
};
</script>
<style  lang="scss" scoped>
@import "./variable.scss";
.van-nav-bar{
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
</style>