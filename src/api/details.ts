import { http } from "./index";

// 获取商品详情
export const getGoodsDetailAPI = (id: number) => {
  return http({
    method: "GET",
    url: "/goods",
    data: {
      id,
    },
  });
};

// 添加购物车
export const postcartAPI = (skuId: string, count: number) => {
  return http({
    method: "POST",
    url: "/member/cart",
    data: {
      skuId,
      count,
    },
  });
};
