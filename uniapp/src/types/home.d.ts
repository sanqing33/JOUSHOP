import { Goods, Page } from "./global";

// 首页轮播图
export type HomeSwiper = {
  hrefUrl?: string;
  id?: string;
  imgUrl: string;
  type?: number;
};

// 首页分类
export type HomeCategory = {
  id: string;
  name: string;
  icon: string;
};

// 首页商品
export type HomeGoods = {
  bannerPictures: string;
  id: string;
  title: string;
  subTypes: Array<{
    id: string;
    title: string;
    goodsItems: Page<Goods>;
  }>;
};
