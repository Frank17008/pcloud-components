import React from 'react';
import { ContextMenu } from '@pointcloud/pcloud-components';
import { Space, Menu } from 'antd';
import type { MenuProps } from 'antd';

export default () => {
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: '选项1',
    },
    {
      key: '2',
      label: '选项2',
    },
    {
      type: 'divider',
    },
    {
      key: '3',
      label: '选项3',
      disabled: true,
    },
  ];

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <ContextMenu trigger={<div style={{ padding: 24, background: '#f5f5f5', textAlign: 'center' }}>使用 Antd Menu 组件</div>}>
        <Menu items={items} style={{ border: 'none' }} />
      </ContextMenu>
    </Space>
  );
};
