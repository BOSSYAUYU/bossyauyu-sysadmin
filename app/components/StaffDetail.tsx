"use client";

import { Button, Spin, Tabs, Select, Table, Modal, message, Input } from "antd";
import {
  setUserInvalid,
  setUserDelete,
  resetAdminBelongPsw,
  getUserDetail,
  getAuthLevelConfigDetail,
  getPageAuthConfigList,
  setUserUse,
} from "@/app/utils/services";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getInitBtnList, setBtnListData, getTreeData } from "../utils/basic";
import LevelTree from "./LevelTree";

const { confirm } = Modal;

export default function Page() {
  const router = useRouter();
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [baseInfo, setBaseInfo] = useState<{
    userAccount: string;
    lastLoginTime: string;
    userStatus: string;
  }>({
    userAccount: "",
    lastLoginTime: "",
    userStatus: "1",
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

  const [resetPsw, setResetPsw] = useState("");
  const [visible, setVisible] = useState(false);

  function handlePswChange(e: any) {
    setResetPsw(e.target.value);
  }

  function handleReset() {
    resetAdminBelongPsw({
      adminUserId: id as string,
      password: resetPsw,
    }).then((res) => {
      if (res.status === 10000) {
        message.success("重置成功");
      }
    });
    setVisible(false);
  }

  const getInitInfo = () => {
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

    getUserDetail({
      adminUserId: id as string,
    }).then((res) => {
      const { userAccount, lastLoginTime, userStatus } = res.datas;
      setBaseInfo({
        userAccount,
        lastLoginTime,
        userStatus,
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
    getInitInfo();
  }, []);

  const handleInvalid = () => {
    confirm({
      title: "確定將該用戶設為無效用戶嗎？",
      async onOk() {
        setUserInvalid({
          adminUserId: id as string,
        }).then((res) => {
          if (res.status === 10000) {
            message.success("設置停用成功");
          }
        });
      },
    });
  };

  const handleUse = () => {
    setUserUse({
      adminUserId: id as string,
    }).then((res) => {
      if (res.status === 10000) {
        message.success("恢復使用成功");
      }
    });
  };

  const handleDelete = () => {
    confirm({
      title: "確定將該用戶刪除嗎？",
      async onOk() {
        setUserDelete({
          adminUserId: id as string,
        }).then((res) => {
          if (res.status === 10000) {
            message.success("刪除成功，即將返回用戶首頁");
            router.push("/staff");
          }
        });
      },
    });
  };

  const onCommonChangeFn = (data: any, key: string) => {
    setLevelInfo({
      ...levelInfo,
      [key]: data,
    });
  };

  const handleCheckedChange = (data: any, id: number) => {
    const target = setBtnListData(menuList, id, data);
    onCommonChangeFn(target, "menuList");
  };

  const handleUpdate = () => {
    const menuBtnList = getTreeData(menuList);
  };

  const { levelOptions, currentLevelSelect, menuList } = levelInfo;
  const { userAccount, lastLoginTime, userStatus } = baseInfo;
  return (
    <>
      <Modal
        title="重置擁有人帳戶跟密碼"
        open={visible}
        onOk={handleReset}
        onCancel={() => {
          setVisible(false);
        }}
      >
        <Input
          placeholder="請輸入密碼"
          value={resetPsw}
          onChange={handlePswChange}
          allowClear
        />
      </Modal>
      <div className="mb-[30px] text-2xl font-semibold">人員詳情</div>
      <div className="mb-[24px] flex text-sm">
        {userStatus === "2" && (
          <Button
            size="large"
            onClick={handleInvalid}
            style={{ fontSize: "14px" }}
          >
            設為無效帳戶
          </Button>
        )}
        {userStatus === "1" && (
          <Button size="large" onClick={handleUse} style={{ fontSize: "14px" }}>
            設為有效帳戶
          </Button>
        )}
        <Button
          size="large"
          onClick={() => {
            setVisible(true);
          }}
          style={{ fontSize: "14px", margin: "0 16px" }}
        >
          手動重置帳戶密碼
        </Button>
        <Button
          size="large"
          onClick={handleDelete}
          style={{ fontSize: "14px" }}
        >
          刪除帳號
        </Button>
      </div>
      <div className="flex mb-[10px] item-center">
        <div className="text-[#3C3F50] text-sm w-[120px]">會員帳號</div>
        <div className="text-sm">{userAccount}</div>
      </div>
      <div className="flex mb-[10px] item-center">
        <div className="text-[#3C3F50] text-sm w-[120px]">最後登入日期</div>
        <div className="text-sm">{lastLoginTime || "--"}</div>
      </div>
      <Tabs
        size="middle"
        defaultActiveKey="1"
        items={[
          {
            label: "等級",
            key: "1",
            children: (
              <div className=" p-[16px] rounded-[16px] bg-[#F5F8F7] text-sm mb-[8px]">
                <div className="flex items-center mb-[16px]">
                  <div className="w-[60px] shrink-0 text-xs">等級：</div>
                  <Select
                    style={{ width: "200px" }}
                    options={levelOptions}
                    value={currentLevelSelect}
                    onChange={(e: any) =>
                      onCommonChangeFn(e, "currentLevelSelect")
                    }
                  ></Select>
                </div>
                <div className="flex items-center my-[24px]">
                  <div className="font-semibold text-[20px]">等級具體功能</div>
                  <div className="text-[#878A87]">（可新增減少不影響等級）</div>
                </div>
                <Spin spinning={loading}>
                  <LevelTree
                    menuList={menuList}
                    onCheckedChange={handleCheckedChange}
                  />
                </Spin>
                <Button
                  type="primary"
                  size="large"
                  style={{ marginTop: "16px" }}
                  onClick={handleUpdate}
                >
                  立即更新
                </Button>
              </div>
            ),
          },
          {
            label: "操作紀錄",
            key: "2",
            children: (
              <Table
                rowKey="id"
                dataSource={[]}
                columns={[
                  {
                    title: "管理員帳號",
                    dataIndex: "signStatus",
                  },
                  {
                    title: "操作內容",
                    dataIndex: "memberAccount",
                  },
                  {
                    title: "時間",
                    dataIndex: "paymentAmount",
                    render(v: OrderDetails["couponInfoList"]) {
                      return v?.map((d) => {
                        return d.couponName;
                      });
                    },
                  },
                  {
                    title: "位置",
                    dataIndex: "paymentType",
                  },
                  {
                    title: "設備",
                    dataIndex: "couponInfoList",
                  },
                ]}
              ></Table>
            ),
          },
        ]}
      ></Tabs>
    </>
  );
}