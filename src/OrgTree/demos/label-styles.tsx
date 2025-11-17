import React, { useState } from 'react';
import { Radio, InputNumber, Switch } from 'antd';
import { OrgTree } from '@pointcloud/pcloud-components';
import './label-style.less';

// 示例数据
const generateOrgData = () => ({
  id: '1',
  label: '总经理',
  children: [
    {
      id: '2',
      label: '技术部经理',
      children: [
        {
          id: '3',
          label: '前端工程师张三',
        },
        {
          id: '4',
          label: '后端工程师李四',
        },
      ],
    },
    {
      id: '5',
      label: '市场部经理',
      children: [
        {
          id: '6',
          label: '市场专员王五',
        },
      ],
    },
    {
      id: '7',
      label: '人事行政部',
      children: [
        {
          id: '8',
          label: '人事专员赵六',
        },
        {
          id: '9',
          label: '行政助理钱七',
        },
      ],
    },
  ],
});

const LabelStylesDemo: React.FC = () => {
  const [labelWidth, setLabelWidth] = useState<number>(120);
  const [labelClassName, setLabelClassName] = useState<string>('custom-label-1');
  const [data] = useState(generateOrgData());
  const [showCustomStyles, setShowCustomStyles] = useState(true);

  // 调整宽度
  const handleWidthChange = (value: number | null) => {
    if (value !== null) {
      setLabelWidth(value);
    }
  };

  // 切换样式类
  const handleStyleClassChange = (e) => {
    setLabelClassName(e.target.value);
  };

  // 切换是否显示自定义样式
  const toggleCustomStyles = () => {
    setShowCustomStyles(!showCustomStyles);
  };

  return (
    <div className="org-tree-label-styles-demo">
      <div className="demo-controls">
        <div className="control-item">
          <div className="control-label">标签宽度: {labelWidth}px</div>
          <InputNumber min={50} max={400} value={labelWidth} onChange={handleWidthChange} style={{ width: 120 }} />
        </div>

        <div className="control-item">
          <div className="control-label">标签样式类：</div>
          <Radio.Group value={labelClassName} onChange={handleStyleClassChange}>
            <Radio.Button value="custom-label-1">样式一</Radio.Button>
            <Radio.Button value="custom-label-2">样式二</Radio.Button>
            <Radio.Button value="custom-label-3">样式三</Radio.Button>
          </Radio.Group>
        </div>

        <div className="control-item">
          <span>{showCustomStyles ? '禁用' : '启用'}自定义样式</span>
          <Switch checked={showCustomStyles} onChange={toggleCustomStyles} />
        </div>
      </div>
      <div className="org-tree-container">
        <OrgTree data={data} labelWidth={showCustomStyles ? labelWidth : 120} labelClassName={showCustomStyles ? labelClassName : 'white'} expandAll={true} />
      </div>
    </div>
  );
};

export default LabelStylesDemo;
