"use client";

import {
  Button,
  Input,
  Select,
  InputNumber,
  Modal,
  Radio,
  Table,
  Spin,
  message,
} from "antd";
import { DeleteTwoTone } from "@ant-design/icons";
import { useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";
import {
  handleSelectOption,
  mailOption,
  emailInputOption,
  messageOptions,
  mailSendOption,
  logColumns,
} from "../utils/shopInfo";
import {
  updateShopCommonInfo,
  getShopMembers,
  getShopTableInfo,
  updateShopMembers,
  getPageAuthConfigList,
  getAuthLevelConfigDetail,
  getShopAuthConfig,
  updateShopAuthConfig,
} from "@/app/utils/services";
import {
  getExpireDate,
  getLastDate,
  getFrontId,
  timestampToDateString,
  getInitBtnList,
  setBtnListData,
  getTreeData,
} from "../utils/basic";
import LevelTree from "./LevelTree";

const { TextArea } = Input;
const { confirm } = Modal;

export default function Page(data: { type: string }) {
  const { id } = useParams();
  const { type } = data;
  const [loading, setLoading] = useState<boolean>(false);
  // 标题 & 入参关联key
  const [signInfo, setSignInfo] = useState<{
    title: string;
    releationKey: string;
    expirationType: string;
  }>({ title: "", releationKey: "", expirationType: "" });

  // 公共有效期入参
  const [commonParams, setCommonParams] = useState<{
    changeType: string;
    plusDay: number;
  }>({
    changeType: "1",
    plusDay: 0,
  });
  // 公共基礎數據
  const [initTableBasicInfo, setInitTableBasicInfo] = useState<any>({});

  const [memberInfo, setMemberInfo] = useState<{
    memberList: any[];
    shopBelongUserAccount: string;
    memberSelectOption: any[];
    shopNowBelongUserAccount: string;
  }>({
    memberList: [],
    shopBelongUserAccount: "",
    memberSelectOption: [],
    shopNowBelongUserAccount: "",
  });

  const [websiteInfo, setWebsiteInfo] = useState<{
    websiteType: string;
    subdomainsWebUrl: string;
    personlWebUrl: string;
  }>({ websiteType: "1", personlWebUrl: "", subdomainsWebUrl: "" });

  const [emailInfo, setEmailInfo] = useState<
    {
      emaileType: string;
      personEmail: string;
      personEmailAuthCode: string;
      personEmailPort: string;
      personEmailSender: string;
      personEmailServerAddr: string;
      verificationCodeTitle: string;
      orderIsSend: boolean;
      orderTitle: string;
    } & any
  >({
    emaileType: "1",
    personEmail: "",
    personEmailAuthCode: "",
    personEmailPort: "",
    personEmailSender: "",
    personEmailServerAddr: "",
    verificationCodeTitle: "",
    orderIsSend: true,
    orderTitle: "",
  });

  const [msgInfo, setMsgInfo] = useState<{
    msgType: string;
    msgTitle: string;
    msgContent: string;
  }>({ msgType: "1", msgTitle: "", msgContent: "" });

  const [levelOptions, setLevelOptions] = useState<any[]>([]);
  const [levelInfo, setLevelInfo] = useState<{
    currentLevelSelect: string;
    menuList: any[];
  }>({
    currentLevelSelect: "",
    menuList: [],
  });

  useEffect(() => {
    getTitle();
    fetchShopMembers();
    fetchShopTableInfo();
    fetchLevelInfo();
  }, []);

  useEffect(() => {
    if (!levelInfo.currentLevelSelect) {
      getShopAuthConfig({
        authType: "2",
        menuType: "2",
        shopCode: id as string,
      }).then((res) => {
        const menuList = getInitBtnList(res.datas);
        onCommonChangeFn(menuList, "level", "menuList");
      });
    } else {
      getAuthLevelConfigDetail({
        id: levelInfo.currentLevelSelect,
      }).then((res) => {
        const menuList = getInitBtnList(res.datas.menuList, true);
        onCommonChangeFn(menuList, "level", "menuList");
      });
    }
  }, [levelInfo.currentLevelSelect, id]);

  const getTitle = () => {
    let title = "";
    let releationKey = "";
    let expirationType = "";
    switch (type) {
      case "expiration":
        title = "有效期";
        releationKey = "shopExprieResp";
        expirationType = "1";
        break;
      case "website":
        title = "網址";
        releationKey = "shopWebSite";
        expirationType = "2";
        break;
      case "email":
        title = "企業電郵";
        releationKey = "shopEmail";
        expirationType = "3";
        break;
      case "message":
        title = "短信抬頭";
        releationKey = "shopTxtMsg";
        expirationType = "4";
        break;
      case "manage":
        title = "管理帳號";
        expirationType = "5";
        break;
      case "level":
        title = "等級";
        expirationType = "6";
        break;
      case "log":
        title = "記錄";
        break;
    }
    setSignInfo({
      title,
      releationKey,
      expirationType,
    });
  };

  const fetchLevelInfo = () => {
    getPageAuthConfigList({
      authType: "3",
      menuType: "2",
    }).then((res) => {
      const pageDatas = res.datas.pageDatas.map((item: any) => {
        return {
          label: item.authName,
          value: item.authCode,
        };
      });
      setLevelOptions(pageDatas);
      // onCommonChangeFn(pageDatas, "level", "levelOptions");
    });
  };

  // 人员管路单独接口获取数据
  const fetchShopMembers = () => {
    getShopMembers({
      shopCode: id as string,
    }).then((res) => {
      const { datas } = res;
      const memberSelectOption = datas?.memberList.map((item: any) => {
        return {
          value: item.userAccount,
          label: item.userAccount,
        };
      });
      const memberList = datas?.memberList.map((item: any) => {
        return {
          ...item,
          frontId: getFrontId(),
          changeType: "1",
          plusDay: 0,
          shopMemberAccount: item.userAccount,
        };
      });
      setMemberInfo({
        memberList,
        shopBelongUserAccount: datas?.shopBelongUserAccount,
        shopNowBelongUserAccount: datas?.shopBelongUserAccount,
        memberSelectOption,
      });
    });
  };

  //初始化详情数据
  const fetchShopTableInfo = () => {
    getShopTableInfo({
      shopCode: id as string,
    }).then((res) => {
      const { datas } = res;
      setInitTableBasicInfo(datas);
      if (datas.shopWebSite) {
        setWebsiteInfo(datas.shopWebSite);
      }
      if (datas.shopEmail) {
        setEmailInfo(datas.shopEmail);
      }
      if (datas.shopTxtMsg) {
        setMsgInfo(datas.shopTxtMsg);
      }
    });
  };

  // 计算有效期
  const useGetExpireDate = (date: string) => {
    const expireDate = useMemo(
      () => getExpireDate(date, commonParams.plusDay, commonParams.changeType),
      [date, commonParams]
    );
    return expireDate;
  };

  const onCommonChangeFn = (e: any, type: string, key: string) => {
    if (type === "commonParams") {
      setCommonParams({
        ...commonParams,
        [key]: e,
      });
    }
    if (type === "website") {
      setWebsiteInfo({
        ...websiteInfo,
        [key]: e.target.value,
      });
    }
    if (type === "email") {
      setEmailInfo({
        ...emailInfo,
        [key]: e.target.value,
      });
    }
    if (type === "message") {
      setMsgInfo({
        ...msgInfo,
        [key]: e.target.value,
      });
    }
    if (type === "manage") {
      setMemberInfo({
        ...memberInfo,
        [key]: e,
      });
    }
    if (type == "level") {
      setLevelInfo({
        ...levelInfo,
        [key]: e,
      });
    }
  };

  const handleAddMember = () => {
    const data = [
      ...memberInfo.memberList,
      {
        shopMemberId: "",
        shopMemberAccount: "",
        defaulted: false,
        type: "add",
        frontId: getFrontId(),
        changeType: "1",
        plusDay: 0,
        shopCode: id,
        userExpiration: timestampToDateString(new Date().getTime()),
      },
    ];
    onCommonChangeFn(data, "manage", "memberList");
  };

  const handleDeleteMember = (id: string) => {
    confirm({
      title: "確定刪除該管理員賬號嗎？",
      onOk() {
        const data = memberInfo.memberList.filter(
          (item) => item.frontId !== id
        );
        onCommonChangeFn(data, "manage", "memberList");
      },
    });
  };

  const handleUpdateMemberDetailInfo = (
    id: string,
    key: string,
    value: string
  ) => {
    const data = memberInfo.memberList;
    const index = data.findIndex((item) => item.frontId === id);

    data[index] = {
      ...data[index],
      [key]: value,
    };
    onCommonChangeFn(data, "manage", "memberList");
  };

  const handleCheckedChange = (data: any, id: number) => {
    const target = setBtnListData(menuList, id, data);
    onCommonChangeFn(target, "level", "menuList");
  };

  const handleUpdate = () => {
    setLoading(true);
    if (type === "manage") {
      updateShopMembers({
        memberList: memberInfo.memberList,
        shopCode: id,
      })
        .then((res) => {
          if (res.status === 10000) {
            message.success("更新成功");
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } else if (type === "level") {
      const menuBtnList = getTreeData(levelInfo.menuList);
      updateShopAuthConfig({
        menuBtnList,
        shopCode: id as string,
      })
        .then((res) => {
          if (res.status === 10000) {
            message.success("更新成功");
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      const { releationKey, expirationType } = signInfo;
      let params = {};
      const commonParamsInfo = {
        releationKey: initTableBasicInfo?.[releationKey]?.id,
        expirationType,
        shopCode: id,
        ...commonParams,
      };
      if (type === "website") {
        params = {
          ...commonParamsInfo,
          ...websiteInfo,
        };
      } else if (type === "email") {
        params = {
          ...commonParamsInfo,
          ...emailInfo,
        };
      } else if (type === "message") {
        params = {
          ...commonParamsInfo,
          ...msgInfo,
        };
      }
      updateShopCommonInfo(params)
        .then((res) => {
          if (res.status === 10000) {
            message.success("更新成功");
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const { title } = signInfo;
  const { shopEmail, shopExprieResp, shopTxtMsg, shopWebSite } =
    initTableBasicInfo;
  const expirationLast = useGetExpireDate(shopExprieResp?.shopExpiration);
  const websiteLast = useGetExpireDate(shopWebSite?.webUrlExpiration);
  const emailLast = useGetExpireDate(shopEmail?.emaileExpiration);
  const { websiteType, subdomainsWebUrl, personlWebUrl } = websiteInfo;
  const { emaileType, orderTitle, verificationCodeTitle, orderIsSend } =
    emailInfo;
  const { msgType, msgTitle, msgContent } = msgInfo;
  const {
    memberList,
    shopBelongUserAccount,
    memberSelectOption,
    shopNowBelongUserAccount,
  } = memberInfo;
  const { currentLevelSelect, menuList } = levelInfo;
  return (
    <>
      <div
        className="w-[100%] p-[16px] rounded-[16px] bg-[#F5F8F7] text-sm mb-[8px]"
        key={type}
      >
        <div className="text-2xl font-semibold mb-[32px]">商户{title}</div>
        <Spin spinning={loading}>
          {type === "expiration" && (
            <div className="flex items-center">
              <div className="w-[140px] shrink-0">修改使用有效期：</div>
              <Select
                defaultValue="1"
                style={{ width: 120, marginRight: "10px" }}
                options={handleSelectOption}
                onChange={(e: any) =>
                  onCommonChangeFn(e, "commonParams", "changeType")
                }
              />
              <InputNumber
                min={0}
                defaultValue={0}
                onChange={(e: any) =>
                  onCommonChangeFn(e, "commonParams", "plusDay")
                }
              />
              <div className="flex flex-col ml-[10px]">
                <div>
                  修改後：
                  {expirationLast}
                  到期
                </div>
                <div>
                  現有效期：{shopExprieResp?.shopExpiration}到期 剩餘：
                  {getLastDate(shopExprieResp?.shopExpiration)}天
                </div>
              </div>
            </div>
          )}

          {type == "website" && (
            <>
              <div className="flex">
                <div className="shrink-0 w-[140px] pt-[6px]">
                  目前使用網址：
                </div>
                <Radio.Group
                  value={websiteType}
                  onChange={(e: any) =>
                    onCommonChangeFn(e, "website", "websiteType")
                  }
                >
                  <div className="flex items-center">
                    <Radio
                      value={"1"}
                      style={{ display: "flex", marginBottom: "10px" }}
                    >
                      <div className="shrink-0">平台域名</div>
                    </Radio>
                    <Input
                      style={{ width: "200px", margin: "0 10px" }}
                      disabled
                      value={subdomainsWebUrl}
                    />
                    <div className="text-xs">
                      .{shopWebSite?.paltformWebUrl}
                    </div>
                  </div>

                  <div className="flex items-center mt-[16px] mb-[8px]">
                    <Radio value={"2"} style={{ display: "flex" }}>
                      <div className="shrink-0">自有域名</div>
                    </Radio>
                    <Select
                      defaultValue="1"
                      style={{ width: 120, marginRight: "10px" }}
                      options={handleSelectOption}
                      onChange={(e: any) =>
                        onCommonChangeFn(e, "commonParams", "changeType")
                      }
                    />
                    <InputNumber
                      min={0}
                      defaultValue={0}
                      onChange={(e: any) =>
                        onCommonChangeFn(e, "commonParams", "plusDay")
                      }
                    />
                    <div className="flex flex-col ml-[10px] text-sm">
                      <div className="">修改後：{websiteLast} 到期</div>
                      <div>
                        現有效期：{shopWebSite?.webUrlExpiration}
                        到期 剩餘：
                        {getLastDate(shopWebSite?.webUrlExpiration)}天
                      </div>
                    </div>
                  </div>

                  <div className="text-[#878A87] text-sm">
                    請前往域名服務商添加類型：CHAME 主機記錄：@記錄值4362984321
                  </div>
                </Radio.Group>
              </div>
            </>
          )}

          {type == "email" && (
            <>
              <div className="flex">
                <div className="w-[140px] shrink-0">發送電郵地址：</div>
                <div>
                  <Radio.Group
                    value={emaileType}
                    options={mailOption}
                    onChange={(e: any) =>
                      onCommonChangeFn(e, "email", "emaileType")
                    }
                  ></Radio.Group>
                  {emaileType === "2" && (
                    <>
                      <div className="flex flex-col mt-[30px] mb-[16px]">
                        <div className="flex items-center">
                          <div className="w-[130px]">修改使用有效期：</div>
                          <Select
                            defaultValue="1"
                            style={{ width: 120, marginRight: "10px" }}
                            options={handleSelectOption}
                            onChange={(e: any) =>
                              onCommonChangeFn(e, "commonParams", "changeType")
                            }
                          />
                          <InputNumber
                            min={0}
                            defaultValue={0}
                            onChange={(e: any) =>
                              onCommonChangeFn(e, "commonParams", "plusDay")
                            }
                          />
                          <div className="flex flex-col ml-[10px]">
                            <div>修改後：{emailLast}到期</div>
                            <div>
                              現有效期：{shopEmail?.emaileExpiration} 到期
                              剩餘：
                              {getLastDate(shopEmail?.emaileExpiration)}天
                            </div>
                          </div>
                        </div>
                        <div className="text-[#878A87] mt-[8px]">
                          到期後自動切換為平台電郵發送郵件
                        </div>
                      </div>
                      <div className="flex flex-wrap text-sm">
                        {emailInputOption.map((item) => (
                          <div
                            className="flex items-center w-[30%] mb-[16px] mr-[2%]"
                            key={item.key}
                          >
                            <div className="w-[130px] shrink-0">
                              {item.label}
                            </div>
                            <Input
                              value={emailInfo?.[item.key]}
                              onChange={(e: any) => {
                                onCommonChangeFn(e, "email", item.key);
                              }}
                              allowClear
                            />
                          </div>
                        ))}
                      </div>
                      <div className="flex mb-[16px]">
                        <div className="w-[130px] shrink-0">
                          驗證碼電郵內容：
                        </div>
                        <TextArea
                          allowClear
                          value={verificationCodeTitle}
                          onChange={(e: any) => {
                            onCommonChangeFn(
                              e,
                              "email",
                              "verificationCodeTitle"
                            );
                          }}
                        />
                      </div>
                      <div className="flex mb-[16px]">
                        <div className="w-[130px] shrink-0">
                          訂單付款成功後：
                        </div>
                        <Radio.Group
                          options={mailSendOption}
                          value={orderIsSend}
                          onChange={(e: any) =>
                            onCommonChangeFn(e, "email", "orderIsSend")
                          }
                        ></Radio.Group>
                      </div>
                      <div className="flex mb-[16px]">
                        <div className="w-[130px] shrink-0">訂單電郵內容：</div>
                        <TextArea
                          allowClear
                          value={orderTitle}
                          onChange={(e: any) => {
                            onCommonChangeFn(e, "email", "orderTitle");
                          }}
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </>
          )}

          {type == "message" && (
            <>
              <div className="flex">
                <div className="w-[140px] shrink-0">發送短信抬頭：</div>
                <div className="flex-1">
                  <div className="flex mb-[16px]">
                    <Radio.Group
                      options={messageOptions}
                      value={msgType}
                      onChange={(e: any) =>
                        onCommonChangeFn(e, "message", "msgType")
                      }
                    ></Radio.Group>
                  </div>
                  <div className="flex mb-[16px]">
                    <div className="w-[130px] shrink-0">發件人抬頭：</div>
                    <Input
                      allowClear
                      value={msgTitle}
                      style={{ width: "400px" }}
                      onChange={(e: any) =>
                        onCommonChangeFn(e, "message", "msgTitle")
                      }
                    />
                  </div>
                  <div className="flex mb-[16px]">
                    <div className="w-[130px] shrink-0">驗證碼內容：</div>
                    <TextArea
                      allowClear
                      value={msgContent}
                      onChange={(e: any) =>
                        onCommonChangeFn(e, "message", "msgContent")
                      }
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {type == "manage" && (
            <>
              <div className="flex mb-[16px] items-center">
                <div className="w-[140px] mr-[16px] shrink-0">擁有人：</div>
                <Select
                  options={memberSelectOption}
                  value={shopBelongUserAccount}
                  style={{ width: "200px" }}
                  onChange={(e) =>
                    onCommonChangeFn(e, "manage", "shopBelongUserAccount")
                  }
                ></Select>
              </div>
              <div className="flex">
                <div className="w-[140px] mr-[16px] shrink-0">
                  現有管理員帳號：
                </div>
                <div>
                  <p className="mb-[16px]">
                    {shopNowBelongUserAccount}（默認）
                  </p>
                  {memberList.map((item) => (
                    <div
                      className="flex items-center mb-[16px]"
                      key={item.frontId}
                    >
                      {item.type === "add" ? (
                        <Input
                          style={{ width: "200px", marginRight: "16px" }}
                          onChange={(e: any) =>
                            handleUpdateMemberDetailInfo(
                              item.frontId,
                              "shopMemberAccount",
                              e.target.value
                            )
                          }
                        />
                      ) : (
                        <div className="w-[200px] mr-[16px]">
                          {item.shopMemberAccount}
                        </div>
                      )}
                      <Select
                        defaultValue="1"
                        style={{ width: 120, marginRight: "10px" }}
                        options={handleSelectOption}
                        onChange={(e: any) =>
                          handleUpdateMemberDetailInfo(
                            item.frontId,
                            "changeType",
                            e
                          )
                        }
                      />
                      <InputNumber
                        min={0}
                        defaultValue={0}
                        onChange={(e: any) =>
                          handleUpdateMemberDetailInfo(
                            item.frontId,
                            "plusDay",
                            e
                          )
                        }
                      />
                      <div className="flex flex-col mx-[10px]">
                        <div>
                          修改後：
                          {getExpireDate(
                            item.userExpiration,
                            item.plusDay,
                            item.changeType
                          )}
                          到期
                        </div>
                        <div>
                          現有效期：{item.userExpiration} 到期 剩餘：
                          {getLastDate(item.userExpiration)}天
                        </div>
                      </div>
                      <DeleteTwoTone
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDeleteMember(item.frontId)}
                        twoToneColor="#2c695d"
                      />
                    </div>
                  ))}
                  <p
                    className="text-[#344B7C] cursor-pointer"
                    onClick={handleAddMember}
                  >
                    + 新增管理員帳號數量
                  </p>
                </div>
              </div>
            </>
          )}

          {type == "level" && (
            <>
              <div className="flex">
                <div className="mt-[10px] w-[140px]">店鋪等級(權限)：</div>
                <Select
                  style={{ width: "200px" }}
                  options={levelOptions}
                  value={currentLevelSelect}
                  onChange={(e: any) =>
                    onCommonChangeFn(e, "level", "currentLevelSelect")
                  }
                  allowClear
                ></Select>
              </div>
              <div className="flex items-center my-[24px]">
                <div className="font-semibold text-[20px]">等級具體功能</div>
                <div className="text-[#878A87]">（可新增減少不影響等級）</div>
              </div>
              <LevelTree
                menuList={menuList}
                onCheckedChange={handleCheckedChange}
              />
            </>
          )}

          {type == "log" && (
            <Table rowKey="id" dataSource={[]} columns={logColumns}></Table>
          )}

          {type !== "log" && (
            <Button
              type="primary"
              size="large"
              style={{ marginTop: "16px" }}
              onClick={handleUpdate}
            >
              立即更新
            </Button>
          )}
        </Spin>
      </div>
    </>
  );
}
