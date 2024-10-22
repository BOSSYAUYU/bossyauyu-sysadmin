'use client';

import { ReactNode, useEffect, useState } from 'react';
import { getCurrentUser } from '@/app/utils/services';
import { Spin } from 'antd';
import { useAppDispatch } from '@/app/store/hooks';
import { updateUser } from '@/app/store/user';
import { getMapTreeData } from "@/app/utils/basic";

interface Props {
  children: ReactNode;
}

const Auth = ({ children }: Props) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getCurrentUser().then(({ datas }) => {
      const { menuRespList  } = datas;
      const menuList = menuRespList?.map((item: any) => item.id);
      localStorage.setItem("menuList", JSON.stringify(menuList));
      const mapMenuList = getMapTreeData(menuRespList || []);
      dispatch(updateUser({
        ...datas,
        menuList,
        mapMenuList,
      }));
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
