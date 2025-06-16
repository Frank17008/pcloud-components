import { useState, useEffect, useRef } from 'react';
import loading from '../index';
import type { ILoadingInstance, LoadingInstanceProps } from '../interface';

export const useLoading = (initialState = false) => {
  const [isLoading, setIsLoading] = useState(initialState);
  const loadingRef = useRef<ILoadingInstance | null>(null);

  useEffect(() => {
    return () => {
      if (loadingRef.current) {
        loading.close();
      }
    };
  }, []);

  const openLoading = (params?: LoadingInstanceProps) => {
    setIsLoading(true);
    loadingRef.current = loading.open(params);
    return loadingRef.current;
  };

  const closeLoading = () => {
    setIsLoading(false);
    if (loadingRef.current) {
      loading.close();
      loadingRef.current = null;
    }
  };

  return { isLoading, openLoading, closeLoading };
};
