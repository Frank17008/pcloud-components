import { FormItemProps } from 'antd';

import itemsRender from './itemsRender';
import { DItemProps } from './itemType';

export type { DItemProps };

function DItem(props: DItemProps): JSX.Element {
  // @ts-ignore
  const { formItemProps, label = '', name, renderType, render, children, ...otherProps } = props;
  const _formItemProps: FormItemProps = { label, name, ...formItemProps };
  if (renderType === 'custom' || renderType === 'other') {
    return render ? <>{render(otherProps, _formItemProps, props)}</> : <>{children}</>;
  } else if (renderType) {
    return itemsRender[renderType](otherProps as any, _formItemProps, label, render, children);
  } else {
    return <></>;
  }
}

export default DItem;
