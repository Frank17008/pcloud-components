import Loading from './loading';
import { LoadingInstanceProps, ILoadingInstance } from './interface';
import { useLoading } from './hooks/useLoading';

let loadingInstance: ILoadingInstance | null = null;

export default {
  open(params?: LoadingInstanceProps): ILoadingInstance {
    if (!loadingInstance) {
      loadingInstance = Loading.newInstance(params);
    }
    return loadingInstance;
  },
  close(): void {
    if (loadingInstance) {
      const currentInstance = loadingInstance;
      loadingInstance = null; // 先清空引用
      currentInstance.destroy(); // 再销毁
    }
  },
  getInstance(): ILoadingInstance | null {
    return loadingInstance;
  },
};

export { Loading, useLoading };
