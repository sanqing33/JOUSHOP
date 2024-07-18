import type { PostOrderResult } from "@/types/order";
import { defineStore } from "pinia";
import { ref } from "vue";

export const orderStore = defineStore("orderInfo", () => {
  const orderResult = ref<PostOrderResult>();

  const setOrderResult = (result: PostOrderResult) => {
    orderResult.value = result;
  };

  return { orderResult, setOrderResult };
});
