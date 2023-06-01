import * as React from 'react';
import { AdvancedFilter } from '@pointcloud/pcloud-components';
import { CaretDownOutlined } from '@ant-design/icons';

export default () => {
  const formItemConfig = [
    {
      label: '姓名',
      type: 'input',
      name: 'name',
    },
    {
      label: '年龄',
      type: 'input',
      name: 'age',
    },
  ];
  return (
    <AdvancedFilter
      formItemConfig={formItemConfig}
      icon={<CaretDownOutlined />}
      inputProps={{
        name: 'keyWords',
        inputSearch: (v: string) => {
          console.info(v);
        },
      }}
    />
  );
};
