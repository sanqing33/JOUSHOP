<template>
  <view
    style="
      margin-top: 10px;
      padding-top: 10px;
      display: flex;
      flex-wrap: wrap;
      background: #f0f0f0;
      border-radius: 10px;
    "
  >
    <view class="content" v-for="item in goods" :key="item.id">
      <navigator url="/pages/details/details">
        <image :src="item.picture" mode="aspectFill"></image>
        <view style="margin-left: 10px; height: 42px">{{ item.name }}</view>
        <view style="color: red; margin-left: 5px; font-size: 16px">
          <text>￥</text>
          <text>{{ item.price }}</text>
        </view>
        <view style="margin: 0 5px 3px 0; text-align: right">
          <text style="font-size: 12px; color: rgb(128, 128, 128)">{{
            item.desc
          }}</text>
        </view>
      </navigator>
    </view>
  </view>
  <view style="text-align: center; margin: 10px 0">
    {{ finish ? "没有更多数据了" : "正在加载中..." }}
  </view>
</template>

<script lang="ts" setup>
import { getHomeGoodsAPI } from "@/api/home";
import type { pageParams } from "@/types/global";
import type { homeGoods } from "@/types/home";
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";

const goods = ref<homeGoods[]>([]);

const pageParams: pageParams = {
  page: 1,
  pageSize: 10,
};

const finish = ref(false);

const getHomeGoods = async () => {
  if (finish.value) return;

  const res = await getHomeGoodsAPI(pageParams);
  goods.value.push(...res.result.items);
  console.log();

  if (pageParams.page! <= res.result.pages) {
    pageParams.page!++;
  } else {
    finish.value = true;
  }
};

onLoad(() => {
  getHomeGoods();
});

defineExpose({
  getHomeGoods,
});
</script>

<style lang="scss" scoped>
.content {
  border-radius: 10px;
  background: rgb(248, 248, 255);
  border: 1px #a9a9a9 solid;
  margin: 5px;
  width: calc(50% - 12px);

  image {
    width: 100%;
    height: 200px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
}
</style>
