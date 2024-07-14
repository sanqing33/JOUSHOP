import type { GoodsItem } from "./global";

export type firstCategroy = {
  children: secondCategroy[];
  id: string;
  imageBanners: string[];
  name: string;
  picture: string;
};

export type secondCategroy = {
  goods: GoodsItem[];
  id: string;
  name: string;
  picture: string;
};
