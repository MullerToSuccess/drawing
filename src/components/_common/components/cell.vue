<template>
  <div id="cell">
    <div class="cell-filed" v-if="application === 'filed'">
        <c-filed :filed="application === 'filed'" :config="config" @onfocus="onfocus" @onblur="onblur"></c-filed>
    </div>
    <div class="cell-normal" v-else>
      <div class="cell-msg" @click="to !== '' || application ==='select'?next():''">
        <div>{{title}}</div>
        <div class="right">
          <div class="right-photo" v-if="mode === 1">
            <img :src="value" v-show="value">
          </div>
          <div v-else class="right-text">{{value}}</div>
          <div style="display: flex;align-items: center" v-show="to !== ''">
            <i class="right-icon"></i>
          </div>
        </div>
      </div>
      <div class="cell-content" v-show='more && content != null'>
        <div class="mode-2" v-if="mode === 2">
          <div v-for="(item,index) in content" :key="index">{{item}}</div>
        </div>
        <div class="mode-3" v-if="mode === 3">
          <div class="m-3-item" v-for="(item,index) in content" :key="index" v-show="item.isAvailable">
            <div class="courseName">{{item.courseName}}</div>
            <div>({{item.validStart | date}}~{{item.validEnd | date}})</div>
            <div class="state">进行中</div>
          </div>
        </div>
        <div class="mode-4" v-if="mode === 4">
          <div class="m-4-item" >
            <span>语文: </span>
            <span class="m-4-score">{{content.chineseScore}}</span>
          </div>
          <div class="m-4-item" >
            <span>英语: </span>
            <span class="m-4-score">{{content.englishScore}}</span>
          </div>
          <div class="m-4-item" >
            <span>数学: </span>
            <span class="m-4-score">{{content.mathScore}}</span>
          </div>
        </div>
        <div class="mode-5" v-if="mode === 5">
          <div class="m-5-item" v-for="(item,index) in content" :key="index" @click="selectGuardian(item.mobileBind, item.id)">
            <span class="m-5-name">{{item.relationship | guardian}}</span>
            <span>{{item.mobile}}</span>
            <i class="m-5-select" v-show="item.mobileBind"></i>
            <!--<i class="right-icon" v-show="!item.mobileBind"></i>-->
          </div>
        </div>
        <div class="mode-6" v-if="mode === 6">
          <img :src="content" v-show="content">
        </div>
        <div class="mode-7" v-if="mode === 7">
          <div>{{content}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import cFiled from 'managerCommon/components/cFiled'
import {CellConfig} from 'managerCommon/js/config'
import {mapMutations} from 'vuex'

export default {
  name: 'Cell',
  props: {
    mode: {
      type: Number,
      default: 0
    },
    more: {
      type: Boolean,
      default: false
    },
    title: {
      type: String
    },
    value: {
      type: [String, Number],
      default: null
    },
    content: {
      type: [Array, String, Object],
      default: null
    },
    to: {
      type: String,
      default: ''
    },
    application: {
      type: String,
      default: 'normal'
    },
    isSave: {
      type: Boolean,
      default: true
    },
    configName: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'teacher'
    },
    dateType: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      config: {},
      courseMode: true
    }
  },
  created () {
    if (this.configName) this.config = CellConfig[this.configName]
  },
  methods: {
    onfocus (off) {
      this.$emit('onfocus', off)
    },
    onblur (off) {
      this.$emit('onblur', off)
    },
    next () {
      if (this.to === 'sEditGuardian') {
        if (this.content.length !== 0) {
          this.content.forEach((v, i) => {
            if (!v.mobileBind) {
              this.$store.commit('managerStudent/SET_GUARDIAN', v.relationship)
              this.$store.commit('managerStudent/SET_GUARDIANPHONE', v.mobile)
              this.$store.commit('managerStudent/SET_GUARDIANID', v.id)
            }
          })
        } else {
          this.$store.commit('managerStudent/SET_GUARDIAN', '')
          this.$store.commit('managerStudent/SET_GUARDIANPHONE', '')
          this.$store.commit('managerStudent/SET_GUARDIANID', '')
        }
        this._go('sEditMsg')
      } else {
        if (this.application === 'select') {
          this.$emit('popup', this._getPopData())
        } else {
          let value = this.value ? this.value : this.content
          let path
          switch (this.type) {
            case 'student':
              path = 'sEditMsg'
              break
            case 'teacher':
              path = 'tEditMsg'
              break
            case 'class':
              path = 'cEditMsg'
              break
            case 'addClass':
              path = 'cAddMsg'
              break
          }
          this.setData(value)
          this._go(path)
        }
      }
    },
    selectGuardian (bool, id) {
      if (bool) {
        return false
      } else {
        this.content.forEach((v, i) => {
          if (id === v.id) {
            this.$store.commit('managerStudent/SET_GUARDIAN', v.relationship)
            this.$store.commit('managerStudent/SET_GUARDIANPHONE', v.mobile)
            this.$store.commit('managerStudent/SET_GUARDIANID', v.id)
          }
        })
        this._go('sEditMsg')
      }
    },
    _go (path) {
      this.$router.push({
        name: path,
        params: {
          component: this.to,
          isSave: this.isSave,
          config: this.config,
          query: this.$route.query.status
        }
      })
      if (this.config) this.setDataKey(this.config.key)
    },
    _getPopData () {
      return {
        type: this.config.type,
        key: this.config.key,
        value: this.value,
        columns: this.config.columns
      }
    },
    ...mapMutations({
      setData: 'managerCommon/SET_EDITMSG',
      setDataKey: 'managerCommon/SET_EDITMSGKEY'
    })
  },
  components: {
    cFiled
  }
}

</script>

<style scoped lang="scss">
 @import "@/style/variable.scss";
  #cell{
    padding: 0 calc(26px/2);
    .cell-normal{
      border-bottom: 1px solid $color-line;
      .cell-msg{
        display: flex;
        justify-content: space-between;
        height: calc(100px/2);
        line-height: calc(100px/2);
        font-size: $header-list;
        .right{
          position: relative;
          width: 70%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          div{
            height: calc(100px/2);
          }
          .right-photo {
            position: relative;
            right: calc(-200px/2);
            display: flex;
            justify-content: center;
            align-items: center;
            width: 85%;
            margin-right: calc(10px/2);
            img{
              width: calc(86px/2);
              height: calc(86px/2);
              border-radius:50%;
            }
          }
          .right-text{
            width: 85%;
            text-align: right;
            margin-left: calc(40px/2);
            font-size: $header-list-s;
            color: $color-text-d;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .right-icon{
            display: inline-block;
            width: calc(30px/2);
            height: calc(30px/2);
            background: url('../../../assets/_images/public/right_arrow.png') no-repeat 0 0;
            background-size: 100% 100%;
            vertical-align: text-bottom;
          }
        }
      }
      .cell-content{
        font-size: $header-list-s;
        padding: 0 0 0 calc(15px/2);
        color: $color-text-d;
        .mode-2{
          display: flex;
          flex-wrap: wrap;
          div{
            width: 33%;
            text-align: center;
            margin-bottom: calc(28px/2);
            letter-spacing: 1px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
        .mode-3{
          .m-3-item{
            display: flex;
            margin-bottom: calc(28px/2);
            letter-spacing:calc(2px/2);
            div{
              margin-right: 7px;
            }
            .courseName{
              width: 23%;
              letter-spacing: 1px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            .state{
              color: $green-active-color;
            }
          }
        }
        .mode-4{
          display: flex;
          .m-4-item{
            display: flex;
            margin-right: calc(100px/2);
            margin-bottom: calc(28px/2);
            letter-spacing:calc(2px/2);
            .m-4-score{
              color: $green-active-color;
            }
          }
        }
        .mode-5{
          position: relative;
          .m-5-item{
            margin-bottom: calc(28px/2);
            letter-spacing:calc(2px/2);
            .m-5-name{
              display: inline-block;
              height: calc(32px/2);
              line-height: calc(32px/2);
              width: calc(100px/2);
              margin-right: calc(100px/2);
            }
            .m-5-select{
              display: inline-block;
              width: calc(32px/2);
              height: calc(32px/2);
              margin-left: calc(50px/2);
              background: url('../../../assets/_images/manager/student_select.png') no-repeat 0 0;
              background-size: 100% 100%;
              vertical-align: text-bottom;
            }
            .right-icon{
              position: absolute;
              right: 0;
              display: inline-block;
              margin-left: calc(100px/2);
              width: calc(30px/2);
              height: calc(30px/2);
              background: url('../../../assets/_images/public/right_arrow.png') no-repeat 0 0;
              background-size: 100% 100%;
              vertical-align: text-bottom;
            }
          }
        }
        .mode-6{
          width: calc(270px/2);
          height: calc(160px/2);
          padding-bottom: calc(20px/2);
          img{
            width: 100%;
            height: 100%;
          }
        }
        .mode-7{
          div{
            letter-spacing: calc(2px/2);
            line-height: calc(50px/2);
          }
        }
      }
    }
  }
</style>
