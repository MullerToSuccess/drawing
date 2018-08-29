<template>
<div class="infoForm">
  <div class="infoForm_content" v-if="infoForm = 'base'">
      base
  </div>
  <div class="infoForm_content" v-else>
      other
  </div>
</div>
</template>

<script>
  export default {
   data() {
     return {
     };
   },
   computed: {
    
   },
   created() {
   },
   methods: {
    
     
   },
   props:['infoItem'],
   mounted: function () {}
  }
</script>
<style scoped>
    .infoForm, .infoForm_content{
        margin-top: 50px
    }
    .infoForm_content{
        height: 200px;
        background: #cccccc
    }
</style>