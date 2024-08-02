"use client";

import { Table } from "antd";

export default function Page() {
  return (
    <>
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
    </>
  );
}