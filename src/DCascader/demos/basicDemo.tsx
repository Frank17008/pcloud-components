/**
 * description: 基础用法：默认开启异步加载,自动加载子级列表,加载时会显示加载中效果
 */
import React from 'react';
import { DCascader } from '@pointcloud/pcloud-components';

import provinceList from './mockData/china_region_province.json';
import cityList from './mockData/china_region_city.json';
import countyList from './mockData/china_region_county.json';

export default function basicDemo() {
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

  return <DCascader options={getOptionsAsync} showSearch onChange={onChange} />;
}
