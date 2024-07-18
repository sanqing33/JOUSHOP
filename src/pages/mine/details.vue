<template>
  <up-subsection
    @change="select"
    fontSize="16"
    :list="list"
    activeColor="rgb(187, 148, 102)"
    :current="type"
  ></up-subsection>
  <view
    v-if="loading"
    style="
      background: #fff;
      height: calc(100vh - 34px);
      width: 100vw;
      display: flex;
      align-items: center;
      justify-content: center;
    "
  >
    <up-loading-icon
      text="加载中"
      textSize="18"
      mode="circle"
    ></up-loading-icon>
  </view>

  <scroll-view
    v-else
    :scroll-y="true"
    style="height: calc(100vh - 34px); background: rgb(238, 238, 239)"
    @scrolltolower="handleScroll"
  >
    <view
      style="
        margin-bottom: 5px;
        padding: 5px 10px;
        background: #fff;
        border-radius: 20px;
      "
      v-for="(items, index) in orderList"
      :key="index"
      @click="toDetail(items.id)"
    >
      <view v-for="item in items.skus" :key="item.id">
        <!--  <view style="display: flex">
        <text style="text-align: right; padding: 5px">123</text>
      </view> -->
        <view style="display: flex; line-height: 15vw; padding: 10px 0">
          <img
            :src="item.image"
            alt=""
            style="
              width: 130px;
              height: 130px;
              object-fit: cover;
              border-radius: 15px;
            "
          />
          <view style="flex: 1; margin-left: 20px">
            <view
              style="
                font-size: 18px;
                font-weight: bold;
                line-height: 1.2;
                height: 45px;
              "
            >
              {{ item.name }}
            </view>
            <view
              style="
                margin-top: 5px;
                color: #999;
                font-size: 16px;
                line-height: 1.1;
                height: 36px;
              "
            >
              {{ item.properties[0].propertyValueName }}
            </view>
            <view
              style="
                display: flex;
                justify-content: space-between;
                line-height: 1.1;
                height: 36px;
                font-size: 16px;
                margin-top: 10px;
              "
            >
              <view>共{{ items.totalNum }}件</view>
              <view style="color: red; font-size: 18px; margin-right: 10px"
                >¥{{ items.payMoney }}
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view style="text-align: center; padding: 10px 0; background: #f0f0f0">
      {{ finish ? "没有更多数据了" : "正在加载中..." }}
    </view>
  </scroll-view>
</template>

<script lang="ts" setup>
import { getOrderListAPI } from "@/api/order";
import type { Page } from "@/types/global";
import type { PostOrderResult } from "@/types/order";
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";

const loading = ref<boolean>(true);

const type = ref(0);

onLoad((option: any) => {
  type.value = parseInt(option.type);
  select(parseInt(option.type));
});

const list = ref([
  { id: 0, name: "全部订单" },
  { id: 1, name: "待付款" },
  { id: 2, name: "待收货" },
  { id: 3, name: "待评价" },
]);

const orderList = ref<PostOrderResult[]>([]);

const pageParams: Page = {
  page: 1,
  pageSize: 5,
};

let count = 0;

const finish = ref(false);

const getOrderList = async (index: number) => {
  if (finish.value) return;

  const res = await getOrderListAPI(index, pageParams);
  orderList.value.push(...res.result.items);

  if (pageParams.page! <= res.result.pages) {
    pageParams.page!++;
    count = pageParams.page! - 1;
  } else {
    finish.value = true;
  }

  loading.value = false;
};

const select = (index: number) => {
  loading.value = true;
  type.value = index;
  getOrderList(index);
};

const handleScroll = () => {
  count++;
  if (count !== pageParams.page!) return;
  getOrderList(type.value);
};

const toDetail = (id: string) => {
  uni.navigateTo({
    url: `/pages/order/detail?id=${id}`,
  });
};
</script>

<style lang="scss" scoped></style>
