/*
 * @Author       : wangfeihu
 * @Date         : 2023-06-02 09:29:11
 * @LastEditors  : wangfeihu
 * @LastEditTime : 2023-08-16 17:44:33
 * @Description  : 基于antd的Form组件
 */

import React, { forwardRef, useContext, ReactNode, useState, useEffect, useImperativeHandle } from 'react';
import { Form, FormProps, Row, Col } from 'antd';
import { ConfigContext } from '@pointcloud/pcloud-components/ConfigProvider';
import helper from './helper';
import DItem from './DItem';
import type { DItemProps } from './DItem';
import './index.less';

type InternalFormProps = {
  /** 表单项数组,可以通过数组的形式添加表单项 */
  items?: DItemProps[];
  /** 统一设置items的默认属性 */
  defaultItemProps?: DItemProps;
  /** children 方式添加表单项,如果同时设置了 items，则 children 在 items 下面 */
  children?: ReactNode;
  /** 布局方式 新增了行内垂直布局方式inlineVertical 和 grid栅格布局 */
  layout?: 'inline' | 'horizontal' | 'vertical' | 'inlineVertical' | 'grid';
};

type DFormProps = Omit<FormProps, 'children' | 'layout'> & InternalFormProps;

// eslint-disable-next-line no-unused-vars
type DFormRefProps = { setItems: (items: DItemProps[] | ((values: DItemProps[]) => DItemProps[] | Promise<DItemProps[]>)) => void } | undefined;

function getChildren(items, children: DFormProps['children'], _defaultItemProps: DFormProps['defaultItemProps'], layout: InternalFormProps['layout']) {
  let list: ReactNode[] = [];
  if (items instanceof Array && items.length > 0) {
    if (layout === 'grid') {
      list.push(
        <Row key="row">
          {items.map((item: DItemProps, index) => {
            const _item = helper.merge(_defaultItemProps, item);
            const _gridProps = _item?.formItemProps?.grid || {};
            return (
              <Col key={item?.name || index} {..._gridProps}>
                <DItem {..._item} />
              </Col>
            );
          })}
        </Row>,
      );
    } else {
      list = items.map((item: DItemProps, index) => {
        const _item = helper.merge(_defaultItemProps, item);
        return <DItem key={item?.name || index} {..._item} />;
      });
    }
  }
  if (children) {
    const childrenList = children instanceof Array ? children : [children];
    const _childrenList = childrenList.map((item) => ({ ...item, props: helper.merge(_defaultItemProps, item.props) }));
    list = list.concat(_childrenList);
  }
  return list;
}

function InternalForm(props: DFormProps, ref: React.Ref<DFormRefProps>) {
  const { className = '', defaultItemProps, items, children, layout = 'vertical', autoComplete = 'off', ...otherProps } = props;

  const { getPrefixCls }: any = useContext(ConfigContext);

  const _className = `${getPrefixCls('form')} ${className} ${['inlineVertical', 'grid'].includes(layout) ? 'inlineVertical' : ''}`;

  const _layout = ['inlineVertical', 'grid'].includes(layout) ? 'inline' : (layout as FormProps['layout']);

  const [itemChildren, setItemChildren] = useState(getChildren(items, children, defaultItemProps, layout));

  useEffect(() => {
    setItemChildren(getChildren(items, children, defaultItemProps, layout));
  }, [items, children, defaultItemProps, layout]);

  useImperativeHandle(
    ref,
    () => ({
      setItems: (value) => {
        if (value instanceof Array) {
          setItemChildren(getChildren(value, null, defaultItemProps, layout));
        } else if (typeof value === 'function') {
          const result = value(items || []);
          if ('then' in result) {
            result.then((list) => {
              setItemChildren(getChildren(list, null, defaultItemProps, layout));
            });
          } else {
            setItemChildren(getChildren(result, null, defaultItemProps, layout));
          }
        }
      },
    }),
    [items, children, defaultItemProps],
  );

  return (
    <Form {...otherProps} className={_className} layout={_layout} autoComplete={autoComplete}>
      <div className="form-wrapper">{itemChildren}</div>
    </Form>
  );
}

const DForm = forwardRef(InternalForm) as React.ForwardRefExoticComponent<DFormProps & React.RefAttributes<DFormRefProps>> & {
  Item: typeof DItem;
  useForm: typeof Form.useForm;
  useFormInstance: typeof Form.useFormInstance;
  useWatch: typeof Form.useWatch;
  List: typeof Form.List;
  ErrorList: typeof Form.ErrorList;
};

DForm.Item = DItem;
DForm.List = Form.List;
DForm.ErrorList = Form.ErrorList;
DForm.useForm = Form.useForm;
DForm.useFormInstance = Form.useFormInstance;
DForm.useWatch = Form.useWatch;

export { type DFormProps, type DFormRefProps, type DItemProps };

export default DForm;
