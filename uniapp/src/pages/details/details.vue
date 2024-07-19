<template>
  <!-- 加载动画 -->
  <view
    v-if="loading"
    style="
      background: #fff;
      height: 100vh;
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

  <view v-else>
    <scroll-view :scroll-y="true" style="height: calc(100vh - 50px)">
      <!-- 商品图片 -->
      <up-swiper
        height="300"
        :list="goods.mainPictures"
        indicator
        indicatorMode="line"
        circular
      ></up-swiper>

      <!-- 商品名称 -->
      <view class="goods-title">{{ goods.name }}</view>

      <!-- 商品价格、销量 -->
      <view class="goods-price">
        <view style="color: red; font-weight: bold">
          <text style="font-size: 24px">¥{{ goods.price }}</text>
          <text
            style="
              font-size: 16px;
              text-decoration: line-through;
              color: #808080;
              font-weight: normal;
              margin-left: 10px;
            "
          >
            ¥{{ goods.oldPrice }}
          </text>
        </view>
        <view>已售 {{ goods.salesCount }}</view>
      </view>

      <!-- 商品描述 -->
      <view class="goods-desc">{{ goods.desc }}</view>

      <!-- 用户评价 -->
      <view class="goods-evaluate">
        <view class="head">
          <view>
            <text style="font-size: 18px; font-weight: bold">评价</text>
            <text style="font-size: 14px">({{ goods.commentCount }})</text>
          </view>

          <view style="display: flex; color: #808080">
            全部
            <up-icon
              name="arrow-right"
              style="transform: translateY(1px)"
            ></up-icon>
          </view>
        </view>

        <view
          class="content"
          v-for="item in evaluate.content.slice(0, 2)"
          :key="item.id"
        >
          <view style="display: flex; justify-content: space-between">
            <view style="display: flex">
              <image :src="item.avatar" mode="aspectFill"></image>
              <view style="margin: auto 10px">
                <view>{{ item.name }}</view>
                <uni-rate allow-half active-color="red" :value="item.star" />
              </view>
            </view>
            <view
              style="
                width: 120px;
                display: flex;
                text-align: center;
                align-items: center;
                font-size: 14px;
              "
            >
              {{ dayjs(item.time).format("YYYY年MM月DD日 HH:mm:ss") }}
            </view>
          </view>

          <view style="margin-top: 10px">{{ item.content }}</view>
        </view>
      </view>

      <!-- 商品店铺 -->
      <view class="goods-store">
        <view style="display: flex; justify-content: space-between">
          <image
            style="height: 80px; width: 80px"
            :src="goods.brand.picture"
            mode="aspectFill"
          ></image>
          <view style="margin-left: 15px">
            <view style="font-weight: bold; font-size: 20px">{{
              goods.brand.name
            }}</view>
            <!-- <view style="color: #808080; transform: translate(10px, 5px)">
              <view>{{ store.focus }}人关注</view>
              <view>共{{ store.products }}件商品</view>
            </view> -->
          </view>
        </view>
        <view style="margin: auto 0">
          <button
            type="warn"
            :plain="true"
            style="font-size: 15px; border-radius: 20px"
          >
            进店逛逛
          </button>
        </view>
      </view>

      <!-- 商品介绍 -->
      <view class="goods-intro">
        <view style="font-size: 18px; font-weight: bold">商品介绍</view>
        <view
          style="
            background: rgba(220, 220, 220, 0.5);
            padding: 5px;
            margin: 10px 0;
            border-radius: 10px;
          "
        >
          <view
            v-for="(item, index) in goods.details.properties"
            :key="index"
            style="display: flex; margin-bottom: 5px"
          >
            <view style="width: 75px">{{ item.name }}</view>
            <view style="flex: 1">{{ item.value }}</view>
          </view>
        </view>

        <image
          v-for="(item, index) in goods.details.pictures"
          :key="index"
          :src="item"
          mode="widthFix"
          style="width: 100%; display: flex"
        />
      </view>

      <!-- 相似商品推荐 -->
      <view
        style="
          background: #f0f0f0;
          padding: 10px;
          margin-top: 10px;
          font-size: 18px;
          font-weight: bold;
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
        "
      >
        猜你想买
      </view>
      <Goods :goods="goods.similarProducts" :finish="true"></Goods>
    </scroll-view>

    <!-- 底部按钮 -->
    <view style="height: 50px; display: flex; background: white">
      <view
        style="
          display: flex;
          height: 100%;
          flex: 1;
          justify-content: space-around;
        "
      >
        <up-icon name="home" label="店铺" labelPos="bottom" size="25"></up-icon>
        <up-icon
          name="kefu-ermai"
          label="客服"
          labelPos="bottom"
          size="25"
        ></up-icon>
        <up-icon name="star" label="收藏" labelPos="bottom" size="25"></up-icon>
      </view>
      <view style="display: flex; align-items: center">
        <view style="margin-right: 5px; width: 125px">
          <up-button
            @click="showSku('cart')"
            text="加入购物车"
            shape="circle"
            color="linear-gradient(120deg, #f6d365 0%, #fda085 100%)"
          ></up-button>
        </view>
        <view style="margin-right: 5px; width: 125px">
          <up-button
            @click="showSku('buy')"
            text="立即购买"
            shape="circle"
            color="linear-gradient(120deg, #f6d365 0%, #fda085 100%)"
          ></up-button>
        </view>
      </view>
    </view>

    <!-- 加入购物车/立即购买 弹窗 -->
    <vk_data_goods_sku_popup
      v-model="isShowSku"
      :localdata="localdata"
      :mode="mode"
      @add-cart="addCart"
      @buy-now="buy"
    />
  </view>
</template>

<script lang="ts" setup>
import { getGoodsDetailAPI, postCartAPI } from "@/api/details";
import type { SkuPopupEvent } from "@/components/vk-data-goods-sku-popup/vk-data-goods-sku-popup";
import vk_data_goods_sku_popup from "@/components/vk-data-goods-sku-popup/vk-data-goods-sku-popup.vue";
import { onLoad } from "@dcloudio/uni-app";
import dayjs from "dayjs";
import { reactive, ref } from "vue";

const goodsId = ref(0);

const goods = ref();

const loading = ref<boolean>(true);

const getGoodsDetail = async () => {
  const res = await getGoodsDetailAPI(goodsId.value);
  loading.value = false;
  goods.value = res.result;
  localdata.value = {
    _id: res.result.id,
    name: res.result.name,
    goods_thumb: res.result.mainPictures[0],
    spec_list: res.result.specs.map((v) => ({ name: v.name, list: v.values })),
    sku_list: res.result.skus.map((v) => ({
      _id: v.id,
      goods_id: res.result.id,
      goods_name: res.result.name,
      image: v.picture,
      price: v.price * 100, // 注意：需要乘以 100
      stock: v.inventory,
      sku_name_arr: v.specs.map((vv) => vv.valueName),
    })),
  };
};

onLoad((option?: AnyObject) => {
  loading.value = true;
  goodsId.value = option?.goods_id;
  getGoodsDetail();
});

const evaluate = reactive({
  count: 99,
  content: [
    {
      id: 1,
      name: "ikun",
      avatar: "../../static/index/kktx.webp",
      star: 2.5,
      content: "鸽鸽的蛋真好吃！",
      time: "2023-03-09 12:00:00",
    },
    {
      id: 2,
      name: "kunkun",
      avatar: "../../static/index/kktx2.webp",
      star: 2.5,
      content: "姬霓太美！",
      time: "2023-06-09 18:00:00",
    },
  ],
});

const buy = (e: SkuPopupEvent) => {
  uni.navigateTo({
    url: `/pages/order/order?type=buy&skuId=${e._id}&count=${e.buy_num}`,
  });
};

const isShowSku = ref(false);

const localdata = ref();

const mode = ref();

const showSku = (a: string) => {
  isShowSku.value = true;
  switch (a) {
    case "cart":
      mode.value = 2;
      break;
    case "buy":
      mode.value = 3;
      break;
    default:
      break;
  }
};

const addCart = async (e: SkuPopupEvent) => {
  await postCartAPI(e._id, e.buy_num);
  uni.showToast({ title: "添加成功" });
  isShowSku.value = false;
};
</script>

<style lang="scss" scoped>
page {
  background-color: rgb(245, 245, 245) !important;
}

.goods-swiper {
  height: 400px;

  image {
    width: 100%;
    height: 100%;
  }
}

.goods-price {
  padding: 10px;
  background: #ffffff;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.goods-title {
  padding: 5px;
  background: #ffffff;
  font-size: 25px;
}

.goods-desc {
  padding: 5px;
  background: #ffffff;
  font-size: 18px;
}

.goods-evaluate {
  margin: 10px 0;
  padding: 10px;
  background: #ffffff;
  border-radius: 15px;

  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .content {
    margin-top: 10px;

    image {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
  }
}

.goods-store {
  margin: 10px;
  padding: 10px;
  background: #ffffff;
  border-radius: 15px;
  display: flex;
  justify-content: space-between;
}

.goods-others {
  background: #ffffff;
  border-radius: 15px;
}

.goods-intro {
  margin: 10px 0;
  padding: 10px;
  background: #ffffff;
  border-radius: 15px;
}
</style>
