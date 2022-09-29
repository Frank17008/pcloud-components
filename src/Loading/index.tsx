import Loading from './loading';
import { LoadingProps } from './interface';

let loadingInstance: any = null;
const getLoadingInstance = (tip?: string) => {
  loadingInstance = loadingInstance || Loading.newInstance({ tip });
  return loadingInstance;
};
export default {
  open(tip?: string): LoadingProps {
    return getLoadingInstance(tip);
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
