import React, { useEffect, useState } from 'react';
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

export default function BasicDemo() {
  const [regionData, setRegionData] = useState<{
    provinceList: any[];
    cityList: any[];
    countyList: any[];
  }>({ provinceList: [], cityList: [], countyList: [] });

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

  useEffect(() => {
    getRegionData().then((res) => setRegionData(res));
  }, []);

  return <DTreeSelect style={{ width: 200 }} treeData={getOptionsAsync} showSearch onChange={onChange} />;
}
