import { WordCloud } from '@pointcloud/pcloud-components';

export default () => {
  const words = [
    { text: 'New York', value: 2 },
    { text: 'Los Angeles', value: 44 },
    { text: 'Chicago', value: 14 },
    { text: 'Houston', value: 23 },
    { text: 'Phoenix', value: 67 },
    { text: 'Philadelphia', value: 98 },
    { text: 'San Antonio', value: 59 },
    { text: 'San Diego', value: 66 },
    { text: 'Dallas', value: 23 },
    { text: 'San Jose', value: 11 },
    { text: 'Austin', value: 11 },
    { text: 'Jacksonville', value: 41 },
    { text: 'Tucson', value: 24 },
  ];

  const options: any = {
    fontWeight: 'bold',
    padding: 10, // 文字间距
    colors: ['#2d87f9', 'red', 'blue', 'green'], // 字体颜色集合
    deterministic: false, // 是否固定文字每次渲染的角度和位置
    enableTooltip: true, // 开启tooltip
    fontFamily: 'Microsoft YaHei',
    fontSizes: [14, 50], // 指定最小字体和最大字体
    fontStyle: 'normal',
    rotationAngles: [-45, 45], // 字体旋转角度范围
    scale: 'sqrt', // 字体放大比例 linear 线性 | sqrt 平方根 | log 对数
    spiral: 'rectangular', // 螺旋类型 rectangular 矩形螺旋 | archimedean 阿基米德螺旋
    transitionDuration: 800, // 字体过渡动画时间
  };
  return <WordCloud words={words} size={[400, 400]} options={options} />;
};
