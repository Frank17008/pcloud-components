import { SignaturePad } from '@pointcloud/pcloud-components';
import type { SignaturePadHandle } from '../index';
import { Button, Space, message } from 'antd';
import { useRef, useState } from 'react';

export default () => {
  const [previewUrl, setPreviewUrl] = useState<string>();
  const signaturePadRef = useRef<SignaturePadHandle>(null);

  // 处理签名完成
  const handleDone = (dataUrl: string) => {
    setPreviewUrl(dataUrl);
    message.success('签名已更新！');
  };

  // 重新开始签名
  const handleReset = () => {
    signaturePadRef.current?.clear();
    setPreviewUrl(undefined);
  };

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <div style={{ border: '1px solid #d9d9d9', padding: 16, borderRadius: 8 }}>
        <h4>演示场景：</h4>
        <p>1. 点击&quot;完成&quot;按钮保存第一次签名</p>
        <p>2. 点击&quot;重新签名&quot;，将之前的签名作为背景重新签名</p>
        <p>3. 可以在已有签名的基础上继续修改</p>
      </div>

      <SignaturePad ref={signaturePadRef} width={600} height={200} defaultValue={previewUrl} onDone={handleDone} />

      <Space>
        <Button onClick={handleReset} disabled={!previewUrl}>
          重新签名
        </Button>
        {previewUrl && (
          <div style={{ marginLeft: 16 }}>
            <p>签名预览：</p>
            <img
              src={previewUrl}
              alt="签名预览"
              style={{
                maxWidth: '100%',
                border: '1px solid #d9d9d9',
                borderRadius: 4,
              }}
            />
          </div>
        )}
      </Space>
    </Space>
  );
};
