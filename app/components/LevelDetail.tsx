"use client";

import { useState, useEffect } from "react";
import { Button, Input, Switch, message } from "antd";
import { useRouter, useParams } from "next/navigation";
import LevelTree from "./LevelTree";
import { getInitBtnListSelectAll, setBtnListData, getInitBtnList, getTreeData } from "../utils/basic";
import {
  getAuthLevelConfigDetail,
  saveAuthLevelConfig,
  updateUserAuthConfig
} from "@/app/utils/services";

export default function Page() {
  const { id } = useParams();
  const router = useRouter();

  const paramsStr = window.location.href.split("?")[1];
  const paramsArr = paramsStr?.split("&");
  const index = paramsArr?.findIndex((item) => item?.indexOf("type=") > -1);
  const type = paramsArr?.[index]?.split("type=")[1] || "shop"; //shop、system

  const [authName, setAuthName] = useState<string>("");
  const [menuList, setMenuList] = useState<any[]>([]);

  useEffect(() => {
    getAuthLevelConfigDetail({
      id: id as string,
    }).then((res) => {
      const menuList = getInitBtnList(res.datas.menuList);
      setMenuList(menuList);
      setAuthName(res.datas.authName);
    });
  }, [type]);

  const handleCheckedChange = (data: any, id: number) => {
    const target = setBtnListData(menuList, id, data);
    setMenuList(target);
  };

  const handleCreate = () => {
    saveAuthLevelConfig({
      menuBtnList: getTreeData(menuList),
      authType: type === "shop" ? "2" : "1",
      authName,
      id: id as string,
    }).then((res) => {
      if (res.status === 10000) {
        message.success("更新成功，即將返回等級首頁");
        router.push('/level')
      }
    });
  };

  const handleSelectAll = (e: boolean) => {
    const target = getInitBtnListSelectAll(menuList, e);
    setMenuList(target);
  };

  return (
    <>
      <div className="font-semibold text-[24px] pb-[16px] mb-[16px] border-b-[1px]">
        {type === "shop" ? "更新商戶使用等級" : "更新平台管理员等级"}
      </div>
      <div className="flex items-center text-xs mb-[16px]">
        <div className="mr-[44px]">等級名稱：</div>
        <Input
          allowClear
          value={authName}
          onChange={(e) => setAuthName(e.target.value)}
        />
      </div>
      <div className="flex items-center text-xs mb-[36px]">
        <div className="mr-[44px]">授予全權：</div>
        <div className="flex flex-col">
          <Switch
            style={{ width: "20px", marginBottom: "10px" }}
            onChange={handleSelectAll}
          ></Switch>
          <div>讓商戶能夠使用所有商店功能</div>
        </div>
      </div>
      <LevelTree menuList={menuList} onCheckedChange={handleCheckedChange} />
      <Button
        type="primary"
        style={{ borderRadius: "20px" }}
        onClick={handleCreate}
      >
        立即更新
      </Button>
    </>
  );
}
