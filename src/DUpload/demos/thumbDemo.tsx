import React, { useState } from 'react';
import { Radio } from 'antd';

import { DUploadFile, DUploadProps, DUpload } from '@pointcloud/pcloud-components';

export default function ThumbDemo() {
  const [thumbOption, setThumbOption] = useState<DUploadProps['thumbOption']>();
  const [initList, setInitList] = useState([]);

  const onChange = (files) => {
    console.log('files: ', files);
  };

  const onRadioChange = (e) => {
    setInitList([]);
    const value = e.target.value;
    if (value === 'noThumb') {
      // 不生成缩略图
      setThumbOption(null);
    } else if (value === 'size') {
      // 大于5M开启缩略图压缩
      setThumbOption({ size: 5 * Math.pow(1024, 2) });
    } else if (value === 'compress') {
      // 缩略图尺寸及质量
      setThumbOption({
        size: 2 * Math.pow(1024, 2),
        compress: { width: 86, height: 86, quality: 0.1 },
      });
    } else if (value === 'justJpg') {
      // 仅对jpg图像生成缩略图
      setThumbOption({ filter: ['image/jpeg'] });
    } else if (value === 'justpng') {
      // 仅对png后缀图像生成缩略图
      const filterFn = (file: DUploadFile) => {
        const nameIndex: number = file.name.lastIndexOf('.');
        const extNmae = file.name.substring(nameIndex + 1)?.toLowerCase() || '';
        return extNmae === 'png';
      };
      setThumbOption({ filter: filterFn });
    } else if (value === 'customThumb') {
      const getThumbUrl = (file) => {
        const fileType: string = file?.type || '';
        return Promise.resolve(fileType.startsWith('image') ? DUpload.imageToBase64(file) : '/mock/dupload/picture/default.png');
      };
      setThumbOption({ getThumbUrl });
    } else if (value === 'default') {
      // 恢复默认
      setThumbOption(undefined);
    }
  };
  return (
    <div>
      <div style={{ marginBottom: '12px' }}>
        <span>默认值选项：</span>
        <Radio.Group onChange={onRadioChange}>
          <Radio value="noThumb">不生成缩略图</Radio>
          <Radio value="size">大于5M开启缩略图压缩</Radio>
          <Radio value="compress">缩略图尺寸及质量</Radio>
          <Radio value="justJpg">仅对jpg图像生成缩略图</Radio>
          <Radio value="justpng">仅对png后缀图像生成缩略图</Radio>
          <Radio value="customThumb">自定义生成缩略图</Radio>
          <Radio value="default">恢复默认</Radio>
        </Radio.Group>
      </div>
      <DUpload value={initList} multiple onChange={onChange} thumbOption={thumbOption} />
    </div>
  );
}
