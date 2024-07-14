import type { UserInfo } from "@/types/global";
import { defineStore } from "pinia";
import { ref } from "vue";

export const userInfoStore = defineStore(
  "userInfo",
  () => {
    const userInfo = ref<UserInfo>();

    const setUserInfo = (info: UserInfo) => {
      userInfo.value = info;
      console.log("setUserInfo", info);
    };

    const clearUserInfo = () => {
      userInfo.value = undefined;
    };

    return { userInfo, setUserInfo, clearUserInfo };
  },
  {
    persist: {
      storage: {
        getItem(key) {
          return uni.getStorageSync(key);
        },
        setItem(key, value) {
          uni.setStorageSync(key, value);
        },
      },
    },
  }
);
