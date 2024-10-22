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

  const handleEdit = (id: string) => {
    router.push(`/level/${id}?type=${type}`);
  };

  const handleDelete = (id: string) => {
    confirm({
      title: "確定將該等級刪除嗎？",
      okButtonProps: { size: 'middle', danger: true },
      cancelButtonProps: { size: 'middle' },
      icon: null,
      async onOk() {},
    });
  };

  return (
    <>
      {modalContext}
      <Button
        style={{ marginBottom: "12px" }}
        type="primary"
        size="large"
        onClick={() => router.push(`/level/add?type=${type}`)}
      >
        {type === "shop" ? "新增商戶使用等級" : "新增平台管理員等級"}
      </Button>
      <Table
        columns={[
          {
            title: "等級名稱",
            dataIndex: "authName",
            width: '10%',
          },
          {
            title: "具體權限內容",
            dataIndex: "menuList",
            width: '80%',
            render: (v, record) => {
              return (
                <div className="flex flex-wrap">
                  {v.map((item: any) => {
                    return <span key={item} className="mx-[5px]">{item}</span>;
                  })}
                </div>
              );
            },
          },
          {
            title: "操作",
            dataIndex: "id",
            align: "center",
            width: '10%',
            render: (v, record) => (
              <Space size="middle">
                <a onClick={() => handleEdit(record.id)} className="text-[#344B7C]">編輯</a>
                {/* <a onClick={() => handleDelete(record.id)}>刪除</a> */}
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
