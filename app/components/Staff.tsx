"use client";

import { Button, message, Table, Space, Modal } from "antd";
import { useRouter } from "next/navigation";
import { staffColumns } from "../utils/shopInfo";
import {
  getUserList,
  setUserInvalid,
  setUserDelete,
  setUserUse,
} from "@/app/utils/services";
import { useEffect, useState } from "react";

const { confirm } = Modal;

export default function Page() {
  const router = useRouter();

  const [userList, setUserList] = useState<any[]>([]);

  const goStaffAdd = () => {
    router.push("/staff/add");
  };

  const fetchUserList = () => {
    getUserList().then((res) => {
      const { datas } = res;
      setUserList(datas);
    });
  };

  useEffect(() => {
    fetchUserList();
  }, []);

  const handleDetail = (id: string) => {
    router.push(`/staff/${id}`);
  };

  const handleEdit = (id: string) => {
    router.push(`/staff/${id}`);
  };

  const handleStop = (id: string) => {
    setUserInvalid({
      adminUserId: id,
    }).then((res) => {
      if (res.status === 10000) {
        message.success("設置停用成功");
        fetchUserList();
      }
    });
  };

  const handleUse = (id: string) => {
    setUserUse({
      adminUserId: id,
    }).then((res) => {
      if (res.status === 10000) {
        message.success("恢復使用成功");
        fetchUserList();
      }
    });
  };

  const handleDelete = (id: string) => {
    confirm({
      title: "確定將該管理員刪除嗎？",
      okButtonProps: { size: 'middle', danger: true },
      cancelButtonProps: { size: 'middle' },
      icon: null,
      async onOk() {
        setUserDelete({
          adminUserId: id,
        }).then((res) => {
          if (res.status === 10000) {
            message.success("刪除成功");
            fetchUserList();
          }
        });
      },
    });
  };

  const initColumns = () => {
    return staffColumns.map((item: any) => {
      if (item.dataIndex === "config") {
        item = {
          ...item,
          render: (_: any, record: any) => (
            <Space size="middle">
              <a
                onClick={() => handleDetail(record.id)}
                className="text-[#344B7C]"
              >
                查看
              </a>
              <a
                onClick={() => handleEdit(record.id)}
                className="text-[#344B7C]"
              >
                編輯
              </a>
              {record.userStatus === "2" && (
                <a
                  onClick={() => handleStop(record.id)}
                  className="text-[#344B7C]"
                >
                  停用
                </a>
              )}
              {record.userStatus === "1" && (
                <a
                  onClick={() => handleUse(record.id)}
                  className="text-[#344B7C]"
                >
                  啟用
                </a>
              )}
              <a
                onClick={() => handleDelete(record.id)}
                className="text-[#344B7C]"
              >
                刪除
              </a>
            </Space>
          ),
        };
      } else if (item.dataIndex === "userStatus") {
        item = {
          ...item,
          render: (_: any, record: any) => (
            <div>
              {record.userStatus === "1" ? (
                <span style={{ color: "red" }}>未生效</span>
              ) : record.userStatus === "2" ? (
                "生效中"
              ) : (
                "已過期"
              )}
            </div>
          ),
        };
      }
      return item;
    });
  };

  return (
    <>
      <div className="mb-[30px] text-2xl font-semibold">平台管理人員</div>
      <Button
        onClick={goStaffAdd}
        type="primary"
        size="large"
        style={{ marginBottom: "16px" }}
      >
        新建平台管理人員
      </Button>
      <Table rowKey="id" dataSource={userList} columns={initColumns()}></Table>
    </>
  );
}
