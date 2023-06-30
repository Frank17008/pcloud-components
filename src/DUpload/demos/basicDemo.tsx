import React from 'react';
import { DUpload } from '@pointcloud/pcloud-components';

export default function BasicDemo() {
  const onChange = (files) => {
    console.log('files: ', files);
  };

  return <DUpload multiple onChange={onChange} />;
}
