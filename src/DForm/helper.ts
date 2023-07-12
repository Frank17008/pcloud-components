/*
 * @Author       : wangfeihu
 * @Date         : 2023-06-07 15:08:06
 * @LastEditors  : wangfeihu
 * @LastEditTime : 2023-06-12 17:35:15
 * @Description  : 合并两个对象中的所有字段
 */

import mergeWith from 'lodash/mergeWith';
import cloneDeep from 'lodash/cloneDeep';

const TYPES = {
  OPTION_TYPE_PRIMARY: 'primary',
  OPTION_TYPE_OBJECT: 'object',
  OPTION_TYPE_ARRAY: 'array',
};

// 获取某个字段的类型
function getType(value): any {
  if (typeof value === 'string') {
    return TYPES.OPTION_TYPE_PRIMARY;
  } else if (typeof value === 'number') {
    return TYPES.OPTION_TYPE_PRIMARY;
  } else if (typeof value === 'boolean') {
    return TYPES.OPTION_TYPE_PRIMARY;
  } else if (typeof value === 'undefined') {
    return TYPES.OPTION_TYPE_PRIMARY;
  } else if (typeof value === 'symbol') {
    return TYPES.OPTION_TYPE_PRIMARY;
  } else if (value === null) {
    return TYPES.OPTION_TYPE_PRIMARY;
  } else if (typeof value === 'function') {
    return TYPES.OPTION_TYPE_PRIMARY;
  } else if (value instanceof Array) {
    return TYPES.OPTION_TYPE_ARRAY;
  } else if (Object.keys(value).length > 0) {
    return TYPES.OPTION_TYPE_OBJECT;
  } else {
    return TYPES.OPTION_TYPE_PRIMARY;
  }
}

const defaultCustomizer = (objValue, srcValue) => {
  // 将空对象和空数组当成基本类型处理，不进行合并
  if ((srcValue instanceof Array && srcValue.length < 1) || getType(srcValue) === TYPES.OPTION_TYPE_PRIMARY) {
    return srcValue;
  }
};

/** 合并对象 */
function merge(object, sources, customizer = defaultCustomizer) {
  return mergeWith(cloneDeep(object), sources, customizer);
}

export default { merge };
