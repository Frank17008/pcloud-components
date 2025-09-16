import { SignaturePad } from '@pointcloud/pcloud-components';
import { message } from 'antd';

export default () => {
  const handleDone = (dataUrl: string) => {
    message.success('签名完成！');
    console.log('签名图片URL:', dataUrl);
  };

  return <SignaturePad width={600} height={200} onDone={handleDone} />;
};
