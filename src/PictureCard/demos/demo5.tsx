import { PictureCard, LabelValue } from '@pointcloud/pcloud-components';

export default () => {
  return (
    <PictureCard
      preview
      imageWidth={100}
      src={[
        'https://q.qqbiaoqing.com/q/2011-6-30/2632a6a5e0e13deb1a6e148ee159ba47.gif',
        'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
        'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
      ]}
      content={
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <LabelValue label="姓名" value="Aliaf" emptyValue="--" />
          <LabelValue label="年龄" value="18" emptyValue="--" />
        </div>
      }
    />
  );
};
