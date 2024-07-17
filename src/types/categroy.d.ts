import type { GoodsItem } from "./global";



export type FirstCategroy = {
  children: SecondCategroy[];
  id: string;
  imageBanners: string[];
  name: string;
  picture: string;
};

export type SecondCategroy = {
  goods: GoodsItem[];
  id: string;
  name: string;
  picture: string;
};
