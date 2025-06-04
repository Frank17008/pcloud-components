import { Rnd, Props } from 'react-rnd';
import { useContext } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../ConfigProvider';
const RndDrag = (props: Props) => {
  const { children, className, ...rest } = props;
  const { prefixCls, getPrefixCls }: any = useContext(ConfigContext);
  const classname = getPrefixCls('rnd-drag');
  const wrapperClass = classNames({ [`${prefixCls}-rnd-drag`]: !!prefixCls }, classname, className);

  return (
    <Rnd className={wrapperClass} bounds="parent" {...rest}>
      {children}
    </Rnd>
  );
};

export default RndDrag;
export type { Props as RndDragProps } from 'react-rnd';
export type { DraggableData, Position, Grid, RndDragCallback, RndDragEvent, RndResizeStartCallback, HandleStyles } from 'react-rnd';
