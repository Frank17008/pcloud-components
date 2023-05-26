/**
 * description: 动态加载子级列表: loadData属性用于开启动态加载,如果
 */
import React, { useState } from 'react';

import { Radio } from 'antd';
import { DefaultOptionType } from 'antd/lib/cascader';

import { DCascader } from '@pointcloud/pui-components';

import provinceList from './mockData/china_region_province.json';
import cityList from './mockData/china_region_city.json';
import countyList from './mockData/china_region_county.json';

export default function loadChildrenDemo() {
  const [enableRemoteLoadData, setEnableRemoteLoadData] = useState(undefined);

  const onRadioChange = (e) => setEnableRemoteLoadData(e.target.value);

  const remoteLoadData = (value, option) => {
    return new Promise<DefaultOptionType[]>((resolve, reject) => {
      let options;
      if (option) {
        const listMap = { province: cityList, city: countyList };
        const codeMap = { province: 'provinceCode', city: 'cityCode' };
        const { level, code } = option;
        const list = listMap[level]?.filter((item) => item[codeMap[level]] === code);
        options = list?.map((item) => ({
          ...item,
          value: item.code,
          label: item.name,
          isLeaf: item.level === 'county',
        }));
      } else {
        options = provinceList.map((item) => ({
          ...item,
          label: item.name,
          value: item.code,
          isLeaf: false,
        }));
      }
      resolve(options);
    });
  };

  const onChange = (values, options) => {
    console.log(values, options);
  };

  const loadDataFn = enableRemoteLoadData === true ? remoteLoadData : null;
  const loadDataProps = enableRemoteLoadData === undefined ? undefined : { loadData: loadDataFn };

  return (
    <>
      <div style={{ marginBottom: '12px' }}>
        <span>切换类型：</span>
        <Radio.Group value={enableRemoteLoadData} onChange={onRadioChange}>
          <Radio value={undefined}>默认</Radio>
          <Radio value={true}>开启远程加载</Radio>
          <Radio value={false}>关闭远程加载</Radio>
        </Radio.Group>
      </div>
      <DCascader options={remoteLoadData} onChange={onChange} {...loadDataProps} />
    </>
  );
}
