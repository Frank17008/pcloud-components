/*
 * @Author       : wangfeihu
 * @Date         : 2023-06-02 09:29:11
 * @LastEditors  : wangfeihu
 * @LastEditTime : 2023-06-16 09:09:24
 * @Description  : 基于antd的Form组件
 */

import React, { forwardRef, useMemo, useContext, ReactNode } from 'react';
import { Form, FormProps, FormInstance } from 'antd';

import { ConfigContext } from '@pointcloud/pcloud-components/ConfigProvider';

import helper from './helper';
import DItem, { DItemProps, InternalItemProps } from './DItem';
import './index.less';

type InternalFormProps = {
  /** 表单项数组,可以通过数组的形式添加表单项 */
  items?: DItemProps[];
  /** 统一设置items的默认属性 */
  defaultItemProps?: DItemProps;
  /** children 方式添加表单项,如果同时设置了 items，则 children 在 items 下面 */
  children?: ReactNode;
  /** 布局方式 新增了行内垂直布局方式inlineVertical */
  layout?: 'inline' | 'horizontal' | 'vertical' | 'inlineVertical';
};

export type DFormProps = Omit<FormProps, 'children' | 'layout'> & InternalFormProps;

function getChildren(items, children: DFormProps['children'], _defaultItemProps: DFormProps['defaultItemProps']) {
  let list: ReactNode[] = [];
  if (items instanceof Array && items.length > 0) {
    list = items.map((item: InternalItemProps, index) => {
      const _item = helper.merge(_defaultItemProps, item);
      return <DItem key={item?.name || index} {..._item} />;
    });
  }
  if (children) {
    const childrenList = children instanceof Array ? children : [children];
    list = list.concat(childrenList);
  }
  return list;
}

function InternalForm(props: DFormProps, ref: React.Ref<FormInstance<any>>) {
  const { className = '', defaultItemProps, items, children, layout, ...otherProps } = props;

  const { getPrefixCls }: any = useContext(ConfigContext);

  const _className = `${getPrefixCls('form')} ${className} ${layout === 'inlineVertical' ? 'inlineVertical' : ''}`;

  const _layout = layout === 'inlineVertical' ? 'inline' : layout;

  const itemChildren = useMemo(() => getChildren(items, children, defaultItemProps), [items, children, defaultItemProps]);

  return (
    <Form {...otherProps} className={_className} layout={_layout} ref={ref}>
      <div className="form-wrapper">{itemChildren}</div>
    </Form>
  );
}

const DForm = forwardRef(InternalForm) as unknown as typeof InternalForm & { Item: typeof DItem };

DForm.Item = DItem;

export default DForm;
