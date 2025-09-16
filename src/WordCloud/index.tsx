import { useCallback, useContext, useEffect, useRef } from 'react';
import classNames from 'classnames';
import WordCloud2 from 'wordcloud';
import { ConfigContext } from '../ConfigProvider';

export type WordCloudProps = {
  list: WordCloud2.Options['list'];
  className?: string;
  tooltip?: boolean;
  onClick?: WordCloud2.EventCallback;
  options?: Partial<Omit<WordCloud2.Options, 'list' | 'hover' | 'click'>>;
};

const DEFAULT_OPTIONS = {
  shuffle: true,
  shape: 'circle',
  backgroundColor: '#ffffff',
  fontFamily: 'Arial, sans-serif',
  fontWeight: 'bold',
  color: 'random-dark',
  gridSize: 4,
  weightFactor: 1,
  rotateRatio: 0.5,
  rotationSteps: 10,
  minSize: 12,
  drawMask: false,
  drawOutOfBound: false,
  shrinkToFit: true,
};

const WordCloud = (props: WordCloudProps) => {
  const { className = '', list = [], tooltip = true, onClick, options = DEFAULT_OPTIONS } = props;
  const containerRef = useRef<HTMLCanvasElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const { prefixCls, getPrefixCls }: any = useContext(ConfigContext);
  const classname = getPrefixCls('word-cloud');
  const wrapperClass = classNames({ [`${prefixCls}-word-cloud`]: !!prefixCls }, classname, className);

  const handleTooltip = useCallback(
    (item, diemension, event) => {
      if (item) {
        tooltipRef.current!.innerHTML = item[0] as string;
        tooltipRef.current!.style.left = `${event.offsetX}px`;
        tooltipRef.current!.style.top = `${event.offsetY - item[1] - 10}px`;
        tooltipRef.current!.style.opacity = '1';
      } else {
        tooltipRef.current!.style.opacity = '0';
        tooltipRef.current!.innerHTML = '';
      }
    },
    [tooltipRef.current],
  );

  useEffect(() => {
    if (containerRef.current) {
      // 获取容器的实际显示尺寸
      const container = containerRef.current;
      const rect = container.getBoundingClientRect();

      // 设置canvas的实际渲染尺寸(乘以设备像素比)
      const dpr = window.devicePixelRatio || 1;
      container.width = rect.width * dpr;
      container.height = rect.height * dpr;

      // 调整canvas的CSS显示尺寸
      container.style.width = `${rect.width}px`;
      container.style.height = `${rect.height}px`;

      // 缩放canvas上下文以匹配设备像素比
      const ctx = container.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
      }
      WordCloud2(containerRef.current, { list, ...options, hover: tooltip ? handleTooltip : undefined, click: onClick ? onClick : undefined });
    }
    return () => {
      WordCloud2.stop();
    };
  }, [list, options, containerRef.current]);

  // useEffect(() => {
  //   if(containerRef.current) {
  //     containerRef.current.addEventListener('wordcloudstart', (event) => {
  //     });
  //     containerRef.current.addEventListener('wordclouddrawn', (event) => {
  //     });
  //     containerRef.current.addEventListener('wordcloudstop', (event) => {
  //     });
  //   }
  // }, []);
  return (
    <div className={wrapperClass} style={{ position: 'relative', width: '100%', height: '100%' }}>
      <canvas ref={containerRef} style={{ width: '100%', height: '100%' }}></canvas>
      <div
        className="tooltip"
        ref={tooltipRef}
        style={{
          position: 'absolute',
          transition: 'left,top 0.4s',
          top: 0,
          left: 0,
          opacity: 0,
          padding: '10px 5px',
          background: 'rgba(0,0,0,0.8)',
          color: '#fff',
          borderRadius: '4px',
          zIndex: 999,
        }}
      ></div>
    </div>
  );
};

export default WordCloud;
