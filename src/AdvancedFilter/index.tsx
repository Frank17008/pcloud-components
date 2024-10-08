import React, { useState, useRef, useImperativeHandle, useContext } from 'react';
import { Input, Button, Collapse } from 'antd';
import classNames from 'classnames';
import FormFilter from './FormFilter';
import { FilterProps } from './interface';
import { ConfigContext } from '../ConfigProvider';
import './styles/index.less';

const AdvancedFilter: React.FC<FilterProps> = (props) => {
  const { left, right, inputProps, formItemConfig, fRef, icon, onValuesChange, onSearch, onReset } = props;

  const { prefixCls, getPrefixCls }: any = useContext(ConfigContext);
  const classname = getPrefixCls('search-filter');
  const wrapperClass = classNames({ [`${prefixCls}-search-filter`]: !!prefixCls }, classname);

  const [panelVisible, setPanelVisible] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const inputRef = useRef<any>(null);
  const formRef = useRef<any>(null);

  const resetFields = () => {
    setInputValue('');
    formRef?.current?.resetFields();
  };

  useImperativeHandle(fRef, () => {
    return { resetFields, form: formRef.current?.form };
  });

  const handleSearch = (values: any) => {
    const value = inputRef?.current?.input?.value;
    // eslint-disable-next-line no-unused-expressions, @typescript-eslint/no-unused-expressions
    onSearch && onSearch({ ...values, ...{ [inputProps.name]: value } });
  };
  const inputSearch = (v: string) => {
    // eslint-disable-next-line no-unused-expressions, @typescript-eslint/no-unused-expressions
    inputProps?.inputSearch && inputProps.inputSearch({ [inputProps.name]: v });
  };
  return (
    <Collapse className={wrapperClass} activeKey={panelVisible ? '1' : 'none'} collapsible="header" ghost bordered={false}>
      <Collapse.Panel
        key="1"
        showArrow={false}
        header={
          <div
            className="search-header"
            style={{ justifyContent: left ? 'space-between' : 'flex-end', alignItems: 'center' }}
            onClick={(e) => e.stopPropagation()}
          >
            {left && <div className="left">{left}</div>}
            <div className={`right right-content`}>
              <Input.Search
                className="input"
                ref={inputRef}
                allowClear
                placeholder={inputProps?.placeholder}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  // eslint-disable-next-line no-unused-expressions, @typescript-eslint/no-unused-expressions
                  onValuesChange && onValuesChange(e.target.value);
                }}
                onSearch={inputSearch}
                name={inputProps?.name}
                value={inputValue}
              />
              <Button className="button" onClick={() => setPanelVisible(!panelVisible)}>
                高级筛选
                <span className={`${panelVisible ? 'down' : 'up'} icon`}>{icon}</span>
              </Button>
              {right && <div className="right">{right}</div>}
            </div>
          </div>
        }
      >
        <div className="title">
          <span className="icon" /> 查询条件
        </div>
        <div className="search-content">
          <FormFilter formRef={formRef} formItemConfig={formItemConfig} onSearch={handleSearch} onReset={onReset} />
        </div>
      </Collapse.Panel>
    </Collapse>
  );
};
export default AdvancedFilter;
