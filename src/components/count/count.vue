<template>
<div>
    <!-- <van-nav-bar
    title="点评统计"
    left-text="返回"
    left-arrow
    @click-left="goback"
    >
    <van-icon name="arrow-left" slot="left" />
    <van-icon name="search" slot="right" />
    </van-nav-bar>
     -->
     <header-bar>
        <div slot="title-name">点评统计</div>
      </header-bar>
</div>
</template>
<script>
import HeaderBar from '../_common/components/headerBar'
export default {
  data() {
    return {};
  },
  methods: {
  },
  components: {
    HeaderBar
  }
};
</script>
<style scoped>
.van-nav-bar {
  background: rgba(50, 207, 162, 1);
  color: #ffffff;
}
.van-icon {
  color: #ffffff;
}
</style>

