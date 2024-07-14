<template>
  <scroll-view
    scroll-y="true"
    style="width: 100vw; height: 100vh"
    @scrolltolower="handleScroll"
  >
    <!-- 搜索框 -->
    <view style="width: 90vw; margin: 0 auto; margin-top: 5px">
      <up-search
        @search="search"
        @custom="search"
        @change="change"
        placeholder="轻舟已过万重山"
        v-model="keyword"
        searchIcon="scan"
        @clickIcon="scan"
        height="40"
        animation="true"
      ></up-search>
    </view>

    <!-- 轮播图 -->
    <view style="margin-top: 5px">
      <up-swiper
        radius="25"
        height="200"
        :list="swiper"
        indicator
        indicatorMode="line"
        circular
      ></up-swiper>
    </view>

    <!-- 首页分类 -->
    <view style="width: 90vw; margin: 10px auto">
      <view class="classification">
        <view class="cf-box" v-for="item in categroies" :key="item.id">
          <navigator :url="item.icon" open-type="switchTab">
            <image class="icon" :src="item.icon" mode=""></image>
            <view class="title">{{ item.name }}</view>
          </navigator>
        </view>
      </view>
      <up-tabs
        @click="categoryClick"
        :list="categroy"
        lineWidth="30"
        lineColor="#f56c6c"
        :activeStyle="{
          color: '#303133',
          fontWeight: 'bold',
          transform: 'scale(1.05)',
        }"
        :inactiveStyle="{
          color: '#606266',
          transform: 'scale(1)',
        }"
        itemStyle="padding-left: 15px; padding-right: 15px; height: 34px;"
      ></up-tabs>
    </view>

    <!-- 商品 -->
    <Goods :goods="goods" :finish="finish"></Goods>
  </scroll-view>
</template>

<script setup lang="ts">
import {
  getHomeCategoryAPI,
  getHomeGoodsAPI,
  getHomeSwiperAPI,
} from "@/api/home";
import Goods from "@/components/goods.vue";
import type { pageParams } from "@/types/global";
import type { HomeCategory, HomeGoods } from "@/types/home";
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";

const keyword = ref("轻舟已过万重山");

const change = () => {
  console.log("输入框值变化：", keyword.value);
};

const search = () => {
  uni.navigateTo({
    url: "../search/search?keyword=" + keyword.value,
  });
};

const scan = () => {
  uni.scanCode({
    success: function (res) {
      console.log("条码类型：" + res.scanType);
      console.log("条码内容：" + res.result);
    },
  });
};

// 首页轮播图
const swiper = ref<string[]>([]);

onLoad(() => {
  const getHomeSwiper = async () => {
    const res = await getHomeSwiperAPI();
    res.result.forEach((item) => {
      swiper.value.push(item.imgUrl);
    });
  };
  getHomeSwiper();
});

// 首页分类
const categroies = ref<HomeCategory[]>([]);

onLoad(() => {
  const getHomeCategory = async () => {
    const res = await getHomeCategoryAPI();
    categroies.value = res.result;
  };
  getHomeCategory();
});

const categroy = ref([
  { name: "精选" },
  { name: "热卖", badge: { isDot: true } },
  { name: "数码" },
  { name: "家电" },
  { name: "居家" },
  { name: "美食" },
  { name: "穿搭" },
  { name: "洗护" },
]);

// 商品列表
const goods = ref<HomeGoods[]>([]);

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

const handleScroll = () => {
  getHomeGoods();
};
</script>

<style lang="scss" scoped>
.classification {
  margin-top: 30px;
  width: 90vw;

  .cf-box {
    display: inline-block;
    width: 16vw;
    height: 20vw;
    margin: 1vw;

    .icon {
      height: 10vw;
      width: 10vw;
      display: flex;
      justify-content: center;
      margin: 1vw 0;
      transform: translateX(3vw);
    }

    .title {
      font-size: 13px;
      display: flex;
      justify-content: center;
    }
  }
}
</style>
