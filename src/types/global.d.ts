export type pageResult<T> = {
  items: T[];
  counts: number;
  page: number;
  pages: number;
  pageSize: number;
};

export type pageParams = {
  page?: number;
  pageSize?: number;
};
