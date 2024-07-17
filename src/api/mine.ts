import type {
  AddressList,
  Goods,
  Page,
  PageGoods,
  UserInfo,
} from "@/types/global";
import { http } from "./index";

// 用户登录
export const loginUserAPI = (phone: string, password: string) => {
  return http<UserInfo>({
    method: "POST",
    url: "/login",
    header: {
      "Content-Type": "application/json",
    },
    data: {
      account: phone,
      password,
    },
  });
};

// 店铺管理员登录
export const loginAdminAPI = (phone: string) => {
  return http<UserInfo>({
    method: "POST",
    url: "/login/wxMin/simple",
    header: {
      "Content-Type": "application/json",
    },
    data: {
      phoneNumber: phone,
    },
  });
};

// 首页推荐
export const getMineGoodsAPI = (data?: Page) => {
  return http<PageGoods<Goods>>({
    method: "GET",
    url: "/home/goods/guessLike",
    data,
  });
};

// 获取用户信息
export const getUserInfoAPI = () => {
  return http<UserInfo>({
    method: "GET",
    url: "/member/profile",
  });
};

// 修改用户信息
export const updateUserInfoAPI = (data: UserInfo) => {
  return http<UserInfo>({
    method: "PUT",
    url: "/member/profile",
    data,
  });
};

// 获取收货地址
export const getAddressListAPI = () => {
  return http<AddressList>({
    method: "GET",
    url: "/member/address",
  });
};

// 修改收货地址
export const updateAddressAPI = (data: AddressList) => {
  return http<AddressList>({
    method: "PUT",
    url: `/member/address/${data.id}`,
    data,
  });
};
