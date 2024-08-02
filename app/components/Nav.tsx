'use client';

import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { usePathname, useRouter } from 'next/navigation';

const Nav = () => {
  const router = useRouter();
  const pathName = usePathname();

  const items = [
    {
      label: '商戶',
      key: '/merchant',
    },
    {
      label: '到期',
      key: '/expire',
    },
    {
      label: '人員',
      key: '/staff',
    },
    {
      label: '等級',
      key: '/level',
    },
    {
      label: '日誌',
      key: '/log',
    },
  ];

  const handleClick: MenuProps['onClick'] = ({ key }) => {
    router.push(key);
  };

  return (
    <div className="pt-[40px]">
      <Menu
        defaultSelectedKeys={[pathName]}
        items={items}
        className="!border-none [&_.ant-menu-item]:text-center"
        onClick={handleClick}
      ></Menu>
    </div>
  );
};

export default Nav;
