/*
 * @Description: 数据类型验证函数集合
 * @Author: songyijian
 * @Date: 2019-07-15 14:00:39
 * @LastEditTime: 2019-10-16 17:27:22
 * @LastEditors: Please set LastEditors
 */

module.exports = {
  //是否字符串
  isString(o) {
    return Object.prototype.toString.call(o).slice(8, -1) === 'String'
  },

  //是否数字
  isNumber(o) {
    return Object.prototype.toString.call(o).slice(8, -1) === 'Number'
  },

  //是否boolean
  isBoolean(o) {
    return Object.prototype.toString.call(o).slice(8, -1) === 'Boolean'
  },

  //是否函数
  isFunction(o) {
    return Object.prototype.toString.call(o).slice(8, -1) === 'Function'
  },

  //是否为null
  isNull(o) {
    return Object.prototype.toString.call(o).slice(8, -1) === 'Null'
  },

  //是否undefined
  isUndefined(o) {
    return Object.prototype.toString.call(o).slice(8, -1) === 'Undefined'
  },

  //是否对象
  isObj(o) {
    return Object.prototype.toString.call(o).slice(8, -1) === 'Object'
  },

  //是否数组
  isArray(o) {
    return Object.prototype.toString.call(o).slice(8, -1) === 'Array'
  },

  //是否时间
  isDate(o) {
    return Object.prototype.toString.call(o).slice(8, -1) === 'Date'
  },

  //是否正则
  isRegExp(o) {
    return Object.prototype.toString.call(o).slice(8, -1) === 'RegExp'
  },

  //是否错误对象
  isError(o) {
    return Object.prototype.toString.call(o).slice(8, -1) === 'Error'
  },

  //是否Symbol函数
  isSymbol(o) {
    return Object.prototype.toString.call(o).slice(8, -1) === 'Symbol'
  },

  //是否Promise对象
  isPromise(o) {
    return Object.prototype.toString.call(o).slice(8, -1) === 'Promise'
  },

  //是否Set对象
  isSet(o) {
    return Object.prototype.toString.call(o).slice(8, -1) === 'Set'
  },

  //是不是 false
  isFalse(o) {
    if (!o || o === 'null' || o === 'undefined' || o === 'false' || o === 'NaN') return true
    return false
  },

  //是不是true
  isTrue(o) {
    return !this.isFalse(o)
  },

  //是不是整数
  isInteger(o) {
    try {
      return typeof o === 'number' && o % 1 === 0
    } catch (e) {
      return false
    }
  },

  // 是否为身份证号
  isIdCard(str) {
    return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(str)
  },

  // 是否为手机号
  isPhoneNum(str) {
    return /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/.test(str)
  },

  // 是否为URL地址
  isUrl(str) {
    return /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i.test(str);
  },

  // 是否包含中文字符
  isContainCN(str) {
    return !(escape(str).indexOf("%u") < 0)
  },

}
