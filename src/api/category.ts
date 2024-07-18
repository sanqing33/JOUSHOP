import type { Firstcategory } from "@/types/category";
import { http } from "./index";

export const getFirstCategoriesAPI = () => {
  return http<Firstcategory[]>({
    method: "GET",
    url: "/category/top",
  });
};
