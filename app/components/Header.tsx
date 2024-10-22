"use client";

import { message } from "antd";
import { loginOut } from "@/app/utils/services";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { updateUser } from "@/app/store/user";

const loginName = localStorage.getItem("loginName");

const Header = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const logOut = () => {
    loginOut()
      .then(() => {
        localStorage.setItem("token", "");
        localStorage.setItem("accountId", "");
        localStorage.setItem("loginName", "");
        localStorage.setItem("menuList", "");
        localStorage.setItem("mapMenuList", "");
        dispatch(updateUser({}));
        message.success("退出登錄成功");
      })
      .finally(() => {
        router.replace("/login");
      });
  };
  return (
    <div className="h-full flex justify-between px-[24px] items-center">
      <div className="text-[24px] text-primary font-[DINPro-Black]">
        Oshopoo
      </div>
      <div className="text-sm">
        <span>{loginName || "-"}</span>
        <span
          className="text-[#344B7C] cursor-pointer ml-[10px]"
          onClick={logOut}
        >
          退出登錄
        </span>
      </div>
    </div>
  );
};

export default Header;
