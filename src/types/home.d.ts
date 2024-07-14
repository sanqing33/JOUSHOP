export type HomeSwiper = {
  hrefUrl?: string;
  id?: string;
  imgUrl: string;
  type?: number;
};

export type HomeCategory = {
  id: string;
  name: string;
  icon: string;
};
export type HomeGoods = {
  desc: string;
  discount: number;
  id: string;
  name: string;
  orderNum: number;
  picture: string;
  price: number;
};
