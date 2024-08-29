import React from 'react';
import { Avatar, List } from 'antd';
import { InfiniteScrollList } from '@pointcloud/pcloud-components';
export default function Demo3() {
  const loadMore = async (reqParams): Promise<any> => {
    const _params = `page=${reqParams.current}&results=${reqParams.size}`;
    const res: any = await fetch(`https://randomuser.me/api/?${_params}`).then((res) => res.json());
    return {
      data: {
        records: res?.results?.map((item) => {
          return {
            id: item?.id?.value,
            ...item,
          };
        }),
        total: 80,
      },
    };
  };
  return (
    <InfiniteScrollList
      containerId="demo3"
      grid={{ gutter: 16, column: 3 }}
      initialParams={{ current: 1, size: 20 }}
      containerHeight={400}
      loadMore={loadMore}
      renderItem={(item: any) => (
        <List.Item key={item.email}>
          <List.Item.Meta avatar={<Avatar src={item.picture.large} />} title={<a href="https://ant.design">{item.name.last}</a>} description={item.email} />
        </List.Item>
      )}
    />
  );
}
