import type { Page } from "@/types/global";
import type {
  Order,
  OrderDetail,
  OrderList,
  PostOrder,
  PostOrderResult,
} from "@/types/order";
import { http } from "./index";

// 获取待结算订单
export const getPayOrderListAPI = () => {
  return http<Order>({
    method: "GET",
    url: "/member/order/pre",
  });
};

// 获取立即购买订单
export const getBuyNowOrderAPI = (skuId: string, count: number) => {
  return http<Order>({
    method: "GET",
    url: `/member/order/pre/now?skuId=${skuId}&count=${count}`,
  });
};

// 提交订单
export const postOrderAPI = (data: PostOrder) => {
  return http<PostOrderResult>({
    method: "POST",
    url: "/member/order",
    data,
  });
};

// 支付订单(模拟)
export const postPayOrderAPI = (orderId: string) => {
  return http<any>({
    method: "GET",
    url: `/pay/mock?orderId=${orderId}`,
  });
};

// 获取订单列表
export const getOrderListAPI = (index: number, pageParams: Page) => {
  return http<OrderList>({
    method: "GET",
    url: `/member/order?page=${pageParams.page}&pageSize=${pageParams.pageSize}&orderState=${index}`,
  });
};

// 获取订单详情
export const getOrderDetailAPI = (id: string) => {
  return http<OrderDetail>({
    method: "GET",
    url: `/member/order/${id}`,
  });
};
