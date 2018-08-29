<template>
  <div>
Author..........
  </div>
</template> 

<script>
  export default {
   data() {
     return {
      token: '',
     };
   },
   computed: {
    
   },
   created(){
       console.log(555);
       window.location.href = 'https://open.weixin.qq.com/connect/qrconnect?appid=wxc83321efa603dddc&redirect_uri=https%3a%2f%2fwww.cnblogs.com%2fjilu%2fp%2f6123447.html&response_type=code&scope=snsapi_login#wechat_redirect';
   },
   methods: {
   }
  }
</script>
<style scoped>

</style>