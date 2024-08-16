import { useContext } from 'react';
import classNames from 'classnames';
import ReactWordcloud, { Props } from 'react-wordcloud';
import { ConfigContext } from '../ConfigProvider';

export type WordCloudProps = Props & { className?: string };

const WordCloud = (props: WordCloudProps) => {
  const { className = '' } = props;
  const { prefixCls, getPrefixCls }: any = useContext(ConfigContext);
  const classname = getPrefixCls('word-cloud');
  const wrapperClass = classNames({ [`${prefixCls}-word-cloud`]: !!prefixCls }, classname, className);

  return (
    <div className={wrapperClass}>
      <ReactWordcloud {...props} />
    </div>
  );
};

export default WordCloud;
