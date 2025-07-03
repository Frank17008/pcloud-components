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

export function cloneDeep<T>(value: T): T {
  if (value === null || typeof value !== 'object') return value;
  if (Array.isArray(value)) return value.map(cloneDeep) as unknown as T;
  const result: any = {};
  for (const key in value) {
    if (Object.prototype.hasOwnProperty.call(value, key)) {
      result[key] = cloneDeep((value as any)[key]);
    }
  }
  return result;
}

export function mergeWith<T, S>(object: T, source: S, customizer?: (_objValue: any, _srcValue: any, _key: string | number) => any): T & S {
  const result: any = cloneDeep(object);
  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      const objValue = (result as any)[key];
      const srcValue = (source as any)[key];
      if (customizer) {
        const customized = customizer(objValue, srcValue, key);
        if (customized !== undefined) {
          result[key] = customized;
          continue;
        }
      }
      if (objValue && srcValue && typeof objValue === 'object' && typeof srcValue === 'object' && !Array.isArray(objValue) && !Array.isArray(srcValue)) {
        result[key] = mergeWith(objValue, srcValue, customizer);
      } else {
        result[key] = cloneDeep(srcValue);
      }
    }
  }
  return result;
}

/** 合并对象 */
function merge(object, sources, customizer = defaultCustomizer) {
  return mergeWith(cloneDeep(object), sources, customizer);
}
export default { merge };
