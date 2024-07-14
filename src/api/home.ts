import type { homeCategory, homeSwiper } from "@/types/home";
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
