import { AspectRatio } from '@pointcloud/pcloud-components';

export default function Demo1() {
  return (
    <AspectRatio ratio={16 / 9} style={{ width: '400px', border: '1px solid #ccc' }}>
      <img src="https://picsum.photos/1920/1080" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
    </AspectRatio>
  );
}
