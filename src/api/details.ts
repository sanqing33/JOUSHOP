import { http } from "./index";

//
export const getGoodsDetailAPI = (id: number) => {
  return http({
    method: "GET",
    url: "/goods",
    data: {
      id,
    },
  });
};
