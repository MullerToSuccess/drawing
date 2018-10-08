<template>
    <div class="popDiv">
      <div class="sortTip" @click="popSort">排序: 按{{ this.chooseSort }} <van-icon name="success" /></div>
      <div class="dateTip" @click="popDate">筛选：{{ this.chooseFilter }} <van-icon name="success" /></div>
      <div class="popParent">
        <div class="popContent" :class="{popContentShow: this.popContentShow}">
            <div v-for="(item, index) in filterTypes" :key="index" @click="sortByType(item.cname)" 
            :class="{colorRed: chooseSort == item.cname}">按{{ item.cname }}排序</div>
        </div>
        <div class="popContent2" :class="{popContentShow2: this.popContentShow2}">
            <div v-for="(item, index) in dateTypes" :key="index" @click="filterByType(item.cname)" 
            :class="{colorRed: chooseFilter == item.cname}">{{ item.cname }}</div>
        </div>
      </div>
      <!-- <div class="v-modal" ref="modal" style="z-index:-1000"></div> -->
    </div>
</template>
<script>
import vant from "vant";
export default {
  name: "popUp",
  props: {
    filterTypes: {
      type: Array
    },
    dateTypes: {
      type: Array
    }
  },
  data() {
    return {
      chooseSort: "首字母",
      chooseFilter: "上次重置至今",
      popContentShow: false,
      popContentShow2: false
    };
  },
  computed: {},
  created() {},
  activated() {},
  mounted() {},
  watch: {},
  methods: {
    popSort() {
      this.$emit("cover", !this.popContentShow);
    //   this.$refs['modal'].style['z-index'] = 2018;
      if (this.popContentShow2) {
        this.popContentShow2 = false;
      }
      this.popContentShow = !this.popContentShow; //切换
    },
    popDate() {
      this.$emit("cover", !this.popContentShow2);
      if (this.popContentShow) {
        this.popContentShow = false;
      }
      //   if (this.popContentShow) this.popContentShow = false;
      this.popContentShow2 = !this.popContentShow2; //切换
    },
    sortByType(type) {
        this.$emit("cover", false);
      this.popContentShow = !this.popContentShow;
      this.chooseSort = type;
      //区分不同的type进行排序：
    },
    filterByType(type) {
        this.$emit("cover", false);
      this.popContentShow2 = !this.popContentShow2;
      this.chooseFilter = type;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/style/variable.scss";
.popDiv {
  height: 35px;
  line-height: 35px;
  font-size: 4vw;
}
.popParent {
  width: 100%;
  position: absolute;
}
.popContent,
.popContent2 {
  border-top: 1px solid #bebebe;
  cursor: pointer;
  display: none;
  padding: calc(10px);
  text-align: center;
  width: 100%;
  background: #ffffff;
  position: absolute;
  left: 0px;
  top: 0px;
  z-index: 10000;
}
.popContentShow,
.popContentShow2 {
  display: block;
  div {
    padding: 5px;
  }
}
.sortTip,
.dateTip {
  width: calc(49%);
  display: inline-block;
  text-align: center;
  .van-icon {
    color: red;
  }
}
.colorRed {
  color: $green-primary-color;
}
</style>

