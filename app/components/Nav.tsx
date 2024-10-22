"use client";

import { Menu } from "antd";
import type { MenuProps } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";

const Nav = () => {
  const data = useSelector((state: any) => {
    return state.user.session;
  });
  const router = useRouter();
  const pathName = usePathname();

  const menuListId = data.menuList || [];
  const items = [
    {
      id: 29,
      label: "商戶",
      key: "/merchant",
    },
    {
      id: 30,
      label: "到期",
      key: "/expire",
    },
    {
      id: 31,
      label: "人員",
      key: "/staff",
    },
    {
      id: 32,
      label: "等級",
      key: "/level",
    },
    {
      id: 33,
      label: "日誌",
      key: "/log",
    },
  ];

  const target = items.filter((item) => menuListId.includes(item.id));
  const handleClick: MenuProps["onClick"] = ({ key }) => {
    router.push(key);
  };

  return (
    <div className="pt-[40px]">
      <Menu
        defaultSelectedKeys={[pathName]}
        items={target}
        className="!border-none [&_.ant-menu-item]:text-center"
        onClick={handleClick}
      ></Menu>
    </div>
  );
};

export default Nav;
