import type { firstCategroy } from "@/types/categroy";
import { http } from "./index";

export const getFirstCategoriesAPI = () => {
  return http<firstCategroy[]>({
    method: "GET",
    url: "/category/top",
  });
};
