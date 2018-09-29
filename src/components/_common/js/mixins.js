import {mapGetters} from 'vuex'
import {addClass, hasClass, getRect} from 'common/js/dom'

const THRESHOLD = 130
const Ratio = 10
const TIME = 0.3
export const Mscroll = {
  data () {
    return {
      pullDownRefresh: true,
      pullDownRefreshThreshold: 90,
      pullDownRefreshStop: 40,
      pullUpLoad: true,
      pullUpLoadThreshold: 0,
      pullUpLoadComplete: false, //  保证数据加载完成后在显示下拉div
      pullDownRefreshComplete: false, //  保证数据加载完成后在显示上拉div
      pullUpLoadMoreTxt: '上拉加载更多',
      pullUpLoadNoMoreTxt: '没有更多数据了',
      CURRENT: 1,
      SIZE: 15,
      scrollY: 0
    }
  },
  computed: {
    pullDownRefreshObj: function () {
      return this.pullDownRefresh ? {
        threshold: parseInt(this.pullDownRefreshThreshold),
        stop: parseInt(this.pullDownRefreshStop),
        txt: '已是最新数据'
      } : false
    },
    pullUpLoadObj: function () {
      return this.pullUpLoad ? {
        threshold: parseInt(this.pullUpLoadThreshold),
        txt: {more: this.pullUpLoadMoreTxt, noMore: this.pullUpLoadNoMoreTxt}
      } : false
    },
    ...mapGetters({
      schoolId: 'managerCommon/schoolId'
    })
  },
  methods: {
    scroll(pos) {
      this.scrollY = pos.y
    },
    onPullingDown(api, params) {
      // 模拟更新数据
      console.log('pulling down and load data')
      this.CURRENT = 1
      let json = Object.assign({}, {
        schoolId: this.schoolId,
        current: this.CURRENT,
        size: this.SIZE
      }, params)
      api(json).then(r => {
        let data = r.page ? r.page.records || r.page : r.records
        if (data !== 0) {
          this.data = data
        } else {
          // 如果没有新数据
          this.$refs.scroll.forceUpdate()
        }
      })
    },
    onPullingUp(api, params) {
      // 更新数据
      console.log('pulling up and load data')
      let json = Object.assign({}, {
        schoolId: this.schoolId,
        current: ++this.CURRENT,
        size: this.SIZE
      }, params)
      api(json).then(r => {
        let data = r.page ? r.page.records || r.page : r.records
        if (data.length !== 0) {
          this.data = this.data.concat(data)
        } else {
          this.CURRENT--
          setTimeout(() => {
            this.$refs.scroll.forceUpdate()
          }, 20)
        }
      })
    }
  }
}
export const Mpan = {
  data () {
    return {
      newBack: true
    }
  },
  mounted () {
    setTimeout(() => {
      this._initTouch()
    }, 500)
  },
  methods: {
    back () {
      this.touch.target.style.transition = `all ${TIME}s`
      this.touch.ptarget.style.transition = `all ${TIME}s`
      this.touch.target.style.transform = `translate3d(100%, 0, 0)`
      this.touch.ptarget.style.transform = `translate3d(0, 0, 0)`
      setTimeout(() => {
        this.$router.back(-1)
      }, TIME * 1000)
    },
    _initTouch () {
      this.touch = {}
      this.touch.target = document.getElementsByClassName('touchpan')[0]
      this.touch.width = getRect(this.touch.target).width
      this.touch.ptarget = document.getElementsByClassName('ptouchpan')[0]
      this.touch.ptarget.style.transform = `translate3d(-${Ratio}%, 0, 0)`
    },
    onPanStart (e) {
      let firstTouch = e.changedPointers[0]
      this.touch.x1 = firstTouch.pageX
      this.touch.y1 = firstTouch.pageY
      this.touch.ptarget.style.transition = ''
      this.touch.target.style.transition = ''
    },
    onPan (e) {
      if (!this.touch.type) {
        let type = e.additionalEvent
        this.touch.type = type
        if (type === 'panleft' || type === 'panright') {
          this._pan(e)
        }
      } else {
        if (this.touch.type === 'panleft' || this.touch.type === 'panright') {
          this._pan(e)
        }
      }
    },
    onPanEnd (e) {
      if (this.touch.deltaX >= THRESHOLD) {
        this.touch.target.style.transform = `translate3d(100%, 0, 0)`
        this.touch.ptarget.style.transform = `translate3d(0, 0, 0)`
        setTimeout(() => {
          this.$router.back(-1)
        }, TIME * 1000)
      } else {
        this.touch.target.style.transform = `translate3d(0, 0, 0)`
        this.touch.ptarget.style.transform = `translate3d(-${Ratio}%, 0, 0)`
      }
      this.touch.type = ''
      this.touch.target.style.transition = `all ${TIME}s`
      this.touch.ptarget.style.transition = `all ${TIME}s`
    },
    _pan(e) {
      let firstTouch = e.changedPointers[0]
      const ratio = -(this.touch.width * Ratio / 100)
      let transform
      this.touch.x2 = firstTouch.pageX
      this.touch.y2 = firstTouch.pageY
      this.touch.deltaX = this.touch.x2 - this.touch.x1
      if (this.touch.deltaX < 0) {
        transform = 0
      } else if (this.touch.deltaX > this.touch.width) {
        transform = this.touch.width
      } else {
        transform = this.touch.deltaX
      }
      this.touch.pdelta = transform * Ratio / 100
      this.touch.target.style.transform = `translate3d(${transform}px, 0, 0)`
      this.touch.ptarget.style.transform = `translate3d(${ratio + this.touch.pdelta}px, 0, 0)`
    }
  }
}
