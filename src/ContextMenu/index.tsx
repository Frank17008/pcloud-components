import React, { useMemo, useEffect, useCallback, useRef, useState, useContext } from 'react';
import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import { ConfigContext } from '../ConfigProvider';
import './index.less';

export interface ContextMenuProps {
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 菜单内容 */
  children: ReactNode;
  /** 触发区域内容 */
  trigger: ReactNode;
  /** 点击外部是否关闭 */
  closeOnOutside?: boolean;
  /** 展示位置偏移量 */
  offset?: {
    x?: number;
    y?: number;
  };
  /** 指定菜单挂载的父节点 */
  getPopupContainer?: (props: any) => HTMLElement;
  /** 菜单显示时的回调 */
  onShow?: () => void;
  /** 菜单隐藏时的回调 */
  onHide?: () => void;
}

const ContextMenu: React.FC<ContextMenuProps> = ({
  className,
  style,
  children,
  trigger,
  closeOnOutside = true,
  offset = { x: 0, y: 0 },
  onShow,
  onHide,
  getPopupContainer,
}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const { prefixCls, getPrefixCls }: any = useContext(ConfigContext);
  const triggerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const classname = getPrefixCls('context-menu');
  const wrapperClass = classNames({ [`${prefixCls}-context-menu`]: !!prefixCls }, classname, className);

  const handleGetPopupContainer = useCallback(
    (triggerNode: HTMLElement): HTMLElement => {
      if (typeof getPopupContainer === 'function') {
        const container = getPopupContainer(triggerNode);
        return container instanceof HTMLElement ? container : document.body;
      }
      return document.body;
    },
    [getPopupContainer],
  );

  const popContainer = useMemo(() => {
    return triggerRef.current ? handleGetPopupContainer(triggerRef.current) : document.body;
  }, [visible, handleGetPopupContainer]);

  // 处理右键点击事件
  const handleContextMenu = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      const triggerElement = triggerRef.current;
      if (!triggerElement) return;

      const container = triggerElement ? handleGetPopupContainer(triggerElement) : document.body;
      let x: number, y: number;

      if (container === document.body) {
        // 如果是body容器，使用相对于视窗的位置（fixed定位）
        x = e.clientX + (offset.x || 0);
        y = e.clientY + (offset.y || 0);
      } else {
        // 如果指定了容器，使用相对于该容器的位置（absolute定位）
        const containerRect = container.getBoundingClientRect();
        x = e.clientX - containerRect.left + container.scrollLeft + (offset.x || 0);
        y = e.clientY - containerRect.top + container.scrollTop + (offset.y || 0);
      }

      // 确保菜单不超出容器边界
      const menuWidth = menuRef.current?.offsetWidth || 0;
      const menuHeight = menuRef.current?.offsetHeight || 0;

      let finalX: number, finalY: number;

      if (container === document.body) {
        // body容器情况，相对于视窗边界
        finalX = Math.max(0, Math.min(x, window.innerWidth - menuWidth));
        finalY = Math.max(0, Math.min(y, window.innerHeight - menuHeight));
      } else {
        // 自定义容器情况，相对于容器边界
        const maxX = container.clientWidth - menuWidth;
        const maxY = container.clientHeight - menuHeight;
        finalX = Math.max(0, Math.min(x, maxX));
        finalY = Math.max(0, Math.min(y, maxY));
      }

      setPosition({ x: finalX, y: finalY });
      setVisible(true);
      onShow?.();
    },
    [offset, onShow, handleGetPopupContainer],
  );

  // 处理点击事件
  const handleMouseDown = useCallback(
    (e: MouseEvent) => {
      // 检查点击目标是否在菜单内部
      if (menuRef.current && menuRef.current.contains(e.target as Node)) {
        // 如果点击在菜单内部，不关闭菜单，允许事件正常处理
        return;
      }
      if (
        closeOnOutside &&
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setVisible(false);
        onHide?.();
      }
    },
    [closeOnOutside, onHide],
  );

  // 处理 ESC 键盘事件
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && visible) {
        setVisible(false);
        onHide?.();
      }
    },
    [visible, onHide],
  );

  useEffect(() => {
    if (visible) {
      document.addEventListener('mousedown', handleMouseDown);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [visible, handleMouseDown, handleKeyDown]);

  return (
    <>
      <div ref={triggerRef} onContextMenu={handleContextMenu}>
        {trigger}
      </div>
      {visible &&
        createPortal(
          <div
            ref={menuRef}
            className={wrapperClass}
            style={{
              ...style,
              position: popContainer === document.body ? 'fixed' : 'absolute',
              left: position.x,
              top: position.y,
              zIndex: 1050,
            }}
          >
            {children}
          </div>,
          popContainer,
        )}
    </>
  );
};

export default ContextMenu;
