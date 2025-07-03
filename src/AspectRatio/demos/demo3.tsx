import { AspectRatio } from '@pointcloud/pcloud-components';

export default function Demo3() {
  return (
    <>
      <AspectRatio ratio={4 / 3} style={{ width: '300px', border: '1px solid #ccc' }}>
        <video src="https://www.w3schools.com/html/mov_bbb.mp4" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} controls />
      </AspectRatio>
      <hr />
      <AspectRatio ratio={16 / 9} style={{ width: '400px', border: '1px solid #ccc' }}>
        <video src="http://vjs.zencdn.net/v/oceans.mp4" autoPlay style={{ width: '100%', objectFit: 'contain' }} controls />
      </AspectRatio>
    </>
  );
}
