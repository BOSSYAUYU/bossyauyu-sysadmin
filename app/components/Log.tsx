"use client";

import { Table, Spin } from "antd";
import { useState, useEffect } from "react";
import { getPageOperationLog } from "@/app/utils/services";
import { commonLogColumns } from "../utils/shopInfo";

export default function Page() {
  const [loading, setLoading] = useState<boolean>(false);
  const [logData, setLogData] = useState<any[]>([]);
  useEffect(() => {
    setLoading(true);
    getPageOperationLog({
      pageIndex: 1,
      pageSize: 100,
    })
      .then((res) => {
        setLogData(res.datas.pageDatas);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <>
      <Spin spinning={loading}>
        <Table
          rowKey="id"
          dataSource={logData}
          columns={commonLogColumns}
        ></Table>
      </Spin>
    </>
  );
}
