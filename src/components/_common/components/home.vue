<template>
  <div id="home">
    <router-view></router-view>
    <mt-tabbar v-model="selected" fixed>
  <mt-tab-item v-for="(item, index) in tabs" :key="index"  :id="index">
    <img slot="icon" :src="selectIndex===index?item.imgSelect:item.imgNormal">
    <span :class="{'t-text-select':selectIndex===index}">{{ item.name }}</span>
  </mt-tab-item>
</mt-tabbar>
  </div>
</template>

<script>
export default {
  name: "home",
  props: {
    tabs: {
      type: Array
    }
  },
  data() {
    return {
      selected: 0,
      selectIndex: 0
    };
  },
  computed: {
  },
  created() {},
  activated() {},
  mounted() {},
  watch:{
    selected: function(id) {
      this.selectIndex = id;
      switch (id) {
        case 0:
          this.$router.push({
            name: 'studentList'
          });
          break;
        case 1:
          this.$router.push({
            name: 'count'
          });
          break;
        case 2:
          this.$router.push({
            name: 'my'
          });
          break;
      }
    }
  },
  methods: {
    toggleTab(path, index) {
      this.selectIndex = index;
      let isHaveMsg = false;
      for (let key in this.msg) {
        if (this.msg[key] !== 0) isHaveMsg = true;
      }
      if (!isHaveMsg) this.setMsg(false);
      this.$router.push({
        name: path
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/style/variable.scss";
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
#home {
  overflow: auto;
  height: 100%;
}
</style>
