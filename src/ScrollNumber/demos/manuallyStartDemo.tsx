import { Button } from 'antd';
import { ScrollNumber } from '@pointcloud/pcloud-components';

export default () => {
  return (
    <ScrollNumber start={0} end={1001} decimals={0} separator={','}>
      {({ countUpRef, start }) => (
        <div>
          <span ref={countUpRef} />
          <Button style={{ marginLeft: '10px' }} type="primary" onClick={start}>
            点击开始
          </Button>
        </div>
      )}
    </ScrollNumber>
  );
};
