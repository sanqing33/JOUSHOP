import type { CartItem } from "@/types/global";
import type { Goods } from "@/types/order";
import { http } from "./index";

// 获取商品详情
export const getGoodsDetailAPI = (id: number) => {
  return http<Goods>({
    method: "GET",
    url: "/goods",
    data: {
      id,
    },
  });
};

// 添加购物车
export const postCartAPI = (skuId: string, count: number) => {
  return http({
    method: "POST",
    url: "/member/cart",
    data: {
      skuId,
      count,
    },
  });
};

// 获取购物车列表
export const getCartListAPI = () => {
  return http<CartItem[]>({
    method: "GET",
    url: "/member/cart",
  });
};

// 删除购物车商品
export const deleteCartAPI = (ids: string[]) => {
  return http({
    method: "DELETE",
    url: "/member/cart",
    data: {
      ids,
    },
  });
};

// 修改购物车商品数量
export const putCartAPI = (skuId: string, count: number) => {
  return http({
    method: "PUT",
    url: `/member/cart/${skuId}`,
    data: {
      count,
    },
  });
};
