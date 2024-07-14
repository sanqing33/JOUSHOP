export type PageResult<T> = {
  items: T[];
  counts: number;
  page: number;
  pages: number;
  pageSize: number;
};

// 页面参数
export type pageParams = {
  page?: number;
  pageSize?: number;
};

// 用户信息
export type UserInfo = {
  id: number;
  mobile: string;
  nickname: string;
  avatar: string;
  account: string;
  token: string;
};
