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
      return;
    }

    const items = contentRef.current.children;
    const firstGroupItems = Array.from(items).slice(0, data.length) as HTMLElement[];

    if (firstGroupItems.length === 0) {
      totalSizeRef.current = 0;
      return;
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
  }, [data, isVertical, parsePixelValue]);

  // 初始化尺寸计算
  useEffect(() => {
    if (data.length > 0) {
      // 延迟计算，确保 DOM 已渲染
      const timer = setTimeout(() => {
        calculateItemDimensions();
        // 计算完成后，根据滚动方向设置初始偏移量
        if (contentRef.current && totalSizeRef.current > 0) {
          const initialOffset = isReverse ? totalSizeRef.current : 0;
          currentOffsetRef.current = initialOffset;
          if (isVertical) {
            contentRef.current.style.transform = `translateY(${-initialOffset}px)`;
          } else {
            contentRef.current.style.transform = `translateX(${-initialOffset}px)`;
          }
        }
      }, 100);
      return () => clearTimeout(timer);
    } else {
      totalSizeRef.current = 0;
      currentOffsetRef.current = 0;
    }
  }, [data, calculateItemDimensions, isVertical, isReverse]);

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
      // 由于我们复制了两组列表，当滚动完第一组时，第二组正好接上，此时重置到0位置
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
      if (isVertical) {
        contentRef.current.style.transform = `translateY(${-newOffset}px)`;
      } else {
        contentRef.current.style.transform = `translateX(${-newOffset}px)`;
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    },
    [speed, isReverse, isVertical, data.length],
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
  }, [autoStart, data.length, startAnimation, stopAnimation, scrollWhenInsufficient, isVertical]);

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
    <div ref={containerRef} className={wrapperClass} style={containerStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div ref={contentRef} className={`${classname}-content`} style={contentStyle}>
        {renderItems()}
      </div>
    </div>
  );
}

export type { AnimatedScrollListProps } from './interface';
export default React.memo(AnimatedScrollList);
