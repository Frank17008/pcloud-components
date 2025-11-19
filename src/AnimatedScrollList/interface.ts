import React from 'react';

export type ScrollDirection = 'up' | 'down' | 'left' | 'right';

export interface IAnimatedScrollListProps {
  /**
   * @description 滚动方向
   * @default 'up'
   */
  direction?: ScrollDirection;
  /**
   * @description 滚动速度，单位 px/s
   * @default 50
   */
  speed?: number;
  /**
   * @description 是否在鼠标悬停时暂停滚动
   * @default true
   */
  hoverStop?: boolean;
  /**
   * @description 是否自动开始滚动
   * @default true
   */
  autoStart?: boolean;
  /**
   * @description 容器高度（垂直滚动时）或宽度（水平滚动时）
   */
  containerHeight?: number | string;
  /**
   * @description 容器宽度（水平滚动时）或高度（垂直滚动时）
   */
  containerWidth?: number | string;
  /**
   * @description 列表数据
   */
  data: any[];
  /**
   * @description 渲染列表项的方法
   * @param item 列表项数据
   * @param index 索引
   * @returns React.ReactNode
   */
  renderItem: (_item: any, _index: number) => React.ReactNode;
  /**
   * @description 列表项的唯一标识字段，用于 key
   * @default 'id'
   */
  itemKey?: string | ((_item: any, _index: number) => string | number);
  /**
   * @description 自定义类名
   */
  className?: string;
  /**
   * @description 自定义样式
   */
  style?: React.CSSProperties;
  /**
   * @description 是否显示滚动条
   * @default false
   */
  showScrollbar?: boolean;
  /**
   * @description 当列表项数量不足一屏时是否仍然滚动
   * @default false
   */
  scrollWhenInsufficient?: boolean;
}

export type AnimatedScrollListProps = IAnimatedScrollListProps;
