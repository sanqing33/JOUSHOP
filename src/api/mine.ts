import { http } from "./index";

// 用户登录
export const loginUserAPI = (phone: string, password: string) => {
  return http({
    method: "POST",
    url: " /api/v1/login/login_auth",
    data: {
      phone,
      password,
    },
  });
};

// 店铺管理员登录
export const loginAdminAPI = (phone: string, password: string) => {
  return http({
    method: "POST",
    url: " /api/v1/login/login_auth/StoreAdmin",
    data: {
      phone,
      password,
    },
  });
};
