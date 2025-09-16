import { useCallback, useContext, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../ConfigProvider';
import './style/index.less';

export interface SignaturePadHandle {
  /** 清除画布 */
  clear: () => void;
  /** 获取签名图片的 base64 数据 */
  getDataURL: () => string | undefined;
}

export interface SignaturePadProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 画布宽度 */
  width?: number;
  /** 画布高度 */
  height?: number;
  /** 线条颜色 */
  penColor?: string;
  /** 线条粗细 */
  penWidth?: number;
  /** 背景颜色 */
  backgroundColor?: string;
  /** 清除按钮文字 */
  clearText?: string;
  /** 完成按钮文字 */
  doneText?: string;
  /** 是否显示工具栏 */
  showToolbar?: boolean;
  /** 签名完成回调 */
  onDone?: (_dataUrl: string) => void;
  /** 默认的签名图片（base64或图片URL） */
  defaultValue?: string;
}

const SignaturePad = forwardRef<SignaturePadHandle, SignaturePadProps>(
  (
    {
      className,
      width = 600,
      height = 200,
      penColor = '#000000',
      penWidth = 2,
      backgroundColor = '#ffffff',
      clearText = '清除',
      doneText = '完成',
      showToolbar = true,
      onDone,
      defaultValue,
    },
    ref,
  ) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const isDrawing = useRef<boolean>(false);
    const lastX = useRef(0);
    const lastY = useRef(0);
    const { prefixCls, getPrefixCls }: any = useContext(ConfigContext);
    const classname = getPrefixCls('signature-pad');
    const wrapperClass = classNames(
      {
        [`${prefixCls}-signature-pad`]: !!prefixCls,
      },
      classname,
      className,
    );
    const initCanvas = useCallback(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      // 设置画布大小和背景色
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }, [width, height, backgroundColor]);

    const loadImage = useCallback(
      (src: string) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const image = new Image();
        image.onload = () => {
          // 先初始化画布
          initCanvas();
          // 在画布中心绘制图片
          const scale = Math.min(canvas.width / image.width, canvas.height / image.height);
          const x = (canvas.width - image.width * scale) / 2;
          const y = (canvas.height - image.height * scale) / 2;
          ctx.drawImage(image, x, y, image.width * scale, image.height * scale);
        };
        image.src = src;
      },
      [initCanvas],
    );

    useEffect(() => {
      initCanvas();
    }, [initCanvas]);

    useEffect(() => {
      if (defaultValue) {
        loadImage(defaultValue);
      }
    }, [defaultValue, loadImage]);

    const startDrawing = useCallback((e: MouseEvent | TouchEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      isDrawing.current = true;
      const rect = canvas.getBoundingClientRect();
      const x = ('touches' in e ? e.touches[0].clientX : e.clientX) - rect.left;
      const y = ('touches' in e ? e.touches[0].clientY : e.clientY) - rect.top;
      lastX.current = x;
      lastY.current = y;
    }, []);

    const draw = useCallback(
      (e: MouseEvent | TouchEvent) => {
        if (!isDrawing.current) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const x = ('touches' in e ? e.touches[0].clientX : e.clientX) - rect.left;
        const y = ('touches' in e ? e.touches[0].clientY : e.clientY) - rect.top;

        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.beginPath();
          ctx.strokeStyle = penColor;
          ctx.lineWidth = penWidth;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.moveTo(lastX.current, lastY.current);
          ctx.lineTo(x, y);
          ctx.stroke();
        }

        lastX.current = x;
        lastY.current = y;
      },
      [penColor, penWidth],
    );

    const stopDrawing = useCallback(() => {
      isDrawing.current = false;
    }, []);

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const handleEvent = (e: Event) => {
        e.preventDefault();
        const event = e as MouseEvent | TouchEvent;
        switch (e.type) {
          case 'mousedown':
          case 'touchstart':
            startDrawing(event);
            break;
          case 'mousemove':
          case 'touchmove':
            draw(event);
            break;
          case 'mouseup':
          case 'mouseleave':
          case 'touchend':
            stopDrawing();
            break;
          default:
            break;
        }
      };

      const events = ['mousedown', 'mousemove', 'mouseup', 'mouseleave', 'touchstart', 'touchmove', 'touchend'] as const;

      // 添加事件监听
      events.forEach((eventName) => {
        canvas.addEventListener(eventName, handleEvent);
      });

      return () => {
        // 清除事件监听
        events.forEach((eventName) => {
          canvas.removeEventListener(eventName, handleEvent);
        });
      };
    }, [draw, startDrawing, stopDrawing]);

    const handleClear = useCallback(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }, [backgroundColor]);

    const handleDone = useCallback(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dataUrl = canvas.toDataURL('image/png');
      onDone?.(dataUrl);
    }, [onDone]);

    useImperativeHandle(ref, () => ({
      clear: handleClear,
      getDataURL: () => canvasRef.current?.toDataURL('image/png'),
    }));

    return (
      <div className={wrapperClass}>
        <canvas ref={canvasRef} className={`${classname}-canvas`} style={{ touchAction: 'none' }} />
        {showToolbar && (
          <div className={`${classname}-toolbar`}>
            <button type="button" className={`${classname}-button`} onClick={handleClear}>
              {clearText}
            </button>
            <button type="button" className={`${classname}-button`} onClick={handleDone}>
              {doneText}
            </button>
          </div>
        )}
      </div>
    );
  },
);

export default SignaturePad;
