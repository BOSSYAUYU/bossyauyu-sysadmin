type ResponseResult<T> = {
  code: number;
  message: string;
  datas: T;
  status: number;
};

type PageDatasResult<T> = {
  totalCount: number;
  pageDatas: Array<T>;
};

type PageReq = {
  pageIndex: number;
  pageSize: number;
};

type CreateCustomerReq = Partial<User>;

type CustomerSummaryRes = {
  allClientCount: number;
  balanceCount: number;
  noBalanceCount: number;
  totalNoUsedAmount: number;
};

type CustomerListReq = {
  search?: string;
  channel?: number;
  createTimeOrderBy?: number;
  amountOrderBy?: number;
} & PageReq;

type CustomerDetailsReq = {
  clientId?: number | string;
};

type CustomerDetailsRes = User;

type CouponListReq = { status?: number } & PageReq;

type CouponDetailsReq = { couponId: string };

type UpdateCouponReq = {
  couponId: string;
  circulation?: number;
  status?: number;
};

type DistributeCouponReq = {
  couponId: number;
  accountIds: number[];
};

type RechargeReq = {
  accountIds: number[];
  amount: number;
  remark: string;
  type: number;
};

type UploadKeyItem = {
  fileHash: string;
  fileIdx: number;
  fileName: string;
  fileSize: number;
};

type UploadKeyResItem = {
  fileId: number;
  fileIdx: number;
  fileUrl: string;
  uploadKey: string;
};

type UploadKeyReq = {
  fileUploadReqAttrs: UploadKeyItem[];
};

type UploadKeyRes = {
  uploadFileRespAttrs: UploadKeyResItem[];
};

type UploadFileRes = {
  fileId: number;
  fileUrl: string;
  fileKey: string;
};

type CustomerGrantCouponReq = {
  clientId: number | string;
  couponIds: number[];
};

type UpdateCustomerReq = {
  clientId: number | string;
  email?: string;
  password?: string;
  phoneCode?: string;
  phone?: string;
  sex?: number;
  status?: number;
};

type CustomerBuyRecord = {
  couponId: number;
  dealTime: number;
  deliveryTime: number;
  flowStatus: number;
  id: number;
  orderNo: string;
  orderType: number;
  originPaymentAmount: number;
  paymentAmount: number;
  paymentTime: number;
  paymentType: number;
  pickingUpTime: number;
  pickupAddressId: number;
  signStatus: number;
  couponInfoList: { couponId: number; couponName: string; orderId: number }[];
};

type CustomerBalanceRecord = {
  id: number;
  amount: number;
  changeTime: number;
  periodAmount: number;
  rechargeType: number;
  remark: string;
};

type CustomerCouponRecord = Coupon & {
  useStatus: number;
  getTime: number;
  couponId: number;
  couponGetId: number;
  invalid: number;
};
