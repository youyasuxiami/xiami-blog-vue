import request from '@/utils/request'

export function getTypeValue(value) {
  return request({
    url: '/utils/dictionaries',
    method: 'get',
    params: {
      group: value
    }
  })
}

// 回显数据字典
export function selectDictLabel(datas, value) {
  var actions = [];
  Object.keys(datas).map((key) => {
    if (datas[key].code == ('' + value)) {
      actions.push(datas[key].value);
      return false;
    }
  })
  return actions.join('');
}

/**
 * 时间格式化
 * @param date
 * @param fmt
 * @returns {string}
 */

export function formatDate(date, fmt) {
  date = new Date(date)
  if (typeof (fmt) === 'undefined') {
    fmt = 'yyyy-MM-dd HH:mm:ss'
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'H+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : ('00' + str).substr(str.length))
    }
  }
  return fmt
}






