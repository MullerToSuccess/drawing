const time = {
  /**
   * 格式化时间
   *
   * @param {String} str
   * @returns 格式化后的时间
   */
  before: (str) => {
    if (!str) return ''
    var date = new Date(str)
    var time = new Date().getTime() - date.getTime() // 现在的时间-传入的时间 = 相差的时间（单位 = 毫秒）
    if (time < 0) {
      return ''
    } else if ((time / 1000 < 30)) {
      return '刚刚'
    } else if (time / 1000 < 60) {
      return parseInt((time / 1000)) + '秒前'
    } else if ((time / 60000) < 60) {
      return parseInt((time / 60000)) + '分钟前'
    } else if ((time / 3600000) < 24) {
      return parseInt(time / 3600000) + '小时前'
    } else if ((time / 86400000) < 31) {
      return parseInt(time / 86400000) + '天前'
    } else if ((time / 2592000000) < 12) {
      return parseInt(time / 2592000000) + '月前'
    } else {
      return parseInt(time / 31536000000) + '年前'
    }
  },

  /**
   *
   */

  formatSelector: status => {
    let fromTime = new Date()
    let toTime = new Date()
    let from = ''
    let to = ''

    if (status === 1) {
      fromTime.setTime(fromTime.getTime() - (7 * 24 * 60 * 60) * 1000)
      from = fromTime.getFullYear() + '-' + (fromTime.getMonth() + 1) + '-' + fromTime.getDate() + ' ' + '00:00:00'
      to = toTime.getFullYear() + '-' + (toTime.getMonth() + 1) + '-' + toTime.getDate() + ' ' + '23:59:59'
    } else if (status === 2) {
      fromTime.setFullYear((fromTime.getMonth() - 3) > 0 ? fromTime.getFullYear() : (fromTime.getFullYear() - 1))
      fromTime.setMonth((fromTime.getMonth() - 1) > 0 ? (fromTime.getMonth() - 1) : 11)
      from = fromTime.getFullYear() + '-' + (fromTime.getMonth() + 1) + '-' + fromTime.getDate() + ' ' + '00:00:00'
      to = toTime.getFullYear() + '-' + (toTime.getMonth() + 1) + '-' + toTime.getDate() + ' ' + '23:59:59'
    } else if (status === 3) {
      fromTime.setFullYear((fromTime.getMonth() - 3) > 0 ? fromTime.getFullYear() : (fromTime.getFullYear() - 1))
      fromTime.setMonth((fromTime.getMonth() - 3) > 0 ? (fromTime.getMonth() - 3) : fromTime.getMonth() + 9)
      from = fromTime.getFullYear() + '-' + (fromTime.getMonth() + 1) + '-' + fromTime.getDate() + ' ' + '00:00:00'
      to = toTime.getFullYear() + '-' + (toTime.getMonth() + 1) + '-' + toTime.getDate() + ' ' + '23:59:59'
    }

    return {
      from: from,
      to: to
    }
  },

  /**
   * 计算时间差
   * @param {String} time1 '2018-02-05 12:23:22'
   * @param {String} time2 '2018-02-05 12:23:22'
   * @returns {Integer} 格式化后的时间
   */
  diff (time1, time2 = (new Date()).getTime()) {
    let t1 = (new Date(time1)).getTime()
    let t2 = ''
    if (typeof time2 === 'string') {
      t2 = (new Date(time2)).getTime()
    } else {
      t2 = time2
    }
    return t1 - t2
  },

  /**
 *月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 *年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * @param {string|integer} time '2018-05-06 12:20:12'|1526017227301
 * @param {string} fmt "yyyy-MM-dd hh:mm:ss.S"  "yyyy-M-d h:m:s.S"
 */

  format (time, fmt) {
    let t1 = new Date(time)
    var o = {
      'M+': t1.getMonth() + 1, // 月份
      'd+': t1.getDate(), // 日
      'h+': t1.getHours(), // 小时
      'm+': t1.getMinutes(), // 分
      's+': t1.getSeconds(), // 秒
      'q+': Math.floor((t1.getMonth() + 3) / 3), // 季度
      'S': t1.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (t1.getFullYear() + '').substr(4 - RegExp.$1.length))
    for (var k in o) { if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))) }
    return fmt
  },

  /**
   * 将秒转换为 天-时-分-秒
   * @param {integer} msd 60
   *
  */
  spend: function (msd = 0) {
    let time = msd
    if (time != null && time !== '') {
      if (time > 60 && time < 60 * 60) {
        time = parseInt(time / 60.0) + '分' + parseInt((parseFloat(time / 60.0) -
                        parseInt(time / 60.0)) * 60) + '秒'
      } else if (time >= 60 * 60 && time < 60 * 60 * 24) {
        time = parseInt(time / 3600.0) + '小时' + parseInt((parseFloat(time / 3600.0) -
                        parseInt(time / 3600.0)) * 60) + '分' +
                        parseInt((parseFloat((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) -
                        parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60)) * 60) + '秒'
      } else if (time >= 60 * 60 * 24) {
        time = parseInt(time / 3600.0 / 24) + '天' + parseInt((parseFloat(time / 3600.0 / 24) -
                        parseInt(time / 3600.0 / 24)) * 24) + '小时' + parseInt((parseFloat(time / 3600.0) -
                        parseInt(time / 3600.0)) * 60) + '分' +
                        parseInt((parseFloat((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) -
                        parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60)) * 60) + '秒'
      } else {
        time = parseInt(time) + '秒'
      }
    }
    return time
  }

}

export default time
