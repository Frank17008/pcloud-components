import React, { useRef, useEffect, useCallback, useContext } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '@pointcloud/pcloud-components/ConfigProvider';
import { IAnimatedScrollListProps } from './interface';
import './styles/index.less';

function AnimatedScrollList(props: IAnimatedScrollListProps) {
  const {
    direction = 'up',
    speed = 50,
    hoverStop = true,
    autoStart = true,
    containerHeight,
    containerWidth,
    data = [],
    renderItem,
    itemKey = 'id',
    className = '',
    style = {},
    showScrollbar = false,
    scrollWhenInsufficient = false,
    header,
  } = props;

  const { prefixCls, getPrefixCls }: any = useContext(ConfigContext);
  const classname = getPrefixCls('animated-scroll-list');
  const wrapperClass = classNames({ [`${prefixCls}-animated-scroll-list`]: !!prefixCls }, classname, className);

  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number>(0);
  const currentOffsetRef = useRef<number>(0);
  const isHoveringRef = useRef<boolean>(false);
  const isPausedRef = useRef<boolean>(!autoStart);
  const totalSizeRef = useRef<number>(0);

  // 判断是否为垂直方向
  const isVertical = direction === 'up' || direction === 'down';
  // 是否反向滚动
  const isReverse = direction === 'down' || direction === 'right';

  // 获取列表项的 key
  const getItemKey = useCallback(
    (item: any, index: number): string | number => {
      if (typeof itemKey === 'function') {
        return itemKey(item, index);
      }
      return item?.[itemKey] ?? index;
    },
    [itemKey],
  );

  const parsePixelValue = useCallback((value?: string) => {
    const parsed = parseFloat(value || '');
    return Number.isNaN(parsed) ? 0 : parsed;
  }, []);

  // 计算列表项尺寸（包含元素自身尺寸和滚动方向上的 margin）
  const calculateItemDimensions = useCallback(() => {
    if (!contentRef.current || data.length === 0) {
      totalSizeRef.current = 0;
      return 0;
    }
    const items = contentRef.current.children;
    const firstGroupItems = Array.from(items).slice(0, data.length) as HTMLElement[];

    if (firstGroupItems.length === 0) {
      totalSizeRef.current = 0;
      return 0;
    }

    const totalSize = firstGroupItems.reduce((sum, item) => {
      const rect = item.getBoundingClientRect();
      const styles = window.getComputedStyle(item);
      const axisMargin = isVertical
        ? parsePixelValue(styles.marginTop) + parsePixelValue(styles.marginBottom)
        : parsePixelValue(styles.marginLeft) + parsePixelValue(styles.marginRight);
      const size = isVertical ? rect.height : rect.width;
      return sum + size + axisMargin;
    }, 0);

    totalSizeRef.current = totalSize;
    return totalSize;
  }, [data, isVertical, parsePixelValue]);

  const applyTransform = useCallback(
    (offset: number) => {
      if (!contentRef.current) return;
      const value = isVertical ? `translateY(${-offset}px)` : `translateX(${-offset}px)`;
      contentRef.current.style.transform = value;
    },
    [isVertical],
  );

  // 动画循环
  const animate = useCallback(
    (timestamp: number) => {
      if (!contentRef.current || isPausedRef.current || data.length === 0) {
        animationFrameRef.current = null;
        return;
      }

      if (lastTimestampRef.current === 0) {
        lastTimestampRef.current = timestamp;
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }
      const deltaSeconds = (timestamp - lastTimestampRef.current) / 1000;
      lastTimestampRef.current = timestamp;
      const distance = speed * deltaSeconds;

      // 计算新的偏移量
      // 反向滚动时，从 totalSize 开始递减；正向滚动时，从 0 开始递增
      let newOffset = isReverse ? currentOffsetRef.current - distance : currentOffsetRef.current + distance;

      // 如果总尺寸为 0，说明还没有计算完成，等待
      if (totalSizeRef.current === 0) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      // 无缝循环：当滚动超过一个完整列表的高度/宽度时，重置位置
      if (isReverse) {
        // 反向滚动：从 totalSize 开始向 0 滚动
        if (newOffset <= 0) {
          newOffset = totalSizeRef.current + newOffset;
        }
      } else {
        // 正向滚动：从 0 开始向 totalSize 滚动
        if (newOffset >= totalSizeRef.current) {
          newOffset = newOffset - totalSizeRef.current;
        }
      }

      currentOffsetRef.current = newOffset;

      // 应用 transform
      applyTransform(newOffset);

      animationFrameRef.current = requestAnimationFrame(animate);
    },
    [speed, isReverse, data.length, applyTransform],
  );

  // 启动动画
  const startAnimation = useCallback(() => {
    if (animationFrameRef.current || isPausedRef.current) return;
    lastTimestampRef.current = 0;
    animationFrameRef.current = requestAnimationFrame(animate);
  }, [animate]);

  // 停止动画
  const stopAnimation = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    lastTimestampRef.current = 0;
  }, []);

  // 数据动态更新时保持动画平滑
  useEffect(() => {
    if (data.length === 0) {
      stopAnimation();
      totalSizeRef.current = 0;
      currentOffsetRef.current = 0;
      applyTransform(0);
      return;
    }

    let rafId: number | null = null;
    let timerId: number | null = null;

    const measure = () => {
      const previousTotal = totalSizeRef.current;
      const newTotal = calculateItemDimensions();

      if (newTotal === 0) {
        rafId = window.requestAnimationFrame(measure);
        return;
      }

      const containerSize = isVertical ? containerRef.current?.clientHeight ?? 0 : containerRef.current?.clientWidth ?? 0;
      const shouldScroll = scrollWhenInsufficient || newTotal > containerSize;

      let normalizedOffset = previousTotal > 0 ? currentOffsetRef.current % previousTotal : 0;
      if (normalizedOffset < 0) {
        normalizedOffset += previousTotal;
      }

      const progress = previousTotal > 0 ? normalizedOffset / previousTotal : isReverse ? 1 : 0;
      let nextOffset = shouldScroll ? progress * newTotal : 0;

      if (isReverse && shouldScroll && nextOffset === 0) {
        nextOffset = newTotal;
      }

      currentOffsetRef.current = nextOffset;
      applyTransform(nextOffset);

      if (shouldScroll && autoStart && !isHoveringRef.current && !isPausedRef.current) {
        startAnimation();
      } else {
        stopAnimation();
      }
    };

    stopAnimation();
    timerId = window.setTimeout(() => {
      rafId = window.requestAnimationFrame(measure);
    }, 80);

    return () => {
      if (timerId) {
        window.clearTimeout(timerId);
      }
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [data, calculateItemDimensions, applyTransform, isVertical, isReverse, scrollWhenInsufficient, autoStart, startAnimation, stopAnimation]);

  // 处理鼠标进入
  const handleMouseEnter = useCallback(() => {
    if (!hoverStop) return;
    isHoveringRef.current = true;
    stopAnimation();
  }, [hoverStop, stopAnimation]);

  // 处理鼠标离开
  const handleMouseLeave = useCallback(() => {
    if (!hoverStop) return;
    isHoveringRef.current = false;
    if (!isPausedRef.current) {
      startAnimation();
    }
  }, [hoverStop, startAnimation]);

  // 监听 visibilitychange
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopAnimation();
      } else {
        if (!isPausedRef.current && !isHoveringRef.current) {
          startAnimation();
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [startAnimation, stopAnimation]);

  // 初始化动画
  useEffect(() => {
    if (autoStart && !isPausedRef.current && data.length > 0) {
      // 等待尺寸计算完成后再启动动画
      const checkAndStart = () => {
        if (containerRef.current && contentRef.current && totalSizeRef.current > 0) {
          const containerSize = isVertical ? containerRef.current.clientHeight : containerRef.current.clientWidth;
          const shouldScroll = scrollWhenInsufficient || totalSizeRef.current > containerSize;
          if (shouldScroll) {
            startAnimation();
          }
        } else if (totalSizeRef.current === 0) {
          // 如果尺寸还没计算完成，延迟重试
          setTimeout(checkAndStart, 50);
        }
      };
      checkAndStart();
      return () => {
        stopAnimation();
      };
    }

    return () => {
      stopAnimation();
    };
  }, [autoStart, data, startAnimation, stopAnimation, scrollWhenInsufficient, isVertical]);

  // 渲染列表项（复制一份用于无缝循环）
  const renderItems = useCallback(() => {
    if (data.length === 0) return null;

    const items = data.map((item, index) => (
      <div key={`first-${getItemKey(item, index)}`} className="data-scroll-item">
        {renderItem(item, index)}
      </div>
    ));

    // 复制一份用于无缝循环
    const duplicatedItems = data.map((item, index) => (
      <div key={`second-${getItemKey(item, index)}`} className="data-scroll-item">
        {renderItem(item, index)}
      </div>
    ));

    return (
      <>
        {items}
        {duplicatedItems}
      </>
    );
  }, [data, renderItem, getItemKey]);

  // 容器样式
  const containerStyle: React.CSSProperties = {
    height: containerHeight,
    width: containerWidth,
    overflow: showScrollbar ? 'auto' : 'hidden',
    position: 'relative',
    ...style,
  };

  // 内容容器样式
  const contentStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: isVertical ? 'column' : 'row',
    willChange: 'transform',
  };

  return (
    <div className={wrapperClass}>
      {header && <div className={`${classname}-header`}>{header}</div>}
      <div ref={containerRef} className={`${classname}-body`} style={containerStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <div ref={contentRef} className={`${classname}-content`} style={contentStyle}>
          {renderItems()}
        </div>
      </div>
    </div>
  );
}

export type { AnimatedScrollListProps } from './interface';
export default React.memo(AnimatedScrollList);
