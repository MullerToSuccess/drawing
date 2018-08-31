<template>
<div class="infoForm">
  <div class="infoForm_content" v-if="infoItem == 'base'">
      <div class="content-title"><el-tag>我的资料</el-tag><span class="setInfo" @click="goSet('userInfo')">修改资料</span></div>
      <div class="content-info">
          <p>姓名: {{ userInfo.name }}</p>
          <p>性别: {{ userInfo.sex }}</p>
          <p>联系电话: {{ userInfo.phone }}</p>
          <p>邮箱: {{ userInfo.email }}</p>
      </div>
  </div>
  <div class="infoForm_content" v-else>
      <div class="content-title"><el-tag>账号安全</el-tag><span class="setInfo" @click="goSet('userBinding')">修改设置</span></div>
      <div class="content-info">
          <p>密码: {{ accountSafe.password }}</p>
          <p>手机绑定: {{ accountSafe.isPhoneBind ? '已绑定' : '未绑定' }}</p>
          <p>邮箱绑定: {{ accountSafe.isEmailBind ? '已绑定' : '未绑定' }}</p>
          <p :class="{'redColor': !accountSafe.isWechatBind}">微信绑定: {{ accountSafe.isWechatBind ? '已绑定' : '未绑定' }}</p>
      </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {},
  created() {},
  methods: {
    goSet(type) {
      console.log(333);
      if (type === "userInfo") {
        this.$emit("goSetUserInfo");
        //   this.$router.push({path:'/userInfo/setInfo'})
      } else {
        this.$emit("goSetUserBind");
        //   this.$router.push({path:'/userInfo/setBinding'})
      }
    }
  },
  props: ["infoItem", "accountSafe", "userInfo"],
  mounted: function() {}
};
</script>
<style scoped>
.setInfo:hover{
    cursor: pointer;
}
.redColor {
  color: red;
}
.content-title {
  vertical-align: middle;
  line-height: 40px;
  background: #edf6fd;
}
.setInfo {
  float: right;
  padding-right: 10px;
  color: #0099e8;
}
.infoForm,
.infoForm_content {
  margin-top: 50px;
  border: 1px solid #edf6fd;
  height: 200px;
  background: #ffffff;
}
.content-info {
  padding-left: 20px;
}
.infoForm_content .content-title {
  height: 40px;
}
.infoForm_content .content-info {
  height: 160px;
}
.content-info :nth-child(odd) {
  background: #ffffff;
}
.content-info :nth-child(even) {
  background: #f2f2f2;
}
</style>