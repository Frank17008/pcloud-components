import { PictureCard, LabelValue } from '@pointcloud/pcloud-components';

export default () => {
  return (
    <PictureCard
      preview
      imageWidth={100}
      src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
      content={
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <LabelValue label="姓名" value="Aliaf" emptyValue="--" />
          <LabelValue label="年龄" value="18" emptyValue="--" />
          <LabelValue label="性别" value="女" emptyValue="--" />
        </div>
      }
    />
  );
};
