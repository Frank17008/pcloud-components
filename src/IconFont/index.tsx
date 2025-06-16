import React from 'react';
import { createFromIconfontCN, getTwoToneColor, setTwoToneColor } from '@ant-design/icons';

let scriptUrls: string[] = [];

const setIconfontScriptUrl = (urls: string | string[]) => {
  scriptUrls = Array.isArray(urls) ? urls : [urls];
};

export interface IconFontProps {
  type: string;
  scriptUrl?: string | string[]; // 可选组件级配置
  className?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

interface IconFontType extends React.FC<IconFontProps> {
  setIconfontScriptUrl: typeof setIconfontScriptUrl;
  getTWoToneColor: typeof getTwoToneColor;
  setTwoToneColor: typeof setTwoToneColor;
}
const IconFont: IconFontType = ({ scriptUrl: propScriptUrl, ...restProps }) => {
  const finalScriptUrls = propScriptUrl ? (Array.isArray(propScriptUrl) ? propScriptUrl : [propScriptUrl]) : scriptUrls;

  if (!finalScriptUrls.length) {
    console.error('IconFont 组件需要配置 scriptUrl，请在项目入口处先调用 setIconfontScriptUrl() 或在组件 props 中传入 scriptUrl');
    return null;
  }

  const IconComponent = createFromIconfontCN({ scriptUrl: finalScriptUrls });

  return <IconComponent {...restProps} />;
};

IconFont.setIconfontScriptUrl = setIconfontScriptUrl;
IconFont.getTWoToneColor = getTwoToneColor;
IconFont.setTwoToneColor = setTwoToneColor;

export default IconFont;
