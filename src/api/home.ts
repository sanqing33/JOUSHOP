import type { Page } from "@/types/global";
import type { HomeCategory, HomeGoods, HomeSwiper } from "@/types/home";
import { http } from "./index";

// 首页轮播图
export const getHomeSwiperAPI = (distributionSite = 1) => {
  return http<HomeSwiper[]>({
    method: "GET",
    url: "/home/banner",
    data: {
      distributionSite,
    },
  });
};

// 首页分类
export const getHomeCategoryAPI = () => {
  return http<HomeCategory[]>({
    method: "GET",
    url: "/home/category/mutli",
  });
};

// 首页推荐
export const getHomeGoodsAPI = (url: string, data?: Page) => {
  return http<HomeGoods>({
    method: "GET",
    url,
    data,
  });
};
