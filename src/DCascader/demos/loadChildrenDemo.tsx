import React, { useState } from 'react';

import { Radio } from 'antd';

import { DCascader } from '@pointcloud/pcloud-components';

const getRegionData = (type: 'province' | 'city' | 'county' = 'province') => {
  const typeMap = {
    province: '/mock/dcascader/china_region_province.json',
    city: '/mock/dcascader/china_region_city.json',
    county: '/mock/dcascader/china_region_county.json',
  };
  return fetch(typeMap[type]).then((body) => body.json());
};

export default function LoadChildrenDemo() {
  const [enableRemoteLoadData, setEnableRemoteLoadData] = useState(undefined);

  const onRadioChange = (e) => setEnableRemoteLoadData(e.target.value);

  const loadDataFn = (value, option) => {
    if (option) {
      const levelMap = { province: 'city', city: 'county' };
      const codeMap = { province: 'provinceCode', city: 'cityCode' };
      const { level, code } = option;
      return getRegionData(levelMap[level]).then((list) => {
        const targetList = list.filter((item) => item[codeMap[level]] === code);
        return targetList.map((item) => ({
          ...item,
          value: item.code,
          label: item.name,
          isLeaf: item.level === 'county',
        }));
      });
    } else {
      return getRegionData().then((list) =>
        list.map((item) => ({ ...item, label: item.name, value: item.code, isLeaf: false })),
      );
    }
  };

  const onChange = (values, options) => {
    console.log(values, options);
  };

  const loadDataProps =
    enableRemoteLoadData !== undefined
      ? { loadData: enableRemoteLoadData ? loadDataFn : null }
      : undefined;

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
      <DCascader options={loadDataFn} onChange={onChange} {...loadDataProps} />
    </>
  );
}
