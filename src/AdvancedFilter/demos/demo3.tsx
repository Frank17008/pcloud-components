import * as React from 'react';
import { AdvancedFilter } from '@pointcloud/pcloud-components';
import { CaretDownOutlined } from '@ant-design/icons';
import { Button } from 'antd';

export default () => {
  const formItemConfig = [
    {
      label: '姓名',
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
    {
      label: '出生日期',
      type: 'datePicker',
      name: 'birthday',
    },
    {
      label: '时间范围',
      type: 'rangePicker',
      name: 'timeRange',
    },
    {
      label: '开关',
      type: 'switch',
      name: 'open',
    },
    {
      label: '是否学生',
      type: 'radio',
      name: 'isStudent',
      options: [
        { label: '是', value: '1' },
        { label: '否', value: '2' },
      ],
    },
    {
      label: '课程',
      type: 'checkbox',
      name: 'isStudent',
      options: [
        { label: '语文', value: '1' },
        { label: '数学', value: '2' },
      ],
    },
    {
      label: '组织结构',
      type: 'treeSelect',
      name: 'orgs',
      options: [
        {
          label: '根组织',
          value: '1',
          children: [
            {
              label: '一级组织1',
              value: '1-1',
              children: [{ label: '二级组织1', value: '2-1-1' }],
            },
            { label: '一级组织2', value: '1-2' },
          ],
        },
      ],
    },
  ];
  return (
    <AdvancedFilter
      formItemConfig={formItemConfig}
      icon={<CaretDownOutlined />}
      inputProps={{
        placeholder: '请输入关键字检索',
        name: 'keyWords',
        inputSearch: (v: string) => {
          console.info(v);
        },
      }}
    />
  );
};
