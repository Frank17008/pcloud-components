import * as React from 'react';
import { IconFont } from '@pointcloud/pcloud-components';

// 在实际项目入口处(App.tsx)引用, 只调用一次
IconFont.setIconfontScriptUrl('//at.alicdn.com/t/c/font_4832904_udb1bykw4ze.js');

const Demo2: React.FC = () => {
  return <IconFont type="icon-top11" scriptUrl={'//at.alicdn.com/t/c/font_4415087_ldl8rc9i9k.js'} />;
};
export default Demo2;
