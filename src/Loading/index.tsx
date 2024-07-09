import Loading from './loading';
import { ILoadingProps, LoadingInstanceProps } from './interface';

let loadingInstance: any = null;
const getLoadingInstance = (params) => {
  loadingInstance = loadingInstance || Loading.newInstance(params);
  return loadingInstance;
};
export default {
  open(params?: LoadingInstanceProps): ILoadingProps {
    return getLoadingInstance(params);
  },
  close(): void {
    if (loadingInstance) {
      loadingInstance?.destroy();
      loadingInstance = null;
    }
  },
  getInstance(): ILoadingProps {
    return loadingInstance;
  },
};

export { Loading };
