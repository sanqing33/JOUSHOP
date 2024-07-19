import type { AddressList } from "@/types/global";
import { skus } from "./order.d";

// 订单商品
export type Goods = {
  id: string;
  name: string;
  skuId: string;
  picture: string;
  count: number;
  attrsText: string;
  price: number;
  payPrice: number;
  totalPrice: number;
  totalPayPrice: number;
};

// 订单合计
export type Summary = {
  goodsCount: number;
  discountPrice: number;
  postFee: number;
  totalPayPrice: number;
  totalPrice: number;
};

// 订单信息
export type Order = {
  goods: Goods[];
  summary: Summary;
  userAddresses: AddressList[];
};

// 提交订单
export type PostOrder = {
  goods: Array<{
    skuId: string;
    count: number;
  }>;
  addressId: string;
  deliveryTimeType: number;
  buyerMessage: string;
  payType: number;
  payChannel: number;
};

// 提交订单返回结果
export type PostOrderResult = {
  id: string;
  countdown: number;
  createTime: string;
  orderState: number;
  payChannel: number;
  payLatestTime: string;
  payMoney: number;
  payType: number;
  postFee: number;
  skus: skus[];
  totalMoney: number;
  totalNum: number;
};

// 订单列表
export type OrderList = {
  counts: number;
  page: number;
  pageSize: number;
  pages: number;
  items: PostOrderResult[];
};

export type skus = {
  id: string;
  image: string;
  name: string;
  attrsText: string;
  curPrice: number;
  quantity: number;
  realPay: number;
  totalMoney: number;
  spuId: string;
  properties: Array<{
    propertyMainName: string;
    propertyValueName: string;
  }>;
};

// 订单详情
export type OrderDetail = {
  id: string;
  arrivalEstimatedTime: string;
  cityCode: string;
  closeTime: string;
  consignTime: string;
  countdown: number;
  countyCode: string;
  createTime: string;
  deliveryTimeType: number;
  endTime: string;
  evaluationTime: string;
  orderState: number;
  payChannel: number;
  payLatestTime: string;
  payMoney: number;
  payState: number;
  payTime: string;
  payType: number;
  postFee: number;
  provinceCode: string;
  receiverAddress: string;
  receiverContact: string;
  receiverMobile: string;
  totalMoney: number;
  totalNum: number;
  skus: skus[];
};
