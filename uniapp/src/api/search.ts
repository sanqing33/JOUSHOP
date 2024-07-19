import type { SearchGoods, SearchGoodsData } from "@/types/search";
import { http } from "./index";

// 搜索商品
export const searchGoodsAPI = (data: SearchGoodsData) => {
  return http<SearchGoods>({
    method: "POST",
    url: "/search/all",
    header: {
      "Content-Type": "application/json",
    },
    data,
  });
};
