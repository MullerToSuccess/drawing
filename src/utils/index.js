// 加密
function encrypt (theText) {
  let output = ''
  let temp = []
  let temp2 = []
  let TextSize = theText.length
  for (let i = 0; i < TextSize; i++) {
    let rnd = Math.round(Math.random() * 122) + 68
    temp[i] = theText.charCodeAt(i) + rnd
    temp2[i] = rnd
  }
  for (let i = 0; i < TextSize; i++) {
    output += String.fromCharCode(temp[i], temp2[i])
  }
  return output
}
// 解密
function decrypt (theText) {
  let output = ''
  let temp = []
  let temp2 = []
  let TextSize = theText.length
  for (let i = 0; i < TextSize; i++) {
    temp[i] = theText.charCodeAt(i)
    temp2[i] = theText.charCodeAt(i + 1)
  }
  for (let i = 0; i < TextSize; i = i + 2) {
    output += String.fromCharCode(temp[i] - temp2[i])
  }
  return output
}
// 判断元素是否含有某个className
function hasClass(el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}
// 给某个元素添加某个className
function addClass(el, className) {
  if (hasClass(el, className)) {
    return
  }
  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}
// 移除某个className
function removeClass(el, className) {
  if (!hasClass(el, className)) {
    return
  }
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)', 'g')
  el.className = el.className.replace(reg, ' ')
}
// 获取元素上的data-属性
function getData(el, name, val) {
  let prefix = 'data-'
  if (val) {
    return el.setAttribute(prefix + name, val)
  }
  return el.getAttribute(prefix + name)
}
// 获取元素的盒模型最终值
function getRect(el) {
  if (el instanceof window.SVGElement) {
    let rect = el.getBoundingClientRect()
    return {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
      scrollTop: rect.scrollTop
    }
  } else {
    return {
      top: el.offsetTop,
      left: el.offsetLeft,
      width: el.offsetWidth,
      height: el.offsetHeight,
      scrollTop: el.scrollTop
    }
  }
}
// 判断题型：分为主观单题，客观单题，套卷（复合题，答题卡），客观组件
function judgeQuestionType(resource) {
  if (!resource) {
    return false
  }
  let objectiveIcomId = [508, 5013, 5018, 5011, 420, 5009, 5021, 5020, 507, 4643, 4630, 5001, 5000, 504, 84, 5015, 4642, 4424, 4423, 503, 5007]
  let model
  // 主观单题
  if ((resource.type === 'subjective' && ~['qti_question', 'qti_question_sheet'].indexOf(resource.resource_type)) || ~['InteractivePlayer', 'dms', 'GraphSplit'].indexOf(resource.icom_app_name)) {
    model = 'subjectiveqti'
  // 客观单题
  } else if (resource.type === 'objective' && ~['qti_question', 'qti_question_sheet'].indexOf(resource.resource_type)) {
    model = 'objectiveqti'
  // 套卷，复合题,答题卡
  } else if (~['qti_exam', 'qti_exam_sheet'].indexOf(resource.resource_type) || ~["speedread", 'readch', 'complex', 'listeningch'].indexOf(resource.alias)) {
    model = 'combineqti'
  // 客观组件
  } else if ((resource.type === 'objective' && resource.resource_type === 'icom') || objectiveIcomId.find(val => val === Number(resource.icom_id)) || (Number(resource.icom_id) === 4629 && item.alias === 'oraltest')) {
    model = 'objectiveicom'
  } else {
    model = ''
  }
  return model
}

function deepClone(source) {
  let result = {}
  for (let key of source) {
    result[key] = typeof source[key] === 'object' ? deepClone(source[key]) : source[key]
  }
  return result
}
export default {
  encrypt,
  decrypt,
  hasClass,
  addClass,
  removeClass,
  getData,
  getRect,
  judgeQuestionType,
  deepClone
}
