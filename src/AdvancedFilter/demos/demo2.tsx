import * as React from 'react';
import { AdvancedFilter } from '@pointcloud/pui-components';
import { CaretDownOutlined } from '@ant-design/icons';
import { Button } from 'antd';

export default () => {
  const formItemConfig = [
    {
      label: '筛选项1',
      type: 'input',
      name: 'name',
    },
    {
      label: '性别',
      type: 'select',
      name: 'hight',
      options: [
        { label: '男', value: '1' },
        { label: '女', value: '2' },
      ],
    },
  ];
  return (
    <AdvancedFilter
      formItemConfig={formItemConfig}
      icon={<CaretDownOutlined />}
      left={<Button>按钮1</Button>}
      inputProps={{
        name: 'keyWords',
        inputSearch: (v: string) => {
          console.info(v);
        },
      }}
      right={<Button>按钮2</Button>}
    />
  );
};
