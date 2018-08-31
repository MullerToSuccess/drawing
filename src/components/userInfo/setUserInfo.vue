<template>
<div class="userInfo" :class="{ 'hide': isShowing}">
    <el-form  label-width="80px" :model="userInfo" label-position="right">
  <el-form-item label="姓名">
    <el-input v-model="userInfo.name" ></el-input>
  </el-form-item>
  <el-form-item label="性别">
    <el-radio v-model="userInfo.sex" label="男">男</el-radio>
    <el-radio v-model="userInfo.sex" label="女">女</el-radio>
    <!-- <el-input v-model="userInfo.sex"></el-input> -->
  </el-form-item>
  <el-form-item label="手机号码">
    <el-input v-model="userInfo.phone" :disabled="true"></el-input>
    <el-button size="mini" type="primary" @click="saveUserInfo">去设置</el-button>    
  </el-form-item>
  <el-form-item label="邮箱">
    <el-input v-model="userInfo.email" :disabled="true"></el-input>
    <el-button size="mini" type="primary" @click="saveUserInfo">去设置</el-button>    
  </el-form-item>
</el-form><el-button type="primary" @click="saveUserInfo">保存</el-button>
</div>
</template>

<script>
export default {
  data() {
    return {

    };
  },
  props:['isShowing', 'userInfo'],
  computed: {},
  created() {
    console.log(this.isShowing);
  },
  methods: {
    saveUserInfo(){
      this.$emit("goSetUserBind");
    }
  },
  mounted() {
    console.log(this.isShowing);
  },
  components: {}
};
</script>
<style scoped>

.el-input{
  width: 200px;
}
.hide{
  display: none;
}
.info-title {
  text-align: center;
}
.userInfo {
  background: #f2f2f2;
  /* text-align: center */
}
.userInfo,
.userInfo_content {
  margin-top: 100px;
}
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
  height: 660px;
}

.el-main {
  background-color: #ffffff;
  color: #333;
  /* text-align: center; */
  /* line-height: 160px; */
  height: 600px;
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