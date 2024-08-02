"use client";

import { Button, Input, Tabs, message, Modal } from "antd";
import {
  getShopDetail,
  setShopInvalid,
  deleteShop,
  resetBelongPsw,
} from "@/app/utils/services";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { shopDetailListInfo } from "../utils/shopInfo";
import MerchantDetailInfo from "./MerchantDetailInfo";

const { confirm } = Modal;

const menuList = [
  {
    label: "有效期",
    key: "expiration",
    children: <MerchantDetailInfo type="expiration" />,
  },
  {
    label: "網址",
    key: "website",
    children: <MerchantDetailInfo type="website" />,
  },
  {
    label: "電郵",
    key: "email",
    children: <MerchantDetailInfo type="email" />,
  },
  {
    label: "短信抬頭",
    key: "message",
    children: <MerchantDetailInfo type="message" />,
  },
  {
    label: "管理帳號",
    key: "manage",
    children: <MerchantDetailInfo type="manage" />,
  },
  {
    label: "等級",
    key: "level",
    children: <MerchantDetailInfo type="level" />,
  },
  {
    label: "記錄",
    key: "log",
    children: <MerchantDetailInfo type="log" />,
  },
];

export default function Page() {
  const router = useRouter();
  const { id } = useParams();

  const [mainData, setMainData] = useState<any>({});

  useEffect(() => {
    getShopDetail({
      shopCode: id as string,
    }).then((res) => {
      const { datas } = res;
      setMainData(datas);
    });
  }, []);

  function handleInvalid() {
    confirm({
      title: "確定將該商戶設為無線商戶嗎？",
      async onOk() {
        setShopInvalid({
          shopCode: id as string,
        }).then((res) => {
          if (res.status === 10000) {
            message.success("更新成功");
          }
        });
      },
    });
  }

  function handleDelete() {
    confirm({
      title: "確定刪除該商戶嗎？",
      async onOk() {
        deleteShop({
          shopCode: id as string,
        }).then((res) => {
          if (res.status === 10000) {
            message.success("刪除成功，即將返回商戶首頁");
            router.push('/merchant')
          }
        });
      },
    });
  }

  const [resetPsw, setResetPsw] = useState("");
  const [visible, setVisible] = useState(false);

  function handlePswChange(e: any) {
    setResetPsw(e.target.value);
  }

  function handleReset() {
    resetBelongPsw({
      shopCode: id as string,
      password: resetPsw,
    }).then((res) => {
      if (res.status === 10000) {
        message.success("重置成功");
      }
    });
    handleClose();
  }

  function handleClose() {
    setVisible(false);
  }

  function handleOpen() {
    setVisible(true);
  }
  

  return (
    <>
      <Modal
        title="重置擁有人帳戶跟密碼"
        open={visible}
        onOk={handleReset}
        onCancel={handleClose}
      >
        <Input
          placeholder="請輸入密碼"
          value={resetPsw}
          onChange={handlePswChange}
          allowClear
        />
      </Modal>
      <div className="mb-[33px] text-2xl font-semibold">商戶詳情</div>
      <div className="mb-[24px] flex text-sm">
        <Button
          size="large"
          onClick={handleInvalid}
          style={{ fontSize: "14px", marginRight: "16px" }}
        >
          設為無效商戶
        </Button>
        <Button
          size="large"
          onClick={handleDelete}
          style={{ fontSize: "14px", marginRight: "16px" }}
        >
          刪除商戶
        </Button>
        <Button size="large" onClick={handleOpen} style={{ fontSize: "14px" }}>
          手動重置擁有人帳戶跟密碼
        </Button>
      </div>
      <div className="flex mb-[30px] items-center">
        <div className="mr-[10px]">圖片:</div>
        <img src="/1.png" className="w-[30px] h-[30px] mx-[10px]" />
      </div>
      <div className="w-[100%] flex flex-wrap mb-[48px] text-sm justify-between">
        {shopDetailListInfo.map((innerItem) => (
          <div
            key={innerItem.label}
            className="w-[30%] mb-[8px] flex justify-between"
          >
            <div>{innerItem.label}</div>
            <div>{mainData?.[innerItem.key] || "--"}</div>
          </div>
        ))}
      </div>
      <div>
        <Tabs items={menuList} size="middle"></Tabs>
      </div>
    </>
  );
}
