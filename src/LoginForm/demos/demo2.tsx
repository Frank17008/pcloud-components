import { useMemo, useState } from 'react';
import { Button, message, Space } from 'antd';
import { DForm, LoginForm, type DItemProps } from '@pointcloud/pcloud-components';

const loginRequest = (username: string, captcha: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 模拟请求成功的情况
      if (username && captcha) {
        resolve({
          username,
          token: 'fake-token-' + Date.now(),
          expires: Date.now() + 3600000,
        });
      } else {
        // 模拟请求失败的情况
        reject(new Error('用户名或验证码错误'));
      }
    }, 1000);
  });
};

export default () => {
  const [countdown, setCountdown] = useState(0);
  const [mathQuestion, setMathQuestion] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [form] = DForm.useForm();

  const onFinish = async (values: any) => {
    try {
      // 检查验证码是否正确
      if (parseInt(values.captcha) !== correctAnswer) {
        message.error('验证码错误');
        return;
      }
      // 模拟实际的登录请求
      const response = await loginRequest(values.username, values.captcha);
      // 处理登录成功的结果
      message.success(`登录成功！用户名: ${response.username}，欢迎回来！`);
      console.log('登录成功:', response);
    } catch (error: any) {
      // 处理登录失败的情况
      message.error(error.message || '登录失败，请稍后重试');
    }
  };

  // 生成简单的数学题
  const generateMathQuestion = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const question = `${num1} + ${num2} = ?`;
    const answer = num1 + num2;
    setMathQuestion(question);
    setCorrectAnswer(answer);
    return { question, answer };
  };

  const getCaptcha = () => {
    form.validateFields(['username']).then(() => {
      generateMathQuestion();
      setCountdown(30);
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setMathQuestion('');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    });
  };

  const extraItems: DItemProps[] = useMemo(
    () => [
      {
        name: 'captcha',
        label: '验证码',
        renderType: 'input',
        formItemProps: {
          rules: [{ required: true, message: '请输入验证码' }],
        },
        placeholder: '请输入计算结果',
        addonAfter: (
          <Space>
            {mathQuestion && <span style={{ color: 'red' }}>{mathQuestion}</span>}
            <Button size="small" onClick={getCaptcha} disabled={countdown > 0}>
              {countdown > 0 ? `${countdown}s` : '获取验证码'}
            </Button>
          </Space>
        ),
      },
    ],
    [countdown, mathQuestion],
  );

  return (
    <div style={{ maxWidth: 400, margin: '0 auto', padding: 20 }}>
      <LoginForm form={form} onFinish={onFinish} extraItems={extraItems} loginText="登录" />
    </div>
  );
};
