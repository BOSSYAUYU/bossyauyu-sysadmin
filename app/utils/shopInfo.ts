export const shopDetailListInfo = [
  {
    key: "shopCode",
    label: "店鋪編碼",
  },
  {
    key: "shopLevelName",
    label: "店鋪等級(權限)",
  },
  {
    key: "shopStatus",
    label: "狀態",
    render(v) {
      return v ? ['未生效', '生效中', '已过期'][v] : '--'
    }
  },
  {
    key: "shopMemberNum",
    label: "擁有會員數",
  },
  {
    key: "shopExpiration",
    label: "店鋪有效期",
  },
  {
    key: "1",
    label: "營業總額",
  },
  {
    key: "2",
    label: "近一個月營業額度",
  },
  {
    key: "subdomainsWebUrl",
    label: "網址",
    render(v): string {
      return v + '.oshopoo.com'
    }
  },
  {
    key: "shopBelongUserId",
    label: "擁有人",
  },
  {
    key: "webUrlExpiration",
    label: "網址有效期",
  },
  {
    key: "shopUserNum",
    label: "管理員數量",
  },
  {
    key: "createdTime",
    label: "註冊日期",
  },
  {
    key: "lastLoginTime",
    label: "最後登錄",
  },
  {
    key: "personEmail",
    label: "電郵",
  },
  {
    key: "emaileExpiration",
    label: "電郵有效期",
  },
  {
    key: "msgTitle",
    label: "短信抬頭",
  },
  {
    key: "phone",
    label: "電話",
  },
  {
    key: "msgExpiration",
    label: "短信有效期",
  },
];

export const shopSearchCheckData = [
  {
    id: "shopLevelList",
    label: "店鋪等級(權限)：",
    option: [],
  },
  {
    id: "expiredDateTypeList",
    label: "店鋪剩餘有效期：",
    option: [
      {label: "剩餘30天以下", value: "1"},
      {label: "剩餘90天以下", value: "2"},
      {label: "剩餘180天以下", value: "3"},
      {label: "剩餘180天以上", value: "4"},
      {label: "剩餘300天以上", value: "5"},
    ],
  },
  {
    id: "lastDateTypeList",
    label: "最後登錄：",
    option: [
      {label: "30天未登錄", value: "1"},
      {label: "90天未登錄", value: "2"},
      {label: "180天未登錄", value: "3"},
    ],
  },
  {
    id: "shopStatusList",
    label: "狀態：",
    option: [
      {label: "有效", value: "2"},
      {label: "無效", value: "1"},
    ],
  },
];

export const handleSelectOption = [
  {value: "1", label: "添加天數"},
  {value: "2", label: "减少天數"},
];

export const mailOption = [
  {label: "平台電郵", value: "1"},
  {label: "商戶自定義電郵", value: "2"},
];

export const mailSendOption = [
  {label: "發送電郵", value: true},
  {label: "不發送電郵", value: false},
];

export const emailInputOption = [
  {
    label: "電郵地址：",
    key: "personEmail",
  },
  {
    label: "授權碼：",
    key: "personEmailAuthCode",
  },
  {
    label: "發件人：",
    key: "personEmailSender",
  },
  {
    label: "發送服務器地址：",
    key: "personEmailServerAddr",
  },
  {
    label: "端口號：",
    key: "personEmailPort",
  },
];

export const messageOptions = [
  {label: "平台抬頭", value: "1"},
  {label: "商戶自定抬頭", value: "2"},
];

export const staffColumns = [
  {
    title: "帳號",
    dataIndex: "userAccount",
  },
  {
    title: "等級",
    dataIndex: "authName",
  },
  {
    title: "最後登錄",
    dataIndex: "lastLoginTime",
  },
  {
    title: "用戶狀態",
    dataIndex: "userStatus",
  },
  {
    title: "操作",
    dataIndex: "config",
  },
];

export const shopCreateInfo = [
  {
    label: "擁有人帳號",
    key: "account",
  },
  {
    label: "登入密碼",
    key: "password",
  },
  {
    label: "店鋪網址",
    key: "website",
  },
  {
    label: "店鋪等級",
    key: "shopLevel",
  },
  {
    label: "店鋪有效期",
    key: "plusDay",
  },
];

export const commonLogColumns = [
  {
    title: "管理員帳號",
    dataIndex: "createdName",
    width: "10%",
  },
  {
    title: "操作內容",
    dataIndex: "opertaionBeforContent",
    width: "30%",
    ellipsis: true,
  },
  {
    title: "時間",
    dataIndex: "createdTime",
    width: "20%",
  },
  {
    title: "位置",
    dataIndex: "ipAddr",
    width: "10%",
  },
  {
    title: "設備",
    dataIndex: "device",
  },
];
