import { WordCloud, type WordCloudProps } from '@pointcloud/pcloud-components';

export default () => {
  const words: WordCloudProps['list'] = [
    ['New York', 12],
    ['Los Angeles', 12],
    ['Chicago', 22],
    ['Houston', 22],
    ['Phoenix', 22],
    ['Philadelphia', 22],
    ['San Antonio', 22],
    ['San Diego', 22],
    ['Dallas', 22],
    ['San Jose', 22],
    ['Austin', 22],
    ['Jacksonville', 22],
    ['San Francisco', 22],
    ['Columbus', 22],
    ['Charlotte', 26],
    ['Indianapolis', 22],
    ['Fort Worth', 24],
    ['Seattle', 22],
    ['Denver', 22],
    ['Washington', 22],
    ['Boston', 22],
    ['El Paso', 21],
    ['Detroit', 22],
    ['Nashville', 22],
    ['Portland', 22],
    ['Oklahoma City', 22],
    ['Las Vegas', 22],
    ['Colorado Springs', 11],
    ['Omaha', 12],
    ['Raleigh', 22],
    ['Miami', 22],
    ['Oakland', 13],
  ];

  const onClick = (item, diemension, event) => {
    console.info(item, diemension, event);
    alert('点击了');
  };

  return <WordCloud list={words} tooltip={false} onClick={onClick} />;
};
