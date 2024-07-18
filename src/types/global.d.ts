// 商品信息
export type Goods = {
  id: string;
  desc: string;
  discount: number;
  name: string;
  orderNum?: number;
  picture: string;
  price: number;
};

// 商品分页信息
export type PageGoods<T> = {
  items: T[];
  counts: number;
  page: number;
  pages: number;
  pageSize: number;
};

// 页面参数
export type Page = {
  page?: number;
  pageSize?: number;
};

// 用户信息
export type UserInfo = {
  id?: number;
  mobile?: string;
  nickname?: string;
  avatar?: string;
  account?: string;
  token?: string;
  birthday?: string;
  gender?: string;
  fullLocation?: string;
  profession?: string;
};

// 收货地址
export type AddressList = {
  id: string;
  receiver: string;
  address: string;
  addressTags?: string;
  cityCode?: string;
  contact: string;
  countyCode?: string;
  fullLocation: string;
  isDefault: number;
  postalCode?: string;
  provinceCode?: string;
};

// 购物车商品
export type CartItem = {
  id: string;
  skuId: string;
  name: string;
  picture: string;
  count: number;
  price: number;
  nowPrice: number;
  stock: number;
  selected: boolean;
  attrsText: string;
  isEffective: boolean;
};
