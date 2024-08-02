'use client';

import { ReactNode, useEffect, useState } from 'react';
import { getCurrentUser } from '@/app/utils/services';
import { Spin } from 'antd';
import { useAppDispatch } from '@/app/store/hooks';
import { updateUser } from '@/app/store/user';

interface Props {
  children: ReactNode;
}

const Auth = ({ children }: Props) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getCurrentUser().then(({ datas }) => {
      dispatch(updateUser(datas));
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <Spin tip="加載中，請稍候...">
        <div className="h-[100vh]"></div>
      </Spin>
    );
  }

  return <>{children}</>;
};

export default Auth;
