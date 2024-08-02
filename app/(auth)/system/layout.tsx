'use client';

import { MenuProps, Menu } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import { ReactNode } from 'react';

export default function SystemLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathName = usePathname();

  const items = [
    {
      label: '圖片展示頁',
      key: '/system/pic',
    },
    {
      label: '首頁設置',
      key: '/system/home',
    },
    {
      label: 'Footer設置',
      key: '/system/footer',
    },
    {
      label: '頁面SEO',
      key: '/system/seo',
    },
    {
      label: '品牌設置',
      key: '/system/brand',
    },
    {
      label: '支付方式',
      key: '/system/pay',
    },
    {
      label: '門市地址',
      key: '/system/address',
    },
    {
      label: '域名設置',
      key: '/system/domain',
    },
    {
      label: '操作日誌',
      key: '/system/log',
    },
  ];

  const handleClick: MenuProps['onClick'] = ({ key }) => {
    router.push(key);
  };

  return (
    <div className="flex gap-[32px]">
      <div>
        <Menu
          defaultSelectedKeys={[pathName]}
          items={items}
          className="!border-none [&_.ant-menu-item]:text-center"
          onClick={handleClick}
        ></Menu>
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}
