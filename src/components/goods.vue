<template>
  <view
    style="
      padding-top: 10px;
      display: flex;
      flex-wrap: wrap;
      background: #f0f0f0;
    "
  >
    <view class="content" v-for="item in props.goods" :key="item.id">
      <navigator :url="`/pages/details/details?goods_id=${item.id}`">
        <image :src="item.picture" mode="aspectFill"></image>
        <view style="margin-left: 10px; height: 42px">{{ item.name }}</view>
        <view style="color: red; margin: 5px 0; font-size: 16px">
          <text>￥</text>
          <text>{{ item.price }}</text>
        </view>
      </navigator>
    </view>
  </view>
  <view style="text-align: center; padding: 10px 0; background: #f0f0f0">
    {{ props.finish ? "没有更多数据了" : "正在加载中..." }}
  </view>
</template>

<script lang="ts" setup>
import type { Goods } from "@/types/global";

const props = defineProps({
  goods: {
    type: Array as () => Goods[],
    default: () => [],
  },
  finish: {
    type: Boolean,
    default: false,
  },
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
