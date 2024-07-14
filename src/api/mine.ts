import type { UserInfo } from "@/types/global";
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
