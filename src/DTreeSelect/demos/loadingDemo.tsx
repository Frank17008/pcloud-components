import React, { useEffect, useState } from 'react';

import { Radio } from 'antd';

import { DTreeSelect } from '@pointcloud/pcloud-components';

const getRegionData = () => {
  return new Promise<{ provinceList: any[]; cityList: any[]; countyList: any[] }>((resolve) => {
    async function exec() {
      const bodyProvince = await fetch('/mock/dcascader/china_region_province.json');
      const provinceList = await bodyProvince.json();
      const bodyCity = await fetch('/mock/dcascader/china_region_city.json');
      const cityList = await bodyCity.json();
      const bodyCounty = await fetch('/mock/dcascader/china_region_county.json');
      const countyList = await bodyCounty.json();
      resolve({ provinceList, cityList, countyList });
    }
    exec();
  });
};

export default function LoadingDemo() {
  const [regionData, setRegionData] = useState<{
    provinceList: any[];
    cityList: any[];
    countyList: any[];
  }>({ provinceList: [], cityList: [], countyList: [] });
  const [loading, setLoading] = useState<boolean | number>(800);
  const onRadioChange = (e) => setLoading(e.target.value);

  const getOptionsAsync = (option): Promise<Array<{ value: string; label: string }>> => {
    return new Promise((resolve) => {
      const { provinceList, cityList, countyList } = regionData;
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

  useEffect(() => {
    getRegionData().then((res) => setRegionData(res));
  }, []);

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
      <DTreeSelect style={{ width: 200 }} treeData={getOptionsAsync} loading={loading} onChange={onChange} />
    </>
  );
}
