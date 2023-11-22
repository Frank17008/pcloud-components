import { Button } from 'antd';
import { useRef } from 'react';
import { ScrollNumber } from '@pointcloud/pcloud-components';

const HooksDemo = () => {
  const countUpRef = useRef(null);
  const { start, pauseResume, reset, update } = ScrollNumber.useCountUp({
    ref: countUpRef,
    start: 0,
    end: 123456,
    delay: 5,
    duration: 5,
    onReset: () => console.log('Resetted!'),
    onUpdate: () => console.log('Updated!'),
    onPauseResume: () => console.log('Paused or resumed!'),
    onStart: ({ pauseResume }) => console.log(pauseResume),
    onEnd: ({ pauseResume }) => console.log(pauseResume),
  });
  return (
    <div>
      <div ref={countUpRef} />
      <Button onClick={start}>Start</Button>
      <Button onClick={reset}>Reset</Button>
      <Button onClick={pauseResume}>Pause/Resume</Button>
      <Button onClick={() => update(2000)}>Update to 2000</Button>
    </div>
  );
};

export default HooksDemo;
