/**
 * description: 加载中：设置loading属性即可在远程搜索时显示加载中，支持延迟显示，默认600毫秒，传入false或0表示不显示（loading效果目前对下拉列表无效）
 */
import React, { useState } from 'react';

import { Radio } from 'antd';

import { DCascader } from '@pointcloud/pcloud-components';

import provinceList from './mockData/china_region_province.json';
import cityList from './mockData/china_region_city.json';
import countyList from './mockData/china_region_county.json';

export default function loadingDemo() {
  const [loading, setLoading] = useState<boolean | number>(800);
  const onRadioChange = (e) => setLoading(e.target.value);

  const getOptionsAsync = (value, option): Promise<Array<{ value: string; label: string }>> => {
    return new Promise((resolve) => {
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
        setTimeout(() => {
          resolve(options);
        }, 3000);
      } else {
        options = provinceList.map((item) => ({
          ...item,
          label: item.name,
          value: item.code,
          isLeaf: false,
        }));
        resolve(options);
      }
    });
  };

  const onChange = (values, options) => {
    console.log(values, options);
  };

  return (
    <>
      <div style={{ marginBottom: '12px' }}>
        <span>切换类型：</span>
        <Radio.Group value={loading} onChange={onRadioChange}>
          <Radio value={true}>显示加载中</Radio>
          <Radio value={false}>不显示加载中</Radio>
          <Radio value={800}>延时800毫秒</Radio>
          <Radio value={2000}>延时2000毫秒</Radio>
        </Radio.Group>
      </div>
      <DCascader options={getOptionsAsync} loading={loading} onChange={onChange} />
    </>
  );
}
