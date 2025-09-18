import { ContextMenu } from '@pointcloud/pcloud-components';
import { Space } from 'antd';
import { DeleteOutlined, EditOutlined, CopyOutlined } from '@ant-design/icons';

export default () => {
  const menuItems = (
    <>
      <div className="ant-context-menu-item">
        <EditOutlined /> 编辑
      </div>
      <div
        className="ant-context-menu-item"
        onClick={() => {
          navigator.clipboard.writeText('复制内容');
          alert('已复制到剪贴板');
        }}
      >
        <CopyOutlined /> 复制
      </div>
      <div className="ant-context-menu-item-divider" />
      <div className="ant-context-menu-item" style={{ color: '#ff4d4f' }}>
        <DeleteOutlined /> 删除
      </div>
    </>
  );

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <ContextMenu trigger={<div style={{ padding: 24, background: '#f5f5f5', textAlign: 'center' }}>在此区域右键点击</div>}>{menuItems}</ContextMenu>
    </Space>
  );
};
