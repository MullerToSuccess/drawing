/**
 * 格式化时间
 *
 * @param {String} str
 * @returns 格式化后的时间
 */
export const formatDate = str => {
  if (!str) return "";
  var date = new Date(str);
  var time = new Date().getTime() - date.getTime(); // 现在的时间-传入的时间 = 相差的时间（单位 = 毫秒）
  if (time < 0) {
    return "";
  } else if (time / 1000 < 30) {
    return "刚刚";
  } else if (time / 1000 < 60) {
    return parseInt(time / 1000) + "秒前";
  } else if (time / 60000 < 60) {
    return parseInt(time / 60000) + "分钟前";
  } else if (time / 3600000 < 24) {
    return parseInt(time / 3600000) + "小时前";
  } else if (time / 86400000 < 31) {
    return parseInt(time / 86400000) + "天前";
  } else if (time / 2592000000 < 12) {
    return parseInt(time / 2592000000) + "月前";
  } else {
    return parseInt(time / 31536000000) + "年前";
  }
};

export const formatTimeSelector = status => {
  let fromTime = new Date();
  let toTime = new Date();
  let from = "";
  let to = "";

  if (status === 1) {
    fromTime.setTime(fromTime.getTime() - 7 * 24 * 60 * 60 * 1000);
    from =
      fromTime.getFullYear() +
      "-" +
      (fromTime.getMonth() + 1) +
      "-" +
      fromTime.getDate() +
      " " +
      "00:00:00";
    to =
      toTime.getFullYear() +
      "-" +
      (toTime.getMonth() + 1) +
      "-" +
      toTime.getDate() +
      " " +
      "23:59:59";
  } else if (status === 2) {
    fromTime.setFullYear(
      fromTime.getMonth() - 3 > 0
        ? fromTime.getFullYear()
        : fromTime.getFullYear() - 1
    );
    fromTime.setMonth(
      fromTime.getMonth() - 1 > 0 ? fromTime.getMonth() - 1 : 11
    );
    from =
      fromTime.getFullYear() +
      "-" +
      (fromTime.getMonth() + 1) +
      "-" +
      fromTime.getDate() +
      " " +
      "00:00:00";
    to =
      toTime.getFullYear() +
      "-" +
      (toTime.getMonth() + 1) +
      "-" +
      toTime.getDate() +
      " " +
      "23:59:59";
  } else if (status === 3) {
    fromTime.setFullYear(
      fromTime.getMonth() - 3 > 0
        ? fromTime.getFullYear()
        : fromTime.getFullYear() - 1
    );
    fromTime.setMonth(
      fromTime.getMonth() - 3 > 0
        ? fromTime.getMonth() - 3
        : fromTime.getMonth() + 9
    );
    from =
      fromTime.getFullYear() +
      "-" +
      (fromTime.getMonth() + 1) +
      "-" +
      fromTime.getDate() +
      " " +
      "00:00:00";
    to =
      toTime.getFullYear() +
      "-" +
      (toTime.getMonth() + 1) +
      "-" +
      toTime.getDate() +
      " " +
      "23:59:59";
  }

  return {
    from: from,
    to: to
  };
};

export const formatDataToOffTime = time => {
  if (!time) return "";
  time = time.split("-");
  let date = new Date();
  date.setFullYear(time[0]);
  date.setMonth(time[1] - 1);
  date.setDate(time[2]);
  date.setHours(23, 59, 59);

  let now = new Date();
  let offsettime;

  if (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  ) {
    offsettime = 0;
  } else {
    offsettime = Math.round((now.getTime() - date.getTime()) / 1000); // 现在的时间-传入的时间 = 相差的时间（单位 = 毫秒）
  }
  if (offsettime === 0) {
    return (
      "今天 " + (date.getDay() > 0 ? "周" + format(date.getDay()) : "周日")
    );
  } else if (offsettime < 24 * 60 * 60) {
    return (
      "昨天 " + (date.getDay() > 0 ? "周" + format(date.getDay()) : "周日")
    );
  } else if (date.getFullYear() === now.getFullYear()) {
    return (
      date.getMonth() +
      1 +
      "月" +
      date.getDate() +
      "日 " +
      (date.getDay() > 0 ? "周" + format(date.getDay()) : "周日")
    );
  } else {
    return (
      date.getFullYear() +
      "年" +
      (date.getMonth() + 1) +
      "月" +
      date.getDate() +
      "日 " +
      (date.getDay() > 0 ? "周" + format(date.getDay()) : "周日")
    );
  }

  function format(day) {
    if (day === 1) {
      return "一";
    } else if (day === 2) {
      return "二";
    } else if (day === 3) {
      return "三";
    } else if (day === 4) {
      return "四";
    } else if (day === 5) {
      return "五";
    } else if (day === 6) {
      return "六";
    }
  }
};

export const formatDeadLine = time => {
  // 判断日期是否过期
  if (!time) return false;
  let nowTime = new Date().getTime(); // nowtime
  time = new Date(time).getTime(); // deadline

  if (time - nowTime < 0) {
    return 1;
  } else {
    return 0;
  }
};

export const formatTimeToString = time => {
  // 格式化时分秒
  if (!time) return false;
  time = parseInt(time) / 1000;
  if (time < 60) {
    return time + "″";
  } else if (time >= 60 && time < 60 * 60) {
    return Math.floor(time / 60) + "′" + (time % 60) + "″";
  } else if (time >= 60 * 60 && time < 60 * 60 * 24) {
    return (
      Math.floor(time / (60 * 60)) +
      "h" +
      Math.floor((time % (60 * 60)) / 60) +
      "′" +
      (time % 60) +
      "″"
    );
  }
};

export const NumberToChinese = num => {
  // 数字转中文
  let chnNumChar = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
  let chnUnitSection = ["", "万", "亿", "万亿", "亿亿"];
  let chnUnitChar = ["", "十", "百", "千"];

  function SectionToChinese(section) {
    let strIns = "";
    let chnStr = "";
    let unitPos = 0;
    let zero = true;
    while (section > 0) {
      var v = section % 10;
      if (v === 0) {
        if (!zero) {
          zero = true;
          chnStr = chnNumChar[v] + chnStr;
        }
      } else {
        zero = false;
        strIns = chnNumChar[v];
        strIns += chnUnitChar[unitPos];
        chnStr = strIns + chnStr;
      }
      unitPos++;
      section = Math.floor(section / 10);
    }
    return chnStr;
  }

  let NumberToChinese = function(num) {
    let unitPos = 0;
    let strIns = "";
    let chnStr = "";
    var needZero = false;

    if (num === 0) {
      return chnNumChar[0];
    }

    while (num > 0) {
      var section = num % 10000;
      if (needZero) {
        chnStr = chnNumChar[0] + chnStr;
      }
      strIns = SectionToChinese(section);
      strIns += section !== 0 ? chnUnitSection[unitPos] : chnUnitSection[0];
      chnStr = strIns + chnStr;
      needZero = section < 1000 && section > 0;
      num = Math.floor(num / 10000);
      unitPos++;
    }
    return chnStr;
  };

  return NumberToChinese(num);
};

export const ChineseToNumber = str => {
  // 中文转数字
  let chnNumChar = {
    零: 0,
    一: 1,
    二: 2,
    三: 3,
    四: 4,
    五: 5,
    六: 6,
    七: 7,
    八: 8,
    九: 9
  };
  let chnNameValue = {
    十: { value: 10, secUnit: false },
    百: { value: 100, secUnit: false },
    千: { value: 1000, secUnit: false },
    万: { value: 10000, secUnit: true },
    亿: { value: 100000000, secUnit: true }
  };

  let ChineseToNumber = function(chnStr) {
    var rtn = 0;
    var section = 0;
    var number = 0;
    var secUnit = false;
    var str = chnStr.split("");

    for (var i = 0; i < str.length; i++) {
      var num = chnNumChar[str[i]];
      if (typeof num !== "undefined") {
        number = num;
        if (i === str.length - 1) {
          section += number;
        }
      } else {
        var unit = chnNameValue[str[i]].value;
        secUnit = chnNameValue[str[i]].secUnit;
        if (secUnit) {
          section = (section + number) * unit;
          rtn += section;
          section = 0;
        } else {
          section += number * unit;
        }
        number = 0;
      }
    }
    return rtn + section;
  };

  return ChineseToNumber(str);
};
