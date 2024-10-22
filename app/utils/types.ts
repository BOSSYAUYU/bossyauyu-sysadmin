interface SelectOption {
  label: string;
  value: string | number;
}

interface User {
  id?: number;
  loginName?: string;
  email?: string;
  phoneCode?: string;
  phone?: string;
  status?: number;
  createTime?: string;
  balance?: number;
  accountBalance?: number;
  checkEmailFlag?: number;
  buyCount?: number;
  amount?: number;
  sex?: number;
  acceptNotificationsFlag?: number;
  birthday?: number;
  avatarUrl?: string;
  lastLoginTime?: number;
  couponCount?: number;
  domainUrl?: string;
  menuRespList?: any[];
  menuList?: any[];
  mapMenuList?: any[];
}

type CustomerTabItems = {
  label: string;
  key: string;
  children?: any;
};

type Customer = {} & User;

interface Coupon {
  id: number;
  availableRange: number;
  circulation: number;
  couponName: string;
  couponType: number;
  discountOff: number;
  getCount: number;
  minusAmount: number;
  overAmount: number;
  status: number;
  usedCount: number;
  validityDays: number;
  validityEndTime: number;
  validityStartTime: number;
  validityType: number;
  limitGet: number;
  limitGetCount: number;
  overlayUsage: number;
}

interface RechargeRecord {
  accountId: number;
  amount: number;
  id: number;
  memberAccount: string;
  periodAmount: number;
  rechargeTime: number;
  remark: string;
  type: number;
}

interface ConsumeRecord {
  accountId: number;
  orderId: number;
  amount: number;
  id: number;
  memberAccount: string;
  periodAmount: number;
  consumeTime: number;
  remark: string;
  changeType: number;
}

interface CouponGetRecord {
  accountId: number;
  couponId: number;
  getTime: number;
  getType: number;
  memberAccount: string;
}

interface CouponUsedRecord {
  accountId: number;
  id: number;
  memberAccount: number;
  getTime: number;
  useTime: number;
}

interface Product {
  id: number;
  commodityId: number;
  categoryType: number;
  enableCount: number;
  inventory: number;
  price: number;
  mainImageList: { id: number; name: string; url: string }[];
  priceRange: string;
  sellCount: number;
  status: number;
  title: string;
  description: string;
  extendFlag: number;
  extendInfo: string;
  listingStoreList: PickUpAddress[];
  commoditySaleEnumList: { id: number; name: string }[];
  commodityDetailInfoList: {
    commodityId: number;
    currency: string;
    id: number;
    inventory: string;
    price: string;
    status: number;
    commoditySaleValueIdList: number[];
  }[];
  commoditySaleValueList: {
    id: number;
    saleEnumId: number;
    saleName: string;
    saleValue: string;
  }[];
  mainImageInfo: { id: number; url: string; name: string };
}

interface CommonMap<T> {
  [x: string]: T;
}

interface PickUpAddress {
  id: number;
  pickupAddress: string;
}

interface SystemPic {
  id: number;
  imageUrl: string;
  status: number;
  topFlag: number;
}

interface SystemSetting {
  imageShowFlag: number;
}

interface HomeBanner {
  id: number;
  imageUrl: string;
  name: string;
  openType: number;
  sort: number;
  status: number;
  toUrl: string;
}

interface HomeProductCateCom {
  commodityId: number;
  mainImageUrl: string;
  title: string;
}

interface HomeProductCate {
  id: number;
  showCommodityType: number;
  commodityIdList: HomeProductCateCom[];
  commodityInfoBoList: HomeProductCateCom[];
  sort: number;
  status: number;
  subtitle: string;
  title: string;
}

interface OrderDetails {
  accountId: number;
  buyCount: number;
  commodityInfoList: {
    commodityId: number;
    id: number;
    mainImageUrl: string;
    orderId: number;
    title: string;
  }[];
  balance: number;
  couponId: number;
  couponName: string;
  createTime: number;
  dealTime: number;
  deliveryTime: number;
  flowStatus: number;
  id: number;
  memberAccount: string;
  orderNo: string;
  orderType: number;
  originPaymentAmount: number;
  paymentAmount: number;
  paymentTime: number;
  paymentType: number;
  pickingUpTime: number;
  pickupAddress: string;
  pickupAddressId: number;
  signStatus: number;
  updateBy: string;
  updateTime: number;
  couponInfoList: {
    orderId: number;
    couponId: number;
    couponName: string;
  }[];
  orderDetailCommodityRespList: {
    buyCount: number;
    categoryType: number;
    commodityDetailId: number;
    commodityId: number;
    commoditySaleValueIdList: number[],
    commoditySaleValueList: {
      commodityId: number;
      id: number;
      saleEnumId: number;
      saleName: string;
      saleValue: string;
      status: number;
    }[];
    mainImageInfo: {
      id: number;
      name: string;
      url: string;
    };
    orderId: number;
    pickingUpTime: number;
    pickupAddress: string;
    price: number;
    title: string;
    updateTime: string;
    wantToWrite: string;
  }[];
}
