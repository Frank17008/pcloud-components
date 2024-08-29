import React from 'react';
import { InfiniteScrollList } from '@pointcloud/pcloud-components';
export default function Demo1() {
  const loadMore = (): Promise<any> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            records: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            total: 10,
          },
        });
      }, 1000);
    });
  };
  return <InfiniteScrollList containerHeight={500} loadMore={loadMore} renderItem={(item: any) => <>{item}</>} />;
}
