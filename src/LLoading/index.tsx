import React, { useEffect, useRef, useState } from 'react';

const useLoading = () => {
  const loadingContainer = useRef<any>();
  const [instance, setInstance] = useState<HTMLDivElement>();
  useEffect(() => {
    if (loadingContainer.current) {
      setInstance(loadingContainer.current.parentElement);
    }
  }, [loadingContainer.current]);
  const dom = <div ref={loadingContainer}></div>;
  return [dom, { instance }];
};
function LLoading() {
  return <div>LLoading</div>;
}

export default LLoading;
