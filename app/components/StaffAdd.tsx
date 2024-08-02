"use client";

import { Button, Input, Select, Spin, message } from "antd";
import { useEffect, useState } from "react";
import {
  getAuthLevelConfigDetail,
  getPageAuthConfigList,
  addAdminUser,
} from "@/app/utils/services";
import { useRouter } from "next/navigation";
import { getInitBtnList, setBtnListData, getTreeData } from "../utils/basic";
import LevelTree from "./LevelTree";

export default function Page() {
  const router = useRouter();
  
  const [loading, setLoading] = useState<boolean>(false);

  const [baseInfo, setBaseInfo] = useState<{
    account: string;
    password: string;
  }>({
    account: "",
    password: "",
  });
  const [levelInfo, setLevelInfo] = useState<{
    levelOptions: any[];
    currentLevelSelect: string;
    menuList: any[];
  }>({
    levelOptions: [],
    currentLevelSelect: "",
    menuList: [],
  });

  const onCommonChangeFn = (data: any, key: string) => {
    setLevelInfo({
      ...levelInfo,
      [key]: data,
    });
  };

  const fetchLevelInfo = () => {
    getPageAuthConfigList({
      authType: "1",
      menuType: "1",
    }).then((res) => {
      const pageDatas = res.datas.pageDatas.map((item: any) => {
        return {
          label: item.authName,
          value: item.authCode,
        };
      });
      const currentLevelSelect = pageDatas?.[0]?.value;
      setLevelInfo({
        ...levelInfo,
        levelOptions: pageDatas,
        currentLevelSelect,
      });
    });
  };

  useEffect(() => {
    if (!levelInfo.currentLevelSelect) return;
    setLoading(true);
    getAuthLevelConfigDetail({
      id: levelInfo.currentLevelSelect,
    })
      .then((res) => {
        const menuList = getInitBtnList(res.datas.menuList, false);
        onCommonChangeFn(menuList, "menuList");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [levelInfo.currentLevelSelect]);

  useEffect(() => {
    fetchLevelInfo();
  }, []);

  const handleCheckedChange = (data: any, id: number) => {
    const target = setBtnListData(menuList, id, data);
    onCommonChangeFn(target, "menuList");
  };

  const handleAdd = () => {
    const menuBtnList = getTreeData(menuList);
    const { account, password } = baseInfo;
    addAdminUser({
      account,
      password,
      menuBtnList,
      adminType: levelInfo.currentLevelSelect
    }).then((res) => {
      if (res.status === 10000) {
        message.success("新增成功");
        message.success("新增成功，即將返回人員首頁");
        router.push('/merchant')
      }
    });
  };

  const { levelOptions, currentLevelSelect, menuList } = levelInfo;
  return (
    <>
      <div className="mb-[30px] text-2xl font-semibold">新建平台管理人員</div>
      <div className="flex items-center mb-[16px]">
        <div className="w-[60px] shrink-0 text-xs">帳號：</div>
        <Input
          style={{ width: "400px" }}
          allowClear
          onChange={(e) => {
            setBaseInfo({
              ...baseInfo,
              account: e.target.value,
            });
          }}
        />
      </div>
      <div className="flex items-center mb-[16px]">
        <div className="w-[60px] shrink-0 text-xs">密碼：</div>
        <Input.Password
          style={{ width: "400px" }}
          allowClear
          onChange={(e) => {
            setBaseInfo({
              ...baseInfo,
              password: e.target.value,
            });
          }}
        />
      </div>
      <div className="flex items-center mb-[16px]">
        <div className="w-[60px] shrink-0 text-xs">等級：</div>
        <Select
          style={{ width: "200px" }}
          options={levelOptions}
          value={currentLevelSelect}
          onChange={(e: any) => onCommonChangeFn(e, "currentLevelSelect")}
        ></Select>
      </div>

      <div className="flex items-center my-[24px]">
        <div className="font-semibold text-[20px]">等級具體功能</div>
        <div className="text-[#878A87]">（可新增減少不影響等級）</div>
      </div>
      <Spin spinning={loading}>
        <LevelTree menuList={menuList} onCheckedChange={handleCheckedChange} />
      </Spin>
      <Button
        type="primary"
        size="large"
        style={{ marginTop: "16px" }}
        onClick={handleAdd}
      >
        立即新建
      </Button>
    </>
  );
}
