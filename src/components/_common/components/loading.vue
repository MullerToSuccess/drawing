<template>
  <div class="mf-loading-container">
    <img src="./loading.gif">
  </div>
</template>
<script type="text/ecmascript-6">
const COMPONENT_NAME = 'loading'

export default {
  name: COMPONENT_NAME
}
</script>
<style lang="scss" scoped>
  .mf-loading-container{
    img{
      width: calc(40px/2);
      height: calc(40px/2);
      display: block;
    }
  }
</style>
