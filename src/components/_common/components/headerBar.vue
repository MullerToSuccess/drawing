<template>
  <div id="header-bar">
    <div class="van-hairline--bottom">
      <div class="back-btn" @click="back">
        <i class="icon-back"></i>
      </div>
      <div class="title-name">
        <slot name="title-name">
        </slot>
      </div>
      <div class="right-area">
        <slot name="right-area"></slot>
      </div>
    </div>
    <div class="null-place"></div>
  </div>
</template>
<script>
export default {
  name: 'HeaderBar',
  props: {
    newBack: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {}
  },
  methods: {
    back () {
      this.newBack ? this.$emit('back') : this.$router.back(-1)
    }
  }
}
</script>
<style scoped lang="scss">
 @import "@/style/variable.scss";
  .van-hairline--bottom{
    position: fixed;
    top: 0;
    z-index: 50;
    width: 100%;
    height: calc(100px/2);
    line-height: calc(100px/2);
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    background-color: $color-background-y;
    .back-btn{
      display: inline-block;
      font-size: calc(38px/2);
      width: calc(90px/2); //如果修改此值，则.right-area的width也要同步修改一样的值，不然会造成title-name不居中
      color: $color-text;
      .icon-back{
        display: inline-block;
        width: calc(36px/2);
        height: calc(36px/2);
        margin-left:calc(25px/2);
        background: url('../../../assets/_images/public/back.png') no-repeat 0 0;
        background-size: 100% 100%;
        vertical-align: text-bottom;
      }
      span{
        display: inline-block;
      }
    }
    .title-name{
      font-size: $header-title;
      max-width: 60%;
      // align-items: center;
      div {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    .right-area{
      position: relative;
      display: inline-block;
      font-size: calc(38px/2);
      width: calc(90px/2); //此值应和.back-btn的width保持一致，不然会造成title-name不居中
      text-align: right;
    }
  }
  .null-place{
    height: 50px;
  }
</style>
