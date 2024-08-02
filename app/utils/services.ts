import { request } from "@/app/utils/request";

export async function getCurrentUser(): Promise<ResponseResult<User>> {
  return await request({
    url: "/api/sso/account/query_account_info",
  });
}

export async function login(data: {
  account: string;
  password: string;
}): Promise<ResponseResult<any>> {
  return await request({
    url: "/api/sso/admin/login",
    data,
  });
}

// 获取用户列表
export async function getUserList(): Promise<ResponseResult<any>> {
  return await request({
    url: "/api/sso/admin/userList",
  });
}

// 设为无效用户
export async function setUserInvalid(data: {
  adminUserId: string;
}): Promise<ResponseResult<any>> {
  return await request({
    url: "/api/sso/admin/user/setInvalid",
    data,
  });
}


// 设为有效用户
export async function setUserUse(data: {
  adminUserId: string;
}): Promise<ResponseResult<any>> {
  return await request({
    url: "/api/sso/admin/user/setUse",
    data,
  });
}


// 删除用户
export async function setUserDelete(data: {
  adminUserId: string;
}): Promise<ResponseResult<any>> {
  return await request({
    url: "/api/sso/admin/deleted",
    data,
  });
}

// 手动重置用户账户密码
export async function resetAdminBelongPsw(data: {
  adminUserId: string;
  password: string;
}): Promise<ResponseResult<any>> {
  return await request({
    url: "/api/sso/admin/resetBelongPsw",
    data,
  });
}

// 获取权限详情
export async function getAuthLevelConfigDetail(data: {
  id: string;
}): Promise<ResponseResult<any>> {
  return await request({
    url: "/api/sso/auth/config/authLevelConfigDetail",
    data,
  });
}

// 分页获取权限等级列表
export async function getPageAuthConfigList(data: {
  authType?: string;
  menuType?: string;
}): Promise<ResponseResult<any>> {
  return await request({
    url: "/api/sso/auth/config/getPageAuthConfigList",
    data,
  });
}

// 获取商铺详情
export async function getShopDetail(data: {
  shopCode: string;
}): Promise<ResponseResult<any>> {
  return await request({
    url: "/api/sso/shop/detail",
    data,
  });
}

// 设为无效商户
export async function setShopInvalid(data: {
  shopCode: string;
}): Promise<ResponseResult<any>> {
  return await request({
    url: "/api/sso/shop/setInvalid",
    data,
  });
}

// 删除商户
export async function deleteShop(data: {
  shopCode: string;
}): Promise<ResponseResult<any>> {
  return await request({
    url: "/api/sso/shop/deleted",
    data,
  });
}

// 手动重置用户账户密码
export async function resetBelongPsw(data: {
  password: string;
  shopCode: string;
}): Promise<ResponseResult<any>> {
  return await request({
    url: "/api/sso/shop/resetBelongPsw",
    data,
  });
}

// 商铺列表
export interface MerchantListSearchParams {
  pageIndex?: number;
  pageSize?: number;
  shopLevel?: string;
  lastDateType?: string;
  expiredDateType?: string;
  shopStatus?: string;
  expirationKeyword?: string;
}
export async function getShopList(
  data: MerchantListSearchParams
): Promise<ResponseResult<any>> {
  return await request({
    url: "/api/sso/admin/shop/page",
    data,
  });
}

// 更新商铺信息
export async function updateShopCommonInfo(
  data: any
): Promise<ResponseResult<any>> {
  return await request({
    url: "/api/sso/shop/updateShopInfoExpire",
    data,
  });
}

// 查询商铺成员列表
export async function getShopMembers(data: {
  shopCode: string;
}): Promise<ResponseResult<any>> {
  return await request({
    url: "/api/sso/shop/shopMembers",
    data,
  });
}

// 更新商铺成员
export async function updateShopMembers(
  data: any
): Promise<ResponseResult<any>> {
  return await request({
    url: "/api/sso/shop/updateShopMembers",
    data,
  });
}

export async function getShopTableInfo(data: {
  shopCode: string;
}): Promise<ResponseResult<any>> {
  return await request({
    url: "/api/sso/shop/getShopTableInfo",
    data,
  });
}

// 添加管理员用户
export async function addAdminUser(data: {
  account: string;
  password: string;
  menuBtnList: any[];
  adminType: string;
}): Promise<ResponseResult<any>> {
  return await request({
    url: "/api/sso/admin/addUser",
    data,
  });
} 

// 用户详情
export async function getUserDetail(data: {
  adminUserId: string;
}): Promise<ResponseResult<any>> {
  return await request({
    url: "/api/sso/admin/user/detail",
    data,
  });
} 

// 添加商铺
export async function addShop(data: {
  account: string;
  password: string;
  plusDay: string;
  shopLevel: string;
  website: string;
}): Promise<ResponseResult<any>> {
  return await request({
    url: "/api/sso/admin/addShop",
    data,
  });
} 

// 基础-新增更新权限
export async function saveAuthLevelConfig(data: {
  menuBtnList: any[];
  authName: string;
  authType: string;
}): Promise<ResponseResult<any>> {
  return await request({
    url: "/api/sso/auth/config/saveAuthLevelConfig",
    data,
  });
} 

// 基础-新增更新权限
export async function getShopAuthConfig(data: {
  authType: string;
  menuType: string;
  shopCode: string;
}): Promise<ResponseResult<any>> {
  return await request({
    url: "/api/sso/auth/config/shopAuthConfig",
    data,
  });
} 

// 基础-更新店铺权限
export async function updateShopAuthConfig(data: {
  menuBtnList: any[];
  shopCode: string;
}): Promise<ResponseResult<any>> {
  return await request({
    url: "/api/sso/auth/config/shopAuthConfig",
    data,
  });
} 