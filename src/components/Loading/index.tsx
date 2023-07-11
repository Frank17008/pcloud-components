import Loading from './loading';
import { LoadingProps, LoadingInstanceProps } from './interface';

let loadingInstance: any = null;
const getLoadingInstance = (params) => {
  loadingInstance = loadingInstance || Loading.newInstance(params);
  return loadingInstance;
};
export default {
  open(params?: LoadingInstanceProps): LoadingProps {
    return getLoadingInstance(params);
  },
  close(): void {
    if (loadingInstance) {
      loadingInstance?.destroy();
      loadingInstance = null;
    }
  },
  getInstance(): LoadingProps {
    return loadingInstance;
  },
};

export { Loading };
