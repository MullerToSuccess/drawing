import {Toast} from 'vant'
export const Maccount = {
  data () {
    return {
    }
  },
  // beforeRouteLeave(to, from, next) {
  //   if (to.name === 'manager' || to.name === 'teacher') {
  //     to.meta.isUseCache = false
  //     next()
  //   } else {
  //     next()
  //   }
  // },
  methods: {
    afterLogin () {
      let role = this.$store.state.account.userIdentity
      let path
      if (role.indexOf(1) >= 0) {
        path = '/manager'
      } else if (role.indexOf(2) >= 0) {
        path = '/teacher'
      } else {
        Toast(`身份错误`)
      }
      this.$router.push(
        { path: path }
      )
    }
  }
}
