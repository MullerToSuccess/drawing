<template>
 <div class="radio-group">
   <van-radio-group v-model="radioEnv">
    <van-radio  v-for="(env,index) in envList" :key="index" :name="index" @click="getEnv(env,index)">{{env===""?'外网':env}}</van-radio>
  </van-radio-group>
  <van-radio-group v-model="radio">
    <!--<van-radio :name="key" v-for="(item,key) in list" :key="key" @click="changeEnv(key,item)" >{{item.key}}</van-radio>-->
    <van-radio key="Derry" @click="changeEnv(Derry)" >{{Derry.key}}</van-radio>
    <van-radio key="Derry2" @click="changeEnv(Derry2)" >{{Derry2.key}}</van-radio>
  </van-radio-group>
</div>
</template>

<script>
import userApi from '@/module/account/axios/user'

export default {
  name: 'switchEnv',
  data() {
    return {
      radio: -1,
      radioEnv: this.$store.getters['runEnv/env'] === 'dev.' ? 0 : (this.$store.getters['runEnv/env'] === 'test.' ? 1 : 2),
      envList: ['dev', 'test', '','192'],
      list: [],
      Derry: {
        key: 'zrq',
        url: "http://192.168.41.127:8082/index-android.html"
      },
      Derry2: {
        key: '56dian-master.yxban.anoah.com',
        url: "http://56dian-master.yxban.anoah.com/HW/index.html"
      }
    }
  },
  created() {
    // console.log(this.$store)
    // userApi.envList().then(r => {
    //   console.log(1)
    //   this.list = r;
    //   /* eslint-disable */
    //   for(var i in r){
    //       if(r[i].url.split('#')[0]==window.location.href.split('#')[0]){
    //           this.radio=parseInt(i);
    //           break;
    //       }
    //   }
    // })
    // this.radioEnv=this.$store.getters['runEnv/env'] === 'dev.' ? 0: (this.$store.getters['runEnv/env'] === 'test.' ? 1 : 2)
  },
  components: {
  },
  methods: {
    changeEnv: function(item) {
      alert(item.url)
      window.appPlug && window.appPlug.loadUrl(item.url);
      window.location.href = item.url;
    },
    getEnv(key, index) {
      this.radioEnv = index;
      let env = key === '' ? '' : key + '.';
      this.$emit('getEnv', env)
    }
  }
}
</script>

<style lang="scss" scoped>
.van-radio{
  padding:calc(15px/2) calc(10px/2);
}
.radio-group{
  overflow-y:scroll;
  height: 70vh;
}
</style>
