import React, { useRef, useEffect } from 'react';

export interface AspectRatioProps {
  ratio?: number; // 默认 16/9
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

function AspectRatio({ ratio = 16 / 9, className = '', children, style }: AspectRatioProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 兼容旧浏览器：如果不支持 aspect-ratio，则用 padding-top
    const el = ref.current;
    if (!el) return;
    const test = document.createElement('div');
    if (!('aspectRatio' in test.style)) {
      // 不支持 aspect-ratio
      el.style.position = 'relative';
      el.style.width = '100%';
      el.style.height = '';
      el.style.paddingTop = `${100 / ratio}%`;
      // 包裹 children 的 div 绝对定位
      if (el.firstElementChild) {
        (el.firstElementChild as HTMLElement).style.position = 'absolute';
        (el.firstElementChild as HTMLElement).style.inset = '0';
        (el.firstElementChild as HTMLElement).style.width = '100%';
        (el.firstElementChild as HTMLElement).style.height = '100%';
      }
    }
  }, [ratio]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        aspectRatio: `${ratio}`,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default AspectRatio;
