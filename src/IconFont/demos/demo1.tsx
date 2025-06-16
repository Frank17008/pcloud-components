import * as React from 'react';
import { IconFont } from '@pointcloud/pcloud-components';

// 在实际项目入口处(App.tsx)引用, 只调用一次
IconFont.setIconfontScriptUrl('//at.alicdn.com/t/c/font_4832904_udb1bykw4ze.js');

// 普通组件处调用
const Demo1: React.FC = () => {
  return (
    <IconFont
      type="icon-phone"
      onClick={(e) => {
        console.log(e);
      }}
    />
  );
};
export default Demo1;
