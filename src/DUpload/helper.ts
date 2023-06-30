/*
 * @Author       : wangfeihu
 * @Date         : 2023-06-16 11:25:57
 * @LastEditors  : wangfeihu
 * @LastEditTime : 2023-06-29 18:10:04
 * @Description  : 辅助方法集合
 */

import { UploadFile } from 'antd';

type DUploadFile = Omit<UploadFile, 'uid'> & {
  /** 文件id */
  id?: string | number;
  /** 文件uid,系统自动生成 */
  uid?: string | number;
  /** 文件来源 upload:文件对话框,remote:已上传的文件对象 */
  source?: 'upload' | 'remote';
};

/** 转换base64时的参数 */
type CompressProps = {
  /* 图像宽度 */
  width?: number;
  /** 图像高度 */
  height?: number;
  /** 图像质量 */
  quality?: number;
};

type ThumbOptionProps = {
  /** 对目标文件进行过滤，默认只对图片格式生成缩略图 */
  // eslint-disable-next-line no-unused-vars
  filter?: ((file: DUploadFile) => boolean) | Array<string>;
  /** 文件大小,当上传文件大于指定值时会对缩略图进行压缩,单位为字节，默认2MB */
  size?: number;
  /** 缩略图压缩参数,默认为 {width:300,height:200,quality:0.7} */
  compress?: CompressProps | null;
  /** 缩略图生成失败时的回调函数 */
  // eslint-disable-next-line no-unused-vars
  onError?: (err: Error) => void;
  /** 自定义生成base64缩略图的方法 */
  // eslint-disable-next-line no-unused-vars
  getThumbUrl?: (file: DUploadFile, option: ThumbOptionProps) => Promise<string>;
};

type TYPESProps = {
  OPTION_TYPE_PRIMARY: 'primary';
  OPTION_TYPE_OBJECT: 'object';
  OPTION_TYPE_ARRAY: 'array';
};
const TYPES: TYPESProps = {
  OPTION_TYPE_PRIMARY: 'primary',
  OPTION_TYPE_OBJECT: 'object',
  OPTION_TYPE_ARRAY: 'array',
};

// 获取某个字段的类型
function getType(value): 'primary' | 'object' | 'array' {
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

/**
 * @description  : 将图像文件转换为Base64格式
 * @param         {Blob} blob 图像文件
 * @param         {CompressProps} options 指定图像压缩参数,其格式为: {width:300,height:200,quality:0.7}
 * @return        {Promise<string>} 包含Base64字符串的Promise对象
 * @example      : imageToBase64(file,{ width: 300, height: 200, quality: 0.7 }).then( url => console.log( url ) )
 */
function imageToBase64(blob: Blob, options?: CompressProps | null): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    try {
      reader.readAsDataURL(blob);
    } catch (err) {
      reject(err);
    }
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        if (options === null) {
          resolve(reader.result);
          return;
        }

        const img = new Image();
        img.src = reader.result;
        img.onload = () => {
          const {
            width = img.naturalWidth,
            height = img.naturalHeight,
            quality = 0.7,
          } = options || {};
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = width;
          canvas.height = height;
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const base64 = canvas.toDataURL(undefined, quality);
            resolve(base64);
          } else {
            reject(new Error(`转换缩略图失败: ${reader.result}`));
          }
        };
        img.onerror = (err: any) => reject(err);
      } else {
        reject(new Error(`转换缩略图失败: ${reader.result}`));
      }
    };
    reader.onerror = () => reject(reader.error);
  });
}

/**
 * @description  : 将传入的文件转换为UploadFile数组
 * @param         {any} files 目标文件对象
 * @return        {UploadFile[]} UploadFile数组
 * @example      :
 */
function getUploadFile(files: any, maxCount?: number) {
  if (files) {
    const list = files instanceof Array ? files : [files];
    return maxCount && maxCount > 0 ? list.slice(0, maxCount) : list;
  }
  return [];
}

/**
 * @description  : 根据传入的option对象获取缩略图参数
 * @param         {ThumbOptionProps} option 缩略图参数对象
 * @return        {ThumbOptionProps} ThumbOption对象
 * @example      :
 */
function getThumbOption(option?: ThumbOptionProps | null) {
  const {
    size = 2097152,
    filter = ['image/gif', 'image/jpeg', 'image/png', 'image/svg+xml'],
    compress,
    onError,
    getThumbUrl,
  } = option || {};
  const _filter = filter instanceof Array ? (file) => filter.includes(file.type || '') : filter;
  const _compress =
    compress === null ? compress : { width: 300, height: 200, quality: 0.7, ...compress };
  const defaultOption = { size, filter: _filter, compress: _compress, onError, getThumbUrl };
  const _option = option === null ? { ...defaultOption, filter: () => false } : defaultOption;
  return _option;
}

/**
 * @description  : a标签下载文件
 * @param         {Blob | string} url a标签的下载url或文件流
 * @param         {string} fileName 下载文件的名称,如果缺省则尝试从url中获取，默认为: "新建文件"
 * @return        {*}
 * @example      :
 */
function downloadFile(url: Blob | string, fileName?: string) {
  const eLink = document.createElement('a');
  eLink.download = fileName || (typeof url === 'string' ? '新建文件' : url?.name || '新建文件');
  eLink.style.display = 'none';
  eLink.href = typeof url === 'string' ? url : URL.createObjectURL(url);
  document.body.appendChild(eLink);
  eLink.click();
  URL.revokeObjectURL(eLink.href);
  document.body.removeChild(eLink);
}

/**
 * @description  : a标签预览文件
 * @param         {Blob | string} url a标签的预览url或文件流
 * @return        {*}
 * @example      :
 */
function previewFile(url: Blob | string) {
  const eLink = document.createElement('a');
  eLink.target = '_blank';
  eLink.style.display = 'none';
  eLink.href = typeof url === 'string' ? url : URL.createObjectURL(url);
  document.body.appendChild(eLink);
  eLink.click();
  URL.revokeObjectURL(eLink.href);
  document.body.removeChild(eLink);
}

/**
 * @description  : 以递归方式深度查找一个对象
 * @param         {Record} object 待查找的对象
 * @param         {function} fn 查找函数,每次递归时执行，如果执行结果为true，则递归过程并返回当前对象
 * @param         {number} maxDepth 递归的最大深度，默认10
 * @return        {*} 查找到的对象,未查找到则返回undefined
 * @example      :
 */
// eslint-disable-next-line no-unused-vars
function deepFindObject(
  object: Record<string, any>,
  fn: (item, parent, fieldMap) => boolean,
  maxDepth: number = 10,
) {
  function recursive(obj, parent, parentPath, fn, result) {
    if (fn(obj, parent, result)) return obj;

    if (parentPath.split(/\[|\./).length >= maxDepth) return;

    const type = getType(obj);
    if (type === 'object') {
      for (const key in obj) {
        if (key) {
          const pathString = parentPath ? `${parentPath}.${key}` : key;
          const target = recursive(obj[key], obj, pathString, fn, result);
          if (target) return target;
        }
      }
    } else if (type === 'array') {
      for (let index = 0; index < obj.length; index++) {
        const pathString = parentPath ? `${parentPath}[${index}]` : index;
        const target = recursive(obj[index], obj, pathString, fn, result);
        if (target) return target;
      }
    } else {
      result[parentPath] = obj;
    }
  }
  return recursive(object, undefined, '', fn, {});
}

/**
 * @description  : 以递归方式深度查找一个Jsx对象
 * @param         {Record} object 待查找的Jsx对象
 * @param         {function} fn 查找函数,每次递归时执行，如果执行结果为true，则停止递归过程并返回当前对象
 * @param         {number} maxDepth 递归的最大深度，默认10
 * @return        {*} 查找到的对象,未查找到则返回undefined
 * @example      :
 */
// eslint-disable-next-line no-unused-vars
function deepFindJsx(
  object: Record<string, any>,
  fn: (item, parent) => boolean,
  maxDepth: number = 10,
) {
  function recursive(obj, parent, parentPath, fn) {
    if (fn(obj, parent)) return obj;
    if (parentPath.split(/\./).length >= maxDepth) return;

    const children = obj?.props?.children;

    if (children instanceof Array) {
      for (let index = 0; index < children.length; index++) {
        const pathString = parentPath ? `${parentPath}.children[${index}]` : `.children[${index}]`;
        const target = recursive(children[index], obj, pathString, fn);
        if (target) return target;
      }
    } else if (children) {
      const pathString = parentPath ? `${parentPath}.children` : 'children';
      const target = recursive(children, obj, pathString, fn);
      if (target) return target;
    }
  }

  return recursive(object, undefined, '', fn);
}

export default {
  imageToBase64,
  getUploadFile,
  getThumbOption,
  downloadFile,
  previewFile,
  deepFindObject,
  deepFindJsx,
};
export type { DUploadFile, ThumbOptionProps };
