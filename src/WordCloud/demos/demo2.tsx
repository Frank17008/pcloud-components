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
  const callbacks = {
    getWordColor: (word) => (word.value > 50 ? '#2d87f9' : 'red'),
    onWordClick: (v) => {
      console.log(v);
    },
    onWordMouseOut: (v) => {},
    onWordMouseOver: (v) => {},
    getWordTooltip: (word) => `${word.text} (${word.value}) [${word.value > 50 ? '高风险' : '低风险'}]`,
  };
  return <WordCloud words={words} callbacks={callbacks} />;
};
