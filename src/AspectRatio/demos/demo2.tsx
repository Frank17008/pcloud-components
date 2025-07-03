import { AspectRatio } from '@pointcloud/pcloud-components';

export default function Demo2() {
  return (
    <AspectRatio ratio={4 / 3} style={{ border: '1px solid #ccc' }}>
      <img src="https://picsum.photos/1920/1080" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
    </AspectRatio>
  );
}
