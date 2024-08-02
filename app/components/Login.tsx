'use client';

import { Form, Input, Button } from 'antd';
import CryptoJS from 'crypto-js';
import { login } from '@/app/utils/services';
import { useRouter } from 'next/navigation';

const SALT = 'tianwanggaidihu';

const Login = () => {
  const [form] = Form.useForm();
  const router = useRouter();

  const handleSubmit = async () => {
    const { account, password } = form.getFieldsValue();
    const params = {
      account,
      password,
      // password: CryptoJS.enc.Hex.stringify(CryptoJS.MD5(password + SALT)),
    };
    const { datas } = await login(params);
    localStorage.setItem('token', datas?.token);
    localStorage.setItem('accountId', datas?.accountId);
    router.replace('/merchant');
  };

  return (
    <div className="absolute w-[384px] h-[77.78%] bg-white rounded-tl-[32px] rounded-tr-[32px] bottom-0 left-[50%] translate-x-[-50%] p-[32px]">
      <div className="text-primary mb-[32px]">BOSSYAUYU</div>
      <div className="text-[40px] font-semibold mb-[8px]">登入</div>
      <div className="text-[20px] mb-[32px]">後台管理系統</div>
      <Form form={form} onFinish={handleSubmit}>
        <Form.Item name="account" required rules={[{ required: true }]}>
          <Input placeholder="請輸入帳號"></Input>
        </Form.Item>
        <Form.Item name="password" required rules={[{ required: true }]}>
          <Input.Password placeholder="請輸入密碼"></Input.Password>
        </Form.Item>
        <Form.Item>
          <div className="h-[8px]"></div>
          <Button block type="primary" htmlType="submit" size="large">
            登入
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
