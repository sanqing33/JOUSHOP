import type { GoodsItem } from "./global";

export type Firstcategory = {
  children: Secondcategory[];
  id: string;
  imageBanners: string[];
  name: string;
  picture: string;
};

export type Secondcategory = {
  goods: GoodsItem[];
  id: string;
  name: string;
  picture: string;
};
