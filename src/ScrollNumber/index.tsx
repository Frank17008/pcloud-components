import { useMemo, useContext } from 'react';
import CountUp, { CountUpProps as ICountUpProps, useCountUp } from 'react-countup';
import classNames from 'classnames';
import { ConfigContext } from '../ConfigProvider';

const ScrollNumber = (props: ICountUpProps) => {
  const { start = 0, end, decimals = 2, separator = ',', className = '', delay = 0, children } = props;
  const { prefixCls, getPrefixCls }: any = useContext(ConfigContext);
  const classname = getPrefixCls('scroll-number');
  const wrapperClass = classNames({ [`${prefixCls}-scroll-number`]: !!prefixCls }, classname, className);
  const config = useMemo(() => {
    const num = `${end}`;
    if (num.length < 2) return { num: end, duration: 0.8 };
    if (num.length < 4) return { num: end, duration: 1.5 };
    return { num: end, duration: 1.8 };
  }, [end]);
  return (
    <div className={wrapperClass}>
      <CountUp
        {...props}
        className={className}
        start={start}
        end={config?.num}
        duration={config?.duration}
        delay={delay}
        decimals={decimals}
        separator={separator}
      >
        {children}
      </CountUp>
    </div>
  );
};

ScrollNumber.useCountUp = useCountUp;
export type ScrollNumberProps = ICountUpProps;
export default ScrollNumber;
