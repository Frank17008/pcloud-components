/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useState, useContext } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '@pointcloud/pcloud-components/ConfigProvider';
import { Image, ImageProps } from 'antd';
import './index.less';

interface IPictureCardProps extends Omit<ImageProps, 'src' | 'width' | 'content'> {
  className?: string;
  layout?: 'vertical' | 'horizontal';
  src: ImageProps['src'] | ImageProps['src'][];
  imageWidth?: ImageProps['width'];
  content?: React.ReactNode;
  style?: React.CSSProperties;
  hoverable?: boolean;
  bordered?: boolean;
}

const PictureCard = (props: IPictureCardProps) => {
  const { className, layout = 'vertical', src, preview = false, imageWidth, content, style, bordered = true, hoverable = true } = props;
  const { prefixCls, getPrefixCls }: any = useContext(ConfigContext);
  const classname = getPrefixCls('picture-card');
  const wrapperClass = classNames(
    { [`${prefixCls}-picture-card`]: !!prefixCls },
    { [`${classname}-hoverable`]: hoverable, [`${classname}-bordered`]: bordered },
    classname,
    className,
    layout,
  );

  const [visible, setVisible] = useState<boolean>(false);

  return (
    <div className={wrapperClass} style={style}>
      {Array.isArray(src) ? (
        <>
          <Image
            src={src[0]}
            preview={preview && { visible: false }}
            width={imageWidth}
            onClick={(e) => {
              e.stopPropagation();
              // eslint-disable-next-line no-unused-expressions
              preview && setVisible(true);
            }}
          />
          <div style={{ display: 'none' }}>
            <Image.PreviewGroup preview={{ visible, onVisibleChange: (vis) => setVisible(vis) }}>
              {src.map((item) => (
                <Image key={item} src={item}></Image>
              ))}
            </Image.PreviewGroup>
          </div>
        </>
      ) : (
        <Image src={src} preview={preview} width={imageWidth}></Image>
      )}
      {content && <div className="info">{content}</div>}
    </div>
  );
};

export type PictureCardProps = IPictureCardProps;
export default PictureCard;
