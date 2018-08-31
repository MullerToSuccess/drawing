<template>
<div class="userInfo">
    <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item><a href="/userInfo">个人资料</a></el-breadcrumb-item>
    </el-breadcrumb>
  <div class="userInfo_content">
    <el-container>
    <el-aside width="200px">
        <div class="content_left">
            <img src="./logo.png" style="width:60px;height:60px">
            <p>{{ userInfo.name  }}</p>
            <p>{{ userInfo.shcoolName }}</p>
        </div>
    </el-aside>
    <el-container>
        <el-header><el-tag class="infoTitle">个人资料</el-tag>
        </el-header>
        <el-main>
            <div class="info-title" :class="{'hide': !isShowing || !isShowing2}"><img src="./logo.png" style="width:60px;height:60px">
            <p  :class="{'hide': !isShowing || !isShowing2}">{{ userInfo.name  }}</p></div>
            <el-button size="small" type="primary" :class="{'hide': isShowing && isShowing2}" @click="backSet">返回</el-button>
            <setUserInfo @goSetUserBind="goSet('userBinding')" :userInfo='userInfo' :isShowing='isShowing'></setUserInfo>
            <setUserBinding :accountSafe='accountSafe' :isShowing2='isShowing2'></setUserBinding>
            <infoForm infoItem='base' :userInfo='userInfo' @goSetUserInfo="goSet('userInfo')" :class="{'hide': !isShowing || !isShowing2}"></infoForm>
            <infoForm infoItem='other' :accountSafe='accountSafe' @goSetUserBind="goSet('userBinding')" :class="{'hide': !isShowing || !isShowing2}"></infoForm>
        </el-main>
    </el-container>
    </el-container>
  </div>
</div>
</template>

<script>
import infoForm from "../common/infoForm.vue";
import setUserInfo from "./setUserInfo.vue";
import setUserBinding from "./setUserBinding.vue";
export default {
  data() {
    return {
      isShowing: true,
      isShowing2: true,
      token: "",
      // userName: "用户名1",
      // shcoolName: "学校1",
      userInfo: {
        name:'乔尚',
        sex: '男',
        phone: '1820036555',
        email: '4054661646@qq.com',
        shcoolName:'成都'
      },
      accountSafe: {
        password:'******',
        isPhoneBind: true,
        isEmailBind: true,
        isWechatBind: false
      }
    };
  },
  computed: {},
  created() {},
  methods: {
    backSet() {
      this.isShowing ? this.isShowing = this.isShowing : this.isShowing = !this.isShowing;
      this.isShowing2 ? this.isShowing2 = this.isShowing2 : this.isShowing2 = !this.isShowing2;
    },
    goSet(type) {
      if (type === "userInfo") {
        this.isShowing = !this.isShowing;
      } else {
        this.isShowing = true;
        this.isShowing2 = !this.isShowing2;
      }
    }
  },
  mounted: function() {},
  components: {
    infoForm,
    setUserInfo,
    setUserBinding
  }
};
</script>
<style scoped>
.infoTitle{
  float: left;
  padding-right: 10px;
  color: #0099e8;
}
/* .userInfo_content{
  border: 1px solid #cccccc
} */
.show {
  display: block;
}
.hide {
  display: none;
}
.info-title {
  text-align: center;
}
.userInfo {
  background: #f2f2f2;
}
/* .userInfo,
.userInfo_content {
  margin-top: 100px;
} */
.el-header,
.el-footer {
  background-color: #f2f2f2;
  color: #333;
  text-align: center;
  line-height: 60px;
  height: 40px;
}

.el-aside {
  background-color: #ffffff;
  color: #333;
  text-align: center;
  /* line-height: 200px; */
  /* height: 880px; */
}

.el-main {
  background-color: #ffffff;
  color: #333;
  /* text-align: center; */
  /* line-height: 160px; */
  height: 825px;
}

body > .el-container {
  margin-bottom: 40px;
}
/*   
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  } */
</style>