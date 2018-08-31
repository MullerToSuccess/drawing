<template>
<div>
    <van-nav-bar
    title="我的"
    left-text="返回"
    left-arrow
    @click-left="goback"
    >
    <van-icon name="arrow-left" slot="left" />
    <van-icon name="search" slot="right" />
    </van-nav-bar>
    <van-card
  title="标题"
  desc="描述"  
  num="2"
  price="2.00"
  :thumb="imageURL"
>
  <div slot="footer">
    <van-button size="mini">按钮</van-button>
    <van-button size="mini">按钮</van-button>
  </div>
</van-card>
</div>
</template>
<script>
export default {
    data(){
        return{
            
        }
    },
    methods:{
        goback(){
            this.$router.go(-1)
        }
    }
}
</script>
<style scoped>
.van-nav-bar{
    background: rgba(50, 207, 162, 1);
    color: #ffffff;
}
.van-icon{
    color: #ffffff;
}
</style>

