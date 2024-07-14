import type { pageParams, pageResult } from "@/types/global";
import type { homeCategory, homeGoods, homeSwiper } from "@/types/home";
import { http } from "./index";

// 首页轮播图
export const getHomeSwiperAPI = (distributionSite = 1) => {
  return http<homeSwiper[]>({
    method: "GET",
    url: "/home/banner",
    data: {
      distributionSite,
    },
  });
};

// 首页分类
export const getHomeCategoryAPI = () => {
  return http<homeCategory[]>({
    method: "GET",
    url: "/home/category/mutli",
  });
};

// 首页推荐
export const getHomeGoodsAPI = (data?: pageParams) => {
  return http<pageResult<homeGoods>>({
    method: "GET",
    url: "/home/goods/guessLike",
    data,
  });
};
