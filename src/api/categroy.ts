import type { FirstCategroy } from "@/types/categroy";
import { http } from "./index";

export const getFirstCategoriesAPI = () => {
  return http<FirstCategroy[]>({
    method: "GET",
    url: "/category/top",
  });
};
