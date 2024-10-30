import { PictureCard, PictureCardProps, LabelValue } from '@pointcloud/pcloud-components';
import { useState } from 'react';
import { Radio } from 'antd';

export default () => {
  const [layout, setLayout] = useState<PictureCardProps['layout']>('horizontal');
  const onRadioChange = (e) => setLayout(e.target.value);

  return (
    <>
      <div>
        <Radio.Group
          onChange={onRadioChange}
          value={layout}
          style={{ marginBottom: 20 }}
          options={[
            { label: '水平', value: 'horizontal' },
            { label: '垂直', value: 'vertical' },
          ]}
        />
      </div>
      <PictureCard
        style={{ width: 200 }}
        imageWidth={100}
        layout={layout}
        src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        content={
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <LabelValue label="姓名" value="Aliaf" emptyValue="--" />
            <LabelValue label="年龄" value="18" emptyValue="--" />
            <LabelValue label="性别" value="女" emptyValue="--" />
          </div>
        }
      />
    </>
  );
};
