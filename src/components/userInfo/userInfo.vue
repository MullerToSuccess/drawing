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
            <!-- <img > -->
            <p>{{ userName  }}</p>
            <p>{{ shcoolName }}</p>
        </div>
    </el-aside>
    <el-container>
        <el-header>个人资料</el-header>
        <el-main>
            <infoForm :infoItem='base'></infoForm>
            <infoForm :infoItem='other'></infoForm>
        </el-main>
    </el-container>
    </el-container>
  </div>
</div>
</template>

<script>
import infoForm from '../common/infoForm.vue'

  export default {
   data() {
     return {
      token: '',
      userName: '用户名1',
      shcoolName: '学校1',
     };
   },
   computed: {
    
   },
   created() {
   },
   methods: {
    
     
   },
   mounted: function () {},
   components:{
       infoForm
   }
  }
</script>
<style scoped>
    .userInfo, .userInfo_content{
        margin-top: 100px
    }
    .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
    height: 40px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
    height: 620px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
    height: 560px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>