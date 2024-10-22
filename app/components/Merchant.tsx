"use client";

import {
  Button,
  Input,
  Checkbox,
  Spin,
  Modal,
  Form,
  Select,
  InputNumber,
  message,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import {
  getShopList,
  MerchantListSearchParams,
  getPageAuthConfigList,
  addShop,
} from "@/app/utils/services";
import { useEffect, useState } from "react";
import {
  shopDetailListInfo,
  shopSearchCheckData,
  shopCreateInfo,
} from "../utils/shopInfo";
import CryptoJS from "crypto-js";

const SALT = "tianwanggaidihu";

export default function Page() {
  const router = useRouter();

  const [form] = Form.useForm();
  const [mainTableData, setMainTableData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useState<MerchantListSearchParams>(
    {}
  );
  const [expirationKeyword, setExpirationKeyword] = useState<string>("");
  const [levelOptions, setLevelOptions] = useState<any[]>([]);
  function onSearchCheckChange(data: any, id: string) {
    setSearchParams({
      ...searchParams,
      [id]: data,
    });
  }
  const [shopSearchCheckOption, setShopSearchCheckOption] =
    useState<any[]>(shopSearchCheckData);

  useEffect(() => {
    getPageAuthConfigList({ authType: "2", menuType: "2" }).then((res) => {
      const pageDatas = res.datas.pageDatas.map((item: any) => {
        return {
          label: item.authName,
          value: item.authCode,
        };
      });
      setLevelOptions(pageDatas);
      const initSearchData = shopSearchCheckData.map((item) => {
        if (item.id === "shopLevelList") {
          item.option = pageDatas;
        }
        return item;
      });
      setShopSearchCheckOption(initSearchData);
      form.setFieldsValue({
        shopLevelList: pageDatas[0].value,
      });
    });
  }, []);

  const fetchShopList = () => {
    setLoading(true);
    getShopList({
      pageIndex: 1,
      pageSize: 10,
      search: expirationKeyword,
      ...searchParams,
    })
      .then((res) => {
        const { pageDatas } = res.datas;
        setMainTableData(pageDatas);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchShopList();
  }, [searchParams, expirationKeyword]);

  const [visible, setVisible] = useState<boolean>(false);

  const onFinish = (fieldsValue: any) => {
    addShop({
      ...fieldsValue,
      password: CryptoJS.enc.Hex.stringify(CryptoJS.MD5(fieldsValue.password + SALT)),
    }).then((res) => {
      if (res.status === 10000) {
        setVisible(false);
        setCurrentShopinfo(fieldsValue);
        setSuccessVisible(true);
        fetchShopList();
      }
    });
  };

  const [currentShopinfo, setCurrentShopinfo] = useState<any>({});

  const [successVisible, setSuccessVisible] = useState<boolean>(false);
  const handleCopy = async () => {
    try {
      let target = "";
      shopCreateInfo.map((item) => {
        target += `${item.label}:${
          item.key === "website"
            ? currentShopinfo[item.key] + ".oshopoo.com"
            : currentShopinfo[item.key]
        };`;
      });
      await navigator.clipboard.writeText(target);
      message.success("複製成功");
    } catch (err) {
      message.error("複製失敗");
    }
    setSuccessVisible(false);
  };
  return (
    <>
      <Modal
        title="創建店鋪"
        open={visible}
        onOk={() => form.submit()}
        onCancel={() => setVisible(false)}
        okText="立即創建"
      >
        <Form
          form={form}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="擁有人帳號"
            name="account"
            rules={[{ required: true }]}
          >
            <Input allowClear />
          </Form.Item>
          <Form.Item
            label="登入密碼"
            name="password"
            rules={[{ required: true }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="店鋪網址"
            name="website"
            rules={[{ required: true }]}
          >
            <Input allowClear suffix=".oshopoo.com" />
          </Form.Item>
          <Form.Item
            label="店鋪等級"
            name="shopLevel"
            rules={[{ required: true }]}
          >
            <Select options={levelOptions}></Select>
          </Form.Item>
          <Form.Item
            label="店鋪有效期"
            name="plusDay"
            rules={[{ required: true }]}
          >
            <InputNumber suffix="天" min="1" />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="創建成功"
        open={successVisible}
        onOk={handleCopy}
        onCancel={() => setSuccessVisible(false)}
        okText="一鍵複製所有信息"
        cancelText="關閉"
      >
        {shopCreateInfo.map((item) => {
          return (
            <div className="flex" key={item.key}>
              <div className="shrink-0 w-[140px]">{item.label}</div>
              <div className="">{currentShopinfo[item.key]}</div>
            </div>
          );
        })}
      </Modal>
      <div className="mb-[24px]">
        <Button
          type="primary"
          size="large"
          style={{ marginRight: "24px" }}
          onClick={() => setVisible(true)}
        >
          創建店鋪
        </Button>
        <Input
          placeholder="網址 擁有人 電郵 短信抬頭"
          suffix={<SearchOutlined></SearchOutlined>}
          style={{ width: "320px" }}
          allowClear
          onBlur={(e) => setExpirationKeyword(e.target.value)}
        ></Input>
      </div>

      {shopSearchCheckOption.map((item) => {
        return (
          <div key={item.id} className="mb-[10px]">
            <div className="w-[120px] inline-block text-sm">{item.label}</div>
            <Checkbox.Group
              options={item.option}
              onChange={(value) => onSearchCheckChange(value, item.id)}
            />
          </div>
        );
      })}

      {mainTableData.map((item: any) => {
        return (
          <div
            className="w-[100%] p-[16px] rounded-[16px] bg-[#F5F8F7] text-sm mb-[16px]"
            key={item.id}
          >
            <div className="flex mb-[30px] items-center">
              <div className="">圖片:</div>
              <img src={item?.backgroundLogoUrl} className="w-[30px] h-[30px] mx-[10px]" />
              <div className="mx-[10px]">{item.shopBelongUserAccount}</div>
              <div
                className="text-[#344B7C] cursor-pointer"
                onClick={() => router.push(`/merchant/${item.shopCode}`)}
              >
                查看商戶
              </div>
            </div>
            <Spin spinning={loading}>
              <div className="w-[100%] flex flex-wrap justify-between">
                {shopDetailListInfo.map((innerItem) => (
                  <div
                    key={innerItem.key}
                    className="w-[30%] mb-[8px] flex justify-between"
                  >
                    <div>{innerItem.label}</div>
                    <div>{item[innerItem.key] || "--"}</div>
                  </div>
                ))}
              </div>
            </Spin>
          </div>
        );
      })}
    </>
  );
}
