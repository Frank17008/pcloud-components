import { ScrollNumber } from '@pointcloud/pcloud-components';

const SimpleHook = () => {
  ScrollNumber.useCountUp({ ref: 'counter', end: 5000 });
  return <span id="counter" />;
};
export default SimpleHook;
