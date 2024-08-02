"use client";

import { useEffect, useState } from "react";
import { Button, Space, Tabs, Table, Modal } from "antd";
import { useRouter } from "next/navigation";
import { getPageAuthConfigList } from "@/app/utils/services";

const { confirm } = Modal;

const LevelItem = (data: {
  type: string;
  authType: string;
  menuType: string;
}) => {
  const router = useRouter();
  const [modal, modalContext] = Modal.useModal();

  const { type, authType, menuType } = data;

  const [tableData, settableData] = useState<any[]>([]);
  useEffect(() => {
    getPageAuthConfigList({ authType, menuType }).then((res) => {
      const { pageDatas } = res.datas;
      const target = pageDatas.map((item: any) => {
        item.key = item.id;
        return item;
      });
      settableData(target);
    });
  }, []);

  const handleEdit = (id: string) => {};

  const handleDelete = (id: string) => {
    confirm({
      title: "確定將該等級刪除嗎？",
      async onOk() {
        
      },
    });
  };

  return (
    <>
      {modalContext}
      <Button
        style={{ borderRadius: "20px", marginBottom: "12px" }}
        type="primary"
        onClick={() => router.push(`/level/add?type=${type}`)}
      >
        {type === "shop" ? "新增商戶使用等級" : "新增平台管理員等級"}
      </Button>
      <Table
        columns={[
          {
            title: "等級名稱",
            dataIndex: "authName",
          },
          {
            title: "具體權限內容",
            dataIndex: "content",
          },
          {
            title: "操作",
            dataIndex: "id",
            align: "center",
            render: (v, record) => (
              <Space size="middle">
                <a onClick={() => handleEdit(record.id)}>編輯</a>
                <a onClick={() => handleDelete(record.id)}>刪除</a>
              </Space>
            ),
          },
        ]}
        key="id"
        dataSource={tableData}
      ></Table>
    </>
  );
};

const menuList = [
  {
    label: "商戶使用等級",
    key: "shop",
    children: <LevelItem type="shop" authType="2" menuType="2" />,
  },
  {
    label: "平台管理員等級",
    key: "system",
    children: <LevelItem type="system" authType="1" menuType="1" />,
  },
];

export default function Page() {
  return <Tabs items={menuList} size="large"></Tabs>;
}
