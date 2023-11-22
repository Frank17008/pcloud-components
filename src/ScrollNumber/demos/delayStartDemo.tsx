import { useEffect, useState } from 'react';
import { ScrollNumber } from '@pointcloud/pcloud-components';

export default () => {
  const [count, setCount] = useState<number>(5);
  useEffect(() => {
    if (count > 0) {
      setTimeout(() => {
        setCount(count - 1);
      }, 1000);
    }
  }, [count]);
  return (
    <>
      <span>倒计时: {count} 秒</span>
      <ScrollNumber end={1001} decimals={0} separator={','} delay={5} />
    </>
  );
};
