<template>
  <div class="alphabet">
    <ul>
      <li class="item" 
        v-for="item in letters" 
        :key="item"
        :ref="item"
        @click="handleLetterClick"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
      >{{item}}</li>
    </ul>
  </div>
</template>
<script>
import eventBus from '@/model/eventBus'
export default {
  name: 'tAlphabet', 
  props: {
    cities: Object
  },
  data() {
    return {
      touchStatus: false
    }
  },
  computed: {
    letters() {
      var letters = []
      for(let key in this.cities) {
        letters.push(key)
      }
      return letters
    }
  },
  updated() {
    this.startY = this.$refs['A'][0].offsetTop
  },
  methods: {
    handleLetterClick(e) {
      debugger
      console.log(111)
      console.log(this.$refs);
      eventBus.$emit('change',e.target.innerText)
    },
    handleTouchStart() {
      this.touchStatus = true
    },
    handleTouchMove(e) {
      if(this.touchStatus) {
        //函数节流
        if(this.timer) {
          clearTimeout(this.timer)
        }
        this.timer = setTimeout(() => {
          const startY = this.$refs['A'][0].offsetTop
          const touchY = e.touches[0].clientY - 40
          const index = Math.floor((touchY - this.startY)/20)
          if(index >= 0 && index < this.letters.length) {
            console.log(this.letters[index])
            eventBus.$emit('change', this.letters[index])
          }
        }, 16);
      }
    },
    handleTouchEnd() {
      this.touchStatus = false
    }
  }
}
</script>
<style lang="scss" scoped>
.alphabet{
  display:flex;
  justify-content:center;
  align-items:center;
  position:absolute;
  top:81px;
  width:20px;
  right:0;
  bottom:40px;
  background:#ffffff; 
  .item{
    text-align:center;
    line-height:20px;
    font-size:12px
  }
}
</style>


