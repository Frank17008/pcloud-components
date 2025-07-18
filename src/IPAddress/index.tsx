import React, { useState, useEffect, useRef, useCallback, useContext } from 'react';
import classNames from 'classnames';
import { ConfigContext } from '../ConfigProvider';
import './index.less';

interface IPSection {
  value: string;
}

export interface IPAddressProps {
  className?: string;
  value?: string;
  onChange?: (_value: string) => void;
  onFocus?: (_value: string, _index: number) => void;
  onBlur?: (_value: string, _index: number) => void;
  type?: 'IPv4' | 'IPv6';
  delimiter?: React.ReactNode;
  readOnly?: boolean;
  disabled?: boolean;
  size?: 'small' | 'middle' | 'large';
  style?: React.CSSProperties;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  autoComplete?: boolean;
  normalize?: boolean;
}

// IPv6 规范化函数
const normalizeIPv6 = (ipv6: string): string => {
  if (!ipv6) return '';
  if (ipv6 === '::') return '0000:0000:0000:0000:0000:0000:0000:0000';
  // 处理开头/结尾的 ::
  let normalized = ipv6;
  if (normalized.startsWith('::')) normalized = '0' + normalized;
  if (normalized.endsWith('::')) normalized = normalized + '0';
  const parts = normalized.split('::');
  const leftParts = parts[0].split(':').filter(Boolean);
  const rightParts = parts.length > 1 ? parts[1].split(':').filter(Boolean) : [];
  const zeroSegmentsNeeded = 8 - leftParts.length - rightParts.length;
  const zeroSegments = Array(zeroSegmentsNeeded).fill('0000');
  return [...leftParts, ...zeroSegments, ...rightParts].map((segment) => segment.padStart(4, '0')).join(':');
};

const getInitialAddress = (type: 'IPv4' | 'IPv6', value?: string): IPSection[] => {
  if (!value) {
    const len = type === 'IPv6' ? 8 : 4;
    return Array.from({ length: len }, () => ({ value: '' }));
  }
  if (type === 'IPv6') {
    const normalized = normalizeIPv6(value);
    return normalized.split(':').map((i) => ({ value: i }));
  } else {
    const parts = value.split('.').map((i) => ({ value: i }));
    while (parts.length < 4) parts.push({ value: '' });
    return parts.slice(0, 4);
  }
};

const IPAddress: React.FC<IPAddressProps> = (props) => {
  const {
    className = '',
    value,
    type = 'IPv4',
    delimiter,
    readOnly,
    disabled,
    size = 'middle',
    style = {},
    inputProps,
    autoComplete = true,
    normalize = true,
    onChange,
    onFocus,
    onBlur,
  } = props;

  const { prefixCls, getPrefixCls }: any = useContext(ConfigContext);
  const classname = getPrefixCls('ip-address');
  const wrapperClass = classNames({ [`${prefixCls}-ip-address`]: !!prefixCls }, classname);

  const [address, setAddress] = useState<IPSection[]>(() => getInitialAddress(type, value));
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  useEffect(() => {
    setAddress(getInitialAddress(type, value));
  }, [value, type]);

  const getValue = useCallback(
    (addr: IPSection[]): string => {
      const vals = addr.map((item) => item.value);
      const splitSymbol = type === 'IPv6' ? ':' : '.';

      if (type !== 'IPv6') return vals.join(splitSymbol);

      if (normalize) return normalizeIPv6(vals.join(splitSymbol));

      // 1. 去除前导零但保留至少一个0
      const simplifiedSegments = vals.map((seg) => {
        if (seg === '0') return '0';
        const trimmed = seg.replace(/^0+/, '');
        return trimmed === '' ? '0' : trimmed;
      });

      // 2. 查找最长连续0段用于压缩
      let bestZeroRange = { start: -1, length: 0 };
      let currentZeroStart = -1;

      simplifiedSegments.forEach((seg, i) => {
        if (seg === '0') {
          if (currentZeroStart === -1) currentZeroStart = i;
          const currentLength = i - currentZeroStart + 1;
          if (currentLength > bestZeroRange.length) {
            bestZeroRange = { start: currentZeroStart, length: currentLength };
          }
        } else {
          currentZeroStart = -1;
        }
      });

      // 3. 生成压缩后的地址
      if (bestZeroRange.length >= 2) {
        const before = simplifiedSegments.slice(0, bestZeroRange.start);
        const after = simplifiedSegments.slice(bestZeroRange.start + bestZeroRange.length);

        const beforeStr = before.join(':');
        const afterStr = after.join(':');

        // 处理边界情况
        if (before.length === 0 && after.length === 0) return '::'; // 全零情况
        if (before.length === 0) return '::' + afterStr; // 开头压缩
        if (after.length === 0) return beforeStr + '::'; // 结尾压缩

        return beforeStr + '::' + afterStr;
      }

      return simplifiedSegments.join(':');
    },
    [type, normalize],
  );

  const handleInput = useCallback(
    (idx: number, v: string): void => {
      let nv = v;
      const maxLen = type === 'IPv6' ? 4 : 3;

      if (type === 'IPv6') {
        nv = v.replace(/[^a-fA-F0-9]/g, '').toLowerCase();
      } else {
        nv = v.replace(/\D/g, '');
        if (nv && parseInt(nv, 10) > 255) {
          nv = '255';
        }
      }
      if (nv.length > maxLen) nv = nv.slice(0, maxLen);
      const next = address.map((item, i) => (i === idx ? { value: nv } : item));
      setAddress(next);
      if (onChange) {
        onChange(getValue(next));
      }
    },
    [address, autoComplete, getValue, onChange, type],
  );
  // 自动聚焦下一个输入框
  const handleKeyUp = useCallback(
    (idx: number, value: string, event: React.KeyboardEvent<HTMLInputElement>): void => {
      if (event.key === 'Backspace') return;
      if (autoComplete && ((type === 'IPv4' && value.length === 3 && idx < 3) || (type === 'IPv6' && value.length === 4 && idx < 7))) {
        refs.current[idx + 1]?.focus();
      }
    },
    [type, autoComplete],
  );

  const handleKeyDown = useCallback((idx: number, value: string, event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Backspace' && value === '' && idx > 0) {
      event.preventDefault();
      refs.current[idx - 1]?.focus();
    }
  }, []);

  const handleFocus = (idx: number, value: string) => {
    onFocus?.(value, idx);
  };
  const handleBlur = (idx: number, value: string) => {
    onBlur?.(value, idx);
  };

  const renderDelimiter = (): React.ReactNode => {
    if (delimiter) return <span>{delimiter}</span>;
    return type === 'IPv6' ? <span style={{ margin: '0 2px', color: '#00000060' }}>:</span> : <span style={{ margin: '0 2px', color: '#00000060' }}>·</span>;
  };

  return (
    <div className={`${wrapperClass} ${className} ${size} ${disabled ? 'disabled' : ''} ${readOnly ? 'readonly' : ''}`} style={style}>
      {address.map((item, idx) => (
        <React.Fragment key={idx}>
          <input
            id={`ip-address-input-${idx}`}
            ref={(el) => (refs.current[idx] = el)}
            type="text"
            value={item.value || undefined}
            readOnly={readOnly}
            disabled={disabled}
            maxLength={type === 'IPv6' ? 4 : 3}
            style={{
              width: type === 'IPv6' ? '4em' : '3em',
              textAlign: 'center',
              letterSpacing: type === 'IPv6' ? '0.1em' : undefined,
              marginRight: idx < address.length - 1 ? 0 : undefined,
              ...inputProps?.style,
            }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInput(idx, e.target.value)}
            onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyUp(idx, item.value, e)}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyDown(idx, item.value, e)}
            onFocus={(e: React.FocusEvent<HTMLInputElement>) => handleFocus(idx, e.target.value)}
            onBlur={(e: React.FocusEvent<HTMLInputElement>) => handleBlur(idx, e.target.value)}
            {...inputProps}
          />
          {idx < address.length - 1 && renderDelimiter()}
        </React.Fragment>
      ))}
    </div>
  );
};

export default IPAddress;
