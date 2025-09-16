import { WordCloud, type WordCloudProps } from '@pointcloud/pcloud-components';
import { useCallback, useState } from 'react';

const fonts = ['Microsoft YaHei', 'Arial', 'Times New Roman', 'Courier New', 'Georgia'];
const colors = ['random-dark', 'random-light', '#1890ff', '#f5222d', '#52c41a', '#722ed1'];
const shapes = ['circle', 'cardioid', 'diamond', 'triangle-forward', 'triangle', 'pentagon', 'star'];

export default () => {
  const [options, setOptions] = useState<WordCloudProps['options']>({
    fontWeight: 'bold',
    color: 'random-dark',
    fontFamily: 'Microsoft YaHei',
    backgroundColor: '#ffffff',
    minSize: 12,
    gridSize: 8,
    weightFactor: 5,
    rotateRatio: 0.5,
    drawOutOfBound: false,
    shrinkToFit: true,
    shape: 'circle',
    minRotation: -Math.PI / 4,
    maxRotation: Math.PI / 2,
    rotationSteps: 4,
    shuffle: true,
  });

  const words: WordCloudProps['list'] = [
    ['New York', 32],
    ['Los Angeles', 28],
    ['Chicago', 26],
    ['Houston', 24],
    ['Phoenix', 22],
    ['Philadelphia', 22],
    ['San Antonio', 20],
    ['San Diego', 20],
    ['Dallas', 18],
    ['San Jose', 18],
    ['Austin', 18],
    ['Jacksonville', 16],
    ['San Francisco', 16],
    ['Columbus', 16],
    ['Charlotte', 26],
    ['Indianapolis', 14],
    ['Fort Worth', 24],
    ['Seattle', 14],
    ['Denver', 14],
    ['Washington', 12],
    ['Boston', 12],
    ['El Paso', 12],
    ['Detroit', 12],
    ['Nashville', 12],
    ['Portland', 10],
    ['Oklahoma City', 10],
    ['Las Vegas', 10],
  ];

  const handleOptionChange = useCallback(<T extends keyof NonNullable<WordCloudProps['options']>>(key: T, value: NonNullable<WordCloudProps['options']>[T]) => {
    setOptions((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const containerStyle: React.CSSProperties = {
    padding: 24,
    backgroundColor: '#f0f2f5',
  };

  const controlStyle: React.CSSProperties = {
    marginBottom: 16,
    display: 'flex',
    gap: 8,
    flexWrap: 'wrap',
  };

  const buttonStyle: React.CSSProperties = {
    padding: '4px 12px',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#d9d9d9',
    borderRadius: 4,
    backgroundColor: '#fff',
    cursor: 'pointer',
    transition: 'all 0.3s',
  };

  const activeButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    borderColor: '#1890ff',
    color: '#1890ff',
  };

  return (
    <div style={containerStyle}>
      <div style={controlStyle}>
        <div style={{ marginRight: 16 }}>
          <div style={{ marginBottom: 8 }}>形状：</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {shapes.map((shape) => (
              <button
                type="button"
                key={shape}
                onClick={() => handleOptionChange('shape', shape)}
                style={options?.shape === shape ? activeButtonStyle : buttonStyle}
              >
                {shape}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={controlStyle}>
        <div style={{ marginRight: 16 }}>
          <div style={{ marginBottom: 8 }}>颜色：</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {colors.map((color) => (
              <button
                type="button"
                key={color}
                onClick={() => handleOptionChange('color', color)}
                style={options?.color === color ? activeButtonStyle : buttonStyle}
              >
                {color === 'random-dark' ? '随机深色' : color === 'random-light' ? '随机浅色' : color}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={controlStyle}>
        <div style={{ marginRight: 16 }}>
          <div style={{ marginBottom: 8 }}>字体：</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {fonts.map((font) => (
              <button
                type="button"
                key={font}
                onClick={() => handleOptionChange('fontFamily', font)}
                style={options?.fontFamily === font ? activeButtonStyle : buttonStyle}
              >
                {font}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={controlStyle}>
        <div style={{ marginRight: 16 }}>
          <div style={{ marginBottom: 8 }}>大小：</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {[3, 5, 8, 10].map((size) => (
              <button
                type="button"
                key={size}
                onClick={() => handleOptionChange('weightFactor', size)}
                style={options?.weightFactor === size ? activeButtonStyle : buttonStyle}
              >
                {size === 3 ? '小' : size === 5 ? '中' : size === 8 ? '大' : '特大'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={controlStyle}>
        <div style={{ marginRight: 16 }}>
          <div style={{ marginBottom: 8 }}>旋转：</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {[0, 0.3, 0.5, 0.8].map((ratio) => (
              <button
                type="button"
                key={ratio}
                onClick={() => handleOptionChange('rotateRatio', ratio)}
                style={options?.rotateRatio === ratio ? activeButtonStyle : buttonStyle}
              >
                {ratio === 0 ? '无' : ratio === 0.3 ? '少' : ratio === 0.5 ? '中' : '多'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ height: 500, border: '1px solid #d9d9d9', borderRadius: 4, overflow: 'hidden' }}>
        <WordCloud list={words} options={options} />
      </div>
    </div>
  );
};
