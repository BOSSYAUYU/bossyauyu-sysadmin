"use client";

import {Button, Input, message, Modal, Tabs} from "antd";
import {deleteShop, getShopDetail, resetBelongPsw, setShopInvalid, setShopUse,} from "@/app/utils/services";
import {useEffect, useState} from "react";
import {useParams, useRouter} from "next/navigation";
import {shopDetailListInfo} from "../utils/shopInfo";
import MerchantDetailInfo from "./MerchantDetailInfo";
import {UseGetBtnAuthority} from "@/app/utils/basic";

const {confirm} = Modal;

export default function Page() {
  const router = useRouter();
  const {id} = useParams();

  const [mainData, setMainData] = useState<any>({});

  useEffect(() => {
    initData()
  }, []);

  function initData() {
    getShopDetail({
      shopCode: id as string,
    }).then((res) => {
      const {datas} = res;
      setMainData(datas);
    });
  }

  function handleInvalid() {
    const status = mainData.shopStatus === "2";
    confirm({
      title: status
        ? "確定將該商戶設為無效商戶嗎？"
        : "確定將該商戶設為有效商戶嗎？",
      okButtonProps: {size: "middle", danger: true},
      cancelButtonProps: {size: "middle"},
      icon: null,
      async onOk() {
        status
          ? setShopInvalid({
            shopCode: id as string,
          }).then((res) => {
            if (res.status === 10000) {
              message.success("更新成功");
              initData()
            }
          })
          : setShopUse({
            shopCode: id as string,
          }).then((res) => {
            if (res.status === 10000) {
              message.success("更新成功");
              initData()
            }
          });
      },
    });
  }

  function handleDelete() {
    confirm({
      title: "確定刪除該商戶嗎？",
      okButtonProps: {size: "middle", danger: true},
      cancelButtonProps: {size: "middle"},
      icon: null,
      async onOk() {
        deleteShop({
          shopCode: id as string,
        }).then((res) => {
          if (res.status === 10000) {
            message.success("刪除成功，即將返回商戶首頁");
            router.push("/merchant");
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
          style={{fontSize: "14px", marginRight: "16px"}}
          disabled={UseGetBtnAuthority(2)}
        >
          {mainData.shopStatus === "2" ? "設為無效商戶" : "設為有效商戶"}
        </Button>
        <Button
          size="large"
          onClick={handleDelete}
          style={{fontSize: "14px", marginRight: "16px"}}
          disabled={UseGetBtnAuthority(3)}
        >
          刪除商戶
        </Button>
        <Button
          size="large"
          onClick={handleOpen}
          style={{fontSize: "14px"}}
          disabled={UseGetBtnAuthority(4)}
        >
          手動重置擁有人帳戶跟密碼
        </Button>
      </div>
      <div className="flex mb-[30px] items-center">
        <div className="mr-[10px]">圖片:</div>
        <img src={mainData?.backgroundLogoUrl} className="h-[30px] mx-[10px]"/>
      </div>
      <div className="w-[100%] flex flex-wrap mb-[48px] text-sm justify-between">
        {shopDetailListInfo.map((innerItem) => (
          <div
            key={innerItem.label}
            className="w-[30%] mb-[8px] flex justify-between"
          >
            <div>{innerItem.label}</div>
            <div>{innerItem.render ? innerItem.render(mainData?.[innerItem.key], mainData) : mainData?.[innerItem.key] || "--"}</div>
          </div>
        ))}
      </div>
      <div>
        <Tabs
          items={[
            {
              label: "有效期",
              key: "expiration",
              children: <MerchantDetailInfo type="expiration"/>,
            },
            {
              label: "網址",
              key: "website",
              children: <MerchantDetailInfo type="website"/>,
            },
            {
              label: "電郵",
              key: "email",
              children: <MerchantDetailInfo type="email"/>,
            },
            {
              label: "短信抬頭",
              key: "message",
              children: <MerchantDetailInfo type="message"/>,
            },
            {
              label: "管理帳號",
              key: "manage",
              children: <MerchantDetailInfo type="manage"/>,
            },
            {
              label: "等級",
              key: "level",
              children: (
                <MerchantDetailInfo
                  type="level"
                  authLevel={mainData?.shopLevel}
                />
              ),
            },
            {
              label: "記錄",
              key: "log",
              children: <MerchantDetailInfo type="log"/>,
            },
          ]}
          size="middle"
        ></Tabs>
      </div>
    </>
  );
}
