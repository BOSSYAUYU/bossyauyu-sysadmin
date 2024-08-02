"use client";

import { useState, useEffect } from "react";
import { Button, Input, Switch } from "antd";
import { useRouter } from "next/navigation";
import LevelTree from "./LevelTree";
import { getInitBtnListSelectAll, setBtnListData } from "../utils/basic";
import {
  getAuthLevelConfigDetail,
  saveAuthLevelConfig,
} from "@/app/utils/services";

export default function Page() {
  const route = useRouter();
  const paramsStr = window.location.href.split("?")[1];
  const paramsArr = paramsStr?.split("&");
  const index = paramsArr?.findIndex((item) => item?.indexOf("type=") > -1);
  const type = paramsArr?.[index]?.split("type=")[1] || "shop"; //shop、system

  const [authName, setAuthName] = useState<string>("");
  const [menuList, setMenuList] = useState<any[]>([]);

  useEffect(() => {
    getAuthLevelConfigDetail({
      // 商户的为4 管路员的为1
      id: type === "shop" ? "4" : "1",
    }).then((res) => {
      const menuList = getInitBtnListSelectAll(res.datas.menuList, false);
      setMenuList(menuList);
    });
  }, [type]);

  const handleCheckedChange = (data: any, id: number) => {
    const target = setBtnListData(menuList, id, data);
    setMenuList(target);
  };

  const handleCreate = () => {
    saveAuthLevelConfig({
      menuBtnList: menuList,
      authType: type === "shop" ? "2" : "1",
      authName,
    });
  };

  const handleSelectAll = (e: boolean) => {
    const target = getInitBtnListSelectAll(menuList, e);
    setMenuList(target);
  };

  return (
    <>
      <div className="font-semibold text-[24px] pb-[16px] mb-[16px] border-b-[1px]">
        {type === "shop" ? "新建商戶使用等級" : "新建平台管理员等级"}
      </div>
      <div className="flex items-center text-xs mb-[16px]">
        <div className="mr-[44px]">等級名稱：</div>
        <div className="">
          <Input allowClear onChange={(e) => setAuthName(e.target.value)} />
        </div>
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
        立即新建
      </Button>
    </>
  );
}
