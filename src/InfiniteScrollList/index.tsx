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

  const pageParamsRef = useRef({ current: 1, size: 10, ...initialParams });
  const loadingRef = useRef<boolean>(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [listData, setListData] = useState<{ total: number; data: any[] }>({ total: 0, data: [] });

  const handleLoadMore = useCallback(async () => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    try {
      const { data } = await loadMore({ ...pageParamsRef.current });
      const { total, records } = data;
      // 初始参数重置时不拼接数据
      if (pageParamsRef.current.current === 1) {
        setListData({ total: total, data: total > 0 ? [...records] : [] });
      } else {
        setListData((prevData) => ({ total, data: total > 0 ? [...prevData.data, ...(records || [])] : [] }));
      }
      loadingRef.current = false;
    } catch (error) {
      loadingRef.current = false;
      setListData({ total: 0, data: [] });
    } finally {
      loadingRef.current = false;
    }
  }, [loadMore]);

  useEffect(() => {
    if (listData.total > 0 && listData.data.length < listData.total) {
      pageParamsRef.current = { ...pageParamsRef.current, current: pageParamsRef.current.current + 1 };
    }
  }, [listData]);

  useEffect(() => {
    if (Reflect.ownKeys(initialParams).length > 0) {
      scrollRef?.current?.scrollTo({ top: 0, behavior: 'smooth' });
      pageParamsRef.current = { current: 1, size: 10, ...initialParams };
    }
    handleLoadMore();
  }, [initialParams]);

  return (
    <div id={containerId} className="scroll-container" ref={scrollRef} style={{ height: containerHeight, overflowY: 'auto' }}>
      <InfiniteScroll
        className={`${wrapperClass} ${className}`}
        scrollableTarget={containerId}
        dataLength={listData.data?.length}
        next={handleLoadMore}
        hasMore={listData.data?.length < listData.total}
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
