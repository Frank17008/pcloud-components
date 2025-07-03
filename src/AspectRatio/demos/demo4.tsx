import { AspectRatio } from '@pointcloud/pcloud-components';
import React, { useRef, useEffect } from 'react';

export default function Demo4() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = '#ff0000';
        ctx.strokeRect(10, 10, 100, 50);
      }
    }
  }, []);

  return (
    <AspectRatio ratio={2} style={{ width: '300px', border: '1px solid #ccc' }}>
      <canvas ref={canvasRef} width={200} height={200} style={{ width: '100%', height: '100%', display: 'block' }} />
    </AspectRatio>
  );
}
