import type { Goods } from "./global";

export type SearchGoodsData = {
  page: number;
  pageSize: number;
  keyword: string;
  associateIds: string[];
  categoryId: string;
  brandId: string;
  onlyDiscount: boolean;
  sortField: string;
  sortMethod: string;
};

export type SearchGoods = {
  conditions: {
    categories: {
      id: string;
      name: string;
    };
    brands: {
      id: string;
      name: string;
      nameEn: string;
      logo: string;
    };
  };
  pageData: {
    counts: number;
    pages: number;
    pageSize: number;
    page: number;
    items: Goods[];
  };
};
