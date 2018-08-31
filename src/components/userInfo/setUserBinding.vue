<template>
<div class="userInfo" :class="{ 'hide': isShowing2}">
    <el-card class="box-card">
  <div class="text item">
    <i class="el-icon-mobile-phone"></i>
    <span>密码{{ this.accountSafe.password ? '已设置' : '未设置'}}</span>
    <el-button size="mini" type="primary" @click="saveUserInfo">去设置</el-button> 
  </div>
  <div class="text item">
    <i class="el-icon-phone"></i>
    <span>手机号{{ this.accountSafe.isPhoneBind ? '已绑定' : '未绑定'}}</span>
    <el-button size="mini" type="primary" @click="saveUserInfo">{{ this.accountSafe.isPhoneBind ? '更换绑定' : '去绑定'}}</el-button> 
  </div>
  <div class="text item">
    <i class="el-icon-message"></i>
    <span>邮箱{{ this.accountSafe.isEmailBind ? '已绑定' : '未绑定'}}</span>
    <el-button size="mini" type="primary" @click="saveUserInfo">{{ this.accountSafe.isEmailBind ? '更换绑定' : '去绑定'}}</el-button> 
  </div>
  <div class="text item">
    <i class="el-icon-news"></i>
    <span>微信{{ this.accountSafe.isWechatBind ? '已绑定' : '未绑定'}}</span>
    <el-button size="mini" type="primary" @click="dialogVisible = true">{{ this.accountSafe.isWechatBind ? '更换绑定' : '去绑定'}}</el-button> 
  </div>
</el-card>
<el-dialog
  title="微信登录"
  :visible.sync="dialogVisible"
  width="30%">
  <img src="./logo.png">
</el-dialog>
</div>
</template>

<script>
export default {
  data() {
    return {
      token: "",
      userName: "用户名1",
      shcoolName: "学校1",
      dialogVisible: false
    };
  },
  computed: {},
  props: ["isShowing2", "accountSafe"],
  created() {},
  methods: {
    saveUserInfo() {
      //   this.$emit("goSetUserBind");
    },
    // bindWechat() {
    //   this.$alert(
    //     '<img src="../logo.png" style="width:60px;height:60px">',
    //     "绑定微信",
    //     {
    //       dangerouslyUseHTMLString: true
    //     }
    //   );
    // },
    //  handleClose(done) {
    //     this.$confirm('确认关闭？')
    //       .then(_ => {
    //         done();
    //       })
    //       .catch(_ => {});
    //   }
  },
  mounted() {},
  components: {}
};
</script>
<style scoped>
.userInfo {
  margin-top: 100px;
}
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 480px;
}
.hide {
  display: none;
}
.el-button {
  float: right;
}
</style>