import { BackTop, Divider, List, Spin } from 'antd';
import React, { useCallback, useEffect, useRef, useState, useContext } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import classNames from 'classnames';
import { ConfigContext } from '../ConfigProvider';
import './styles/index.less';

interface ISLProps<T, P> {
  /**
   * @description 容器id
   * @default scrollableDiv
   */
  containerId?: string;
  /**
   * @description 列表项的唯一标识字段
   * @default id
   */
  itemKey?: string;
  /**
   * @description 容器高度(超过此高度将滚动)
   */
  containerHeight: number | string;
  /**
   * @description 列表请求的初始参数
   */
  initialParams?: any;
  /**
   * @description 列表请求方法
   * @param params 请求参数
   * @returns Promise<{ data: { total: number; records: any[] } }>
   */
  // eslint-disable-next-line no-unused-vars
  loadMore: (params?: T) => Promise<{ data: { total: number; records: any[] } }>;
  /**
   * @description 列表项的渲染方法
   * @param item 列表项数据
   * @returns React.ReactNode
   */
  // eslint-disable-next-line no-unused-vars
  renderItem: (item: P, index: number) => React.ReactNode;
  grid?: object;
  className?: string;
  /**
   * @description 滚动阈值，默认为 100px
   * @default 100px
   */
  scrollThreshold?: string | number;
  /**
   * @description 滚动高度达到此参数值才出现 BackTop
   * @default 200
   */
  visibilityHeight?: number;
}

type PageParams<T> = T & { current: number; size: number };

const InfiniteScrollList = <T, P>(props: ISLProps<T, P>) => {
  const {
    loadMore,
    initialParams = {},
    itemKey = 'id',
    containerId = 'scrollableDiv',
    containerHeight,
    className = '',
    grid,
    scrollThreshold = '100px',
    visibilityHeight = 200,
    renderItem,
  } = props;

  const { prefixCls, getPrefixCls }: any = useContext(ConfigContext);
  const classname = getPrefixCls('infinite-scroll-wrapper');
  const wrapperClass = classNames({ [`${prefixCls}-infinite-scroll-wrapper`]: !!prefixCls }, classname, className);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [listData, setListData] = useState<{ total: number; data: any[] }>({ total: 0, data: [] });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pageParams, setPageParams] = useState<PageParams<T>>({ current: 1, size: 10, ...initialParams });

  const handleLoadMore = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const { data } = await loadMore({ ...pageParams });
      const { total, records } = data;
      if (records?.length > 0 && listData?.data?.length < total) {
        setPageParams((prevParams) => ({ ...prevParams, current: prevParams.current + 1 }));
      }
      setListData((prevData) => ({ total, data: total > 0 ? [...prevData.data, ...(records || [])] : [] }));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }, [loadMore, isLoading, pageParams]);

  useEffect(() => {
    if (Reflect.ownKeys(initialParams).length > 0 && pageParams.current !== 1) {
      scrollRef?.current?.scrollTo({ top: 0, behavior: 'smooth' });
      setPageParams({ current: 1, ...initialParams });
    }
    handleLoadMore();
  }, [initialParams]);

  return (
    <div id={containerId} className="scroll-container" ref={scrollRef} style={{ height: containerHeight, overflowY: 'auto' }}>
      <InfiniteScroll
        className={`${wrapperClass} ${className} `}
        scrollableTarget={containerId}
        dataLength={listData?.data?.length}
        next={handleLoadMore}
        hasMore={listData?.data?.length < listData?.total}
        loader={
          <div style={{ textAlign: 'center' }}>
            <Spin tip="拼命加载中..." />
          </div>
        }
        endMessage={listData?.total > 0 && <Divider plain>已经到底部了</Divider>}
        scrollThreshold={scrollThreshold}
        inverse={false}
      >
        <List
          grid={grid}
          dataSource={listData.data}
          renderItem={(item: P, index: number) => <List.Item key={item[itemKey]}>{renderItem(item, index)}</List.Item>}
        />
      </InfiniteScroll>
      <BackTop className="backtop" target={() => scrollRef?.current || document.body} visibilityHeight={visibilityHeight}>
        <div className="up">回到顶部</div>
      </BackTop>
    </div>
  );
};

export type InfiniteScrollListProps<T, P> = ISLProps<T, P>;

export default React.memo(InfiniteScrollList);
