import React, { useState } from 'react';
import { Checkbox } from 'antd';
import { InfiniteScrollList } from '@pointcloud/pcloud-components';
export default function Demo2() {
  const [params, setParams] = useState({ inc: 'gender,name,nat,id' });
  const loadMore = async (reqParams): Promise<any> => {
    const _params = `inc=${reqParams.inc}&page=${reqParams.current}&results=${reqParams.size}`;
    const res: any = await fetch(`https://randomuser.me/api/?${_params}`).then((res) => res.json());
    return {
      data: {
        records: res.results?.map((item) => {
          return {
            id: item?.id?.value,
            ...item,
          };
        }),
        total: 20,
      },
    };
  };
  return (
    <>
      过滤条件:{' '}
      <Checkbox.Group
        onChange={(v) => setParams({ inc: v.join() })}
        options={[
          { label: '性别', value: 'gender' },
          { label: '名称', value: 'name' },
          { label: '国籍', value: 'nat' },
        ]}
      />
      <InfiniteScrollList
        containerId="demo2"
        containerHeight={400}
        initialParams={params}
        loadMore={loadMore}
        renderItem={(item: any, index: number) => (
          <>
            {item.nat}——{index}
          </>
        )}
      />
    </>
  );
}
