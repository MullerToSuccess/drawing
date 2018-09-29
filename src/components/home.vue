<template>
  <div id="chome" class="page">
    <home :tabs="tabs"></home>
  </div>
</template>
<script>
import Home from './_common/components/home'
import {Tabs} from './_common/js/const'
export default {
  name: 'commentHome',
  data () {
    return {
      tabs: Tabs
    }
  },
  created () {
  },
  components: {
    Home
  }
}
</script>

<style scoped>

</style>