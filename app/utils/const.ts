export const PAGE = {
  size: 20,
};

export const GENDER_OPTIONS = [
  { label: '男', value: 0 },
  { label: '女', value: 1 },
];

export const BOOL_OPTIONS = [
  {
    label: '否',
    value: 0,
  },
  {
    label: '是',
    value: 1,
  },
];

export const ACCOUNT_STATUS_MAP: { [x: string]: string } = {
  0: '有效',
  1: '已刪除',
  2: '無效',
};

export const EMAIL_CHECK_MAP: { [x: string]: string } = {
  0: 'No',
  1: 'Yes',
};

export const COUPON_AVAILABLERANGE_MAP: { [x: string]: string } = {
  1: '全場通用',
  2: '指定商品',
};

export const COUPON_TYPE_MAP: { [x: string]: string } = {
  1: '滿減券',
  2: '折扣券',
  3: '禮品券',
};

export const COUPON_VALIDITY_TYPE_MAP: { [x: string]: string } = {
  1: '自發放/領取日起',
  2: '固定時間',
};

export const COUPON_OVERLAY_USAGE_MAP: { [x: string]: string } = {
  0: '不可以疊加使用',
  1: '可疊加使用',
};

export const COUPON_STATUS_MAP: { [x: string]: string } = {
  0: '領取中',
  1: '已刪除',
  2: '已結束',
};

export const RECHARGE_TYPE_MAP: { [x: string]: string } = {
  1: '增加',
  2: '減少',
};

export const BALANCE_CHANGE_TYPE_MAP: { [x: string]: string } = {
  1: '增值',
  2: '消費',
};

export const CUSTOMER_BUY_RECORD_STATUS_MAP: { [x: string]: string } = {
  1: '已下單',
  2: '已付款',
  3: '已發貨',
  4: '已收貨',
  5: '已成交',
};

export const COUPON_USED_STATUS_MAP: { [x: string]: string } = {
  0: '未使用',
  1: '已使用',
};

export const PRODUCT_STATUS_MAP: { [x: string]: string } = {
  0: '已上架',
  1: '已刪除',
  2: '已下架',
};

export const WEEK = [
  {
    label: 'Mon',
    value: 1,
  },
  {
    label: 'Tue',
    value: 2,
  },
  {
    label: 'Wed',
    value: 3,
  },
  {
    label: 'Thu',
    value: 4,
  },
  {
    label: 'Fri',
    value: 5,
  },
  {
    label: 'Sat',
    value: 6,
  },
  {
    label: 'Sun',
    value: 7,
  },
];

export const orderStatusMap: Record<number, string> = {
  0: '新訂單',
  1: '已記單',
};

export const paymentTypeMap: Record<number, string> = {
  1: '余额支付',
  2: '',
};
