/*
 * @Author       : wangfeihu
 * @Date         : 2023-06-16 09:37:07
 * @LastEditors  : wangfeihu
 * @LastEditTime : 2023-06-30 16:32:19
 * @Description  : 基于antd的Upload组件
 */

import React, {
  forwardRef,
  ReactElement,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
  useContext,
} from 'react';
import { Upload, UploadProps } from 'antd';
import { UploadChangeParam } from 'antd/lib/upload';

import helper, { DUploadFile, ThumbOptionProps } from './helper';

import { ConfigContext } from '@/ConfigProvider';

import './index.less';

type DUploadProps = Omit<
  UploadProps,
  'fileList' | 'onChange' | 'customRequest' | 'onRemove' | 'onDownload' | 'onPreview'
> & {
  /** 初始文件列表(相当于defaultFileList,但优先级高于defaultFileList) */
  value?: DUploadFile | DUploadFile[];
  /** 文件列表(在Form组件中表现为受控列表，在一般情况下相当于初始文件列表，其优先级高于value属性) */
  fileList?: DUploadFile | DUploadFile[];
  /** 文件列表变化时的回调函数 */
  // eslint-disable-next-line no-unused-vars
  onChange?: (list: DUploadFile[], info: UploadChangeParam<DUploadFile>) => void;
  /** 文件上传时的回调函数，支持Promise */
  // eslint-disable-next-line no-unused-vars
  customRequest?: (
    file: DUploadFile,
    list: DUploadFile[],
    requestOption: any,
  ) => DUploadFile[] | Promise<DUploadFile[] | void> | void;
  /** 点击删除按钮时的回调，支持Promise */
  // eslint-disable-next-line no-unused-vars
  onRemove?: (
    file: DUploadFile,
    list: DUploadFile[],
  ) => DUploadFile[] | Promise<DUploadFile[] | void> | void;
  /** 点击下载按钮时的回调，支持Promise */
  // eslint-disable-next-line no-unused-vars
  onDownload?: (file: DUploadFile) => DUploadFile | Blob | Promise<DUploadFile | Blob> | void;
  /** 点击预览按钮时的回调，支持Promise */
  // eslint-disable-next-line no-unused-vars
  onPreview?: (file: DUploadFile) => DUploadFile | Blob | Promise<DUploadFile | Blob> | void;
  /** 上传按钮，等同于children但优先于children */
  uploadButton?: ReactNode;
  /** 上传文件时的缩略图选项,null表示不生成缩略图 */
  thumbOption?: ThumbOptionProps | null;
  /** 列表项样式类名 */
  itemClassName?: string;
  // 是否强制允许文件预览
  // eslint-disable-next-line no-unused-vars
  enablePreview?: boolean | ((file: DUploadFile) => boolean);
};

const defaultUploadButton = (
  <div>
    <span style={{ fontSize: 18 }}>+</span>
    <div style={{ marginTop: 8 }}>上传</div>
  </div>
);

function downloadFn(file: DUploadFile | Blob) {
  if (file instanceof Blob) {
    helper.downloadFile(file);
  } else if (file?.url) {
    const fileName = file?.fileName || file?.name || file?.id || file?.uid;
    helper.downloadFile(file.url, typeof fileName === 'number' ? String(fileName) : fileName);
  } else {
    if (file) throw new TypeError(`返回值必须是Blob或Dupload对象,但却得到一个: ${typeof file}`);
  }
}

function previewFn(file: DUploadFile | Blob) {
  if (file instanceof Blob) {
    helper.previewFile(file);
  } else if (file?.url) {
    helper.previewFile(file.url);
  } else {
    if (file) throw new TypeError(`返回值必须是Blob或Dupload对象,但却得到一个: ${typeof file}`);
  }
}

function downloadOrPreview(file: DUploadFile, fn, execFn) {
  if (typeof fn === 'function') {
    const resultFile = fn(file);
    if (resultFile && 'then' in resultFile && typeof resultFile.then === 'function') {
      resultFile.then((_file) => execFn(_file));
    } else {
      execFn(resultFile);
    }
    // 默认的预览逻辑
  } else {
    execFn(file);
  }
}

function InternalUpload(props: DUploadProps, ref: React.Ref<unknown>) {
  const {
    value,
    thumbOption,
    uploadButton,
    itemClassName = '',
    enablePreview,
    className = '',
    maxCount = 10,
    children,
    itemRender,
    customRequest,
    onRemove,
    onDownload,
    onPreview,
    onChange,
    defaultFileList,
    showUploadList,
    fileList: _fileList,
    ...otherProps
  } = props;

  const { getPrefixCls }: any = useContext(ConfigContext);

  const [fileList, setFileList] = useState<DUploadFile[]>([]);

  // 缓存的文件列表
  const listRef = useRef<{ timer: any; list: DUploadFile[] }>({ timer: null, list: [] });

  // 缩略图相关选项
  const _thumbOption = useMemo(
    () => (thumbOption === null ? thumbOption : helper.getThumbOption(thumbOption)),
    [thumbOption],
  );

  function updateFileList(
    file: DUploadFile,
    status: DUploadFile['status'],
    needChange = true,
    thumbUrl?,
  ) {
    file.status = status;
    file.thumbUrl = thumbUrl;
    file.id = file.uid;

    const list = [...listRef.current.list];
    setFileList(list);
    if (onChange && needChange) {
      onChange(list, { file: file, fileList: list });
    }
  }

  const customRequestFun = async (requestOption) => {
    const { file } = requestOption;
    // 若超出最大限制则不上传
    if (listRef.current.list.filter((item) => item?.status !== 'removed').length >= maxCount)
      return;

    // 标记当前文件为新上传的
    file.source = 'upload';

    // 用户自定义的上传逻辑
    if (typeof customRequest === 'function') {
      const list = customRequest(file, listRef.current.list, requestOption);
      if (list && 'then' in list && typeof list.then === 'function') {
        list.then((list) => {
          if (list) {
            setFileList([...list]);
            listRef.current.list = [...list];
            onChange?.(list, { file: file, fileList: list });
          }
        });
      } else if (list instanceof Array) {
        if (list) {
          setFileList([...list]);
          listRef.current.list = [...list];
          onChange?.(list, { file: file, fileList: list });
        }
      }
    } else {
      // 默认的上传逻辑
      listRef.current.list.push(file);

      if (_thumbOption && typeof _thumbOption.getThumbUrl === 'function') {
        updateFileList(file, 'uploading');
        try {
          const base64Url = await _thumbOption.getThumbUrl(file, _thumbOption);
          updateFileList(file, 'done', false, base64Url);
        } catch (err) {
          _thumbOption.onError?.(err);
          updateFileList(file, 'done', false);
        }
      }
      // 添加base64缩略图
      else if (_thumbOption && _thumbOption.filter?.(file)) {
        const _compress = file.size > _thumbOption.size ? _thumbOption.compress : null;
        updateFileList(file, 'uploading');
        try {
          const base64Url = await helper.imageToBase64(file, _compress);
          updateFileList(file, 'done', false, base64Url);
        } catch (err) {
          _thumbOption.onError?.(err);
          updateFileList(file, 'done', false);
        }
      } else {
        updateFileList(file, 'done');
      }
    }
  };

  const onRemoveFun = (file: DUploadFile) => {
    // 用户自定义的删除逻辑
    if (typeof onRemove === 'function') {
      const list = onRemove(file, listRef.current.list);
      if (list && 'then' in list && typeof list.then === 'function') {
        list.then((list) => {
          if (list) {
            setFileList([...list]);
            onChange?.(list, { file: file, fileList: list });
          }
        });
      } else if (list instanceof Array) {
        if (list) {
          setFileList([...list]);
          onChange?.(list, { file: file, fileList: list });
        }
      }
    } else {
      // 默认的删除逻辑
      if (file.source === 'upload') {
        const index = listRef.current.list.findIndex((item) => item.uid === file.uid);
        if (index >= 0) listRef.current.list.splice(index, 1);
      } else {
        file.status = 'removed';
      }
      const list = [...listRef.current.list];
      setFileList(list);
      onChange?.(list, { file: file, fileList: list });
    }
  };

  const _onDownload = (file) => downloadOrPreview(file, onDownload, downloadFn);

  const _onPreview = (file) => downloadOrPreview(file, onPreview, previewFn);

  // 拦截listItem的渲染，添加类名,强制修改预览图标的样式
  const _itemRender = (originNode: ReactElement, file: DUploadFile) => {
    // 给列表项添加类名,用以修改预览图标样式
    const _enablePreview =
      typeof enablePreview === 'function' ? enablePreview(file) : enablePreview;
    const _itemClassName = _enablePreview
      ? `${originNode.props.className} ${itemClassName} preview`
      : `${originNode.props.className} ${itemClassName}`;
    const _originNode = {
      ...originNode,
      props: {
        ...originNode.props,
        title: file?.fileName || file?.name || '',
        className: _itemClassName,
      },
    };

    // 解决下载、删除按钮在Form组件 disable状态下被禁用的问题
    const action = helper.deepFindJsx(
      _originNode,
      (item) => item.props?.className === 'ant-upload-list-item-actions' && item.type === 'span',
    );
    if (action) {
      // 查找下载、删除图标，将其外层包裹的的Button组件删除掉
      const actionChildren = action.props.children.map((item, index) => {
        if (index > 0) {
          let children = item?.props?.children || item?.props?.icon;
          if (children?.props) {
            children = {
              ...children,
              key: index,
              props: {
                title: item.props.title,
                ...children.props,
                onClick: (e) => item.props.onClick?.(e),
              },
            };
          }
          return children || item;
        }
        return item;
      });

      // 替换修改后的action
      const children = [..._originNode.props.children];
      children[1] = { ...children[1], props: { ...children[1].props, children: actionChildren } };
      const _originNodeClone = { ..._originNode, props: { ..._originNode.props, children } };
      return _originNodeClone;
    }

    return _originNode;
  };

  const _showUploadList =
    typeof showUploadList === 'boolean'
      ? showUploadList
      : { ...showUploadList, showPreviewIcon: true, showDownloadIcon: true };

  const _finalFileList: any = listRef.current.list.filter((item) => item.status !== 'removed');

  const _props: UploadProps = {
    maxCount,
    action: undefined,
    className: `${getPrefixCls('upload')} ${className}`,
    // @ts-ignore
    fileList,
    itemRender: itemRender || _itemRender,
    customRequest: customRequestFun,
    onRemove: onRemoveFun,
    onDownload: _onDownload,
    onPreview: _onPreview,
    showUploadList: _showUploadList,
    ...otherProps,
  };

  const _uploadButton =
    uploadButton === null ? null : uploadButton || children || defaultUploadButton;

  useEffect(() => {
    const list = helper.getUploadFile(_fileList || value || defaultFileList, maxCount);
    listRef.current.list = list;
    setFileList(list);
  }, [_fileList, value, defaultFileList]);

  return (
    <Upload listType="picture-card" {..._props} fileList={_finalFileList} ref={ref}>
      {_finalFileList.length >= maxCount ? null : _uploadButton}
    </Upload>
  );
}

const DUpload = forwardRef(InternalUpload) as React.ForwardRefExoticComponent<
  DUploadProps & React.RefAttributes<unknown>
> & {
  imageToBase64: typeof helper.imageToBase64;
};

DUpload.imageToBase64 = helper.imageToBase64;

export type { DUploadProps, DUploadFile };
export default DUpload;
