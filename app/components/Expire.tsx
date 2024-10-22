"use client";

import { Spin, Input, Checkbox, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { getShopList } from "@/app/utils/services";
import { useEffect, useState } from "react";
import { getLastDate } from "../utils/basic";

const option = [
  { label: "店鋪等級(權限)", value: "1" },
  { label: "網址", value: "2" },
  { label: "電郵", value: "3" },
  { label: "短信抬頭", value: "4" },
  { label: "管理員數量", value: "5" },
];

export default function Page() {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const [mainTableData, setMainTableData] = useState<any>([]);
  const [commonParams, setCommonParams] = useState<{
    expirationKeyword: string;
    expirationTypeList: string[];
  }>({
    expirationKeyword: "",
    expirationTypeList: [],
  });

  useEffect(() => {
    getData();
  }, [commonParams]);

  const getData = () => {
    setLoading(true)
    getShopList({
      pageIndex: 1,
      pageSize: 10,
      ...commonParams,
    }).then((res) => {
      const { pageDatas } = res.datas;
      const data = pageDatas.map((item: any) => {
        item.tableList = [
          {
            id: "1",
            name: "店鋪等級(權限)",
            expire: item.shopExpiration,
            content: "--",
          },
          {
            id: "2",
            name: "網址",
            expire: item.webUrlExpiration,
            content: item.subdomainsWebUrl,
          },
          {
            id: "3",
            name: "電郵",
            expire: item.emaileExpiration,
            content: item.shopBelongUserEmail,
          },
          {
            id: "4",
            name: "短信抬頭",
            expire: item.msgExpiration,
            content: item.msgTitle,
          },
        ];
        item?.expirationDateList?.map((x: any) => {
          item.tableList.push({
            id: item.tableList.length + 1,
            name: "管理員",
            expire: x.expirationDateEnd,
            content: "--",
          });
        });
        return item;
      });
      setMainTableData(data);
    }).finally(() => {
      setLoading(false)
    });
  };

  const updateCommonParams = (e: any, key: string) => {
    setCommonParams({
      ...commonParams,
      [key]: e,
    });
  };

  const handleDetail = (id: string) => {
    router.push(`/merchant/${id}`);
  };

  return (
    <>
      <div className="mb-[30px] flex items-center">
        <div className="text-2xl font-semibold">到期提醒</div>
        <div className="text-[#878A87]">（所有有效期低於60天就會提示）</div>
      </div>
      <Input
        placeholder="網址 擁有人 電郵 短信抬頭"
        suffix={<SearchOutlined></SearchOutlined>}
        style={{ width: "320px" }}
        onBlur={(e: any) =>
          updateCommonParams(e.target.value, "expirationKeyword")
        }
        allowClear
      />
      <div className="flex items-center my-[16px]">
        <div className="text-[14px] ">到期產品：</div>
        <Checkbox.Group
          options={option}
          onChange={(e: any) => updateCommonParams(e, "expirationTypeList")}
        />
      </div>
      <Spin spinning={loading}>
        {mainTableData.map((item: any) => {
          return (
            <div className="mb-[10px]" key={item.id}>
              <div className="flex justify-between align-center mb-[10px]">
                <div className="flex align-center">
                  <img />
                  <span>擁有人：{item.shopBelongUserAccount}</span>
                </div>
                <div
                  className="cursor-pointer text-[14px] text-[#344B7C]"
                  onClick={() => {
                    handleDetail(item.id);
                  }}
                >
                  查看商戶
                </div>
              </div>
              <Table
                rowKey="id"
                dataSource={item.tableList}
                columns={[
                  {
                    title: "到期產品",
                    dataIndex: "name",
                  },
                  {
                    title: "有效期",
                    dataIndex: "expire",
                    render: (_: any, record: any) => (
                      <span>
                        {record.expire}到期 剩餘：{getLastDate(record.expire)}天
                      </span>
                    ),
                  },
                  {
                    title: "內容",
                    dataIndex: "content",
                  },
                ]}
              ></Table>
            </div>
          );
        })}
      </Spin>
    </>
  );
}
