<template>
  <scroll-view
    :scroll-y="true"
    style="width: 100vw; height: 100vh"
    @scrolltolower="handleScroll"
  >
    <view class="perCenter">
      <view class="head">
        <view v-if="UserStore.userInfo">
          <navigator url="/pages/mine/info">
            <image :src="UserStore.userInfo?.avatar" mode="scaleToFill" />
            <text>{{
              UserStore.userInfo?.nickname
                ? UserStore.userInfo?.nickname
                : UserStore.userInfo?.account
            }}</text>
          </navigator>
        </view>

        <view v-else>
          <navigator url="/pages/mine/login">
            <image src="@/static//mine//default_icon.png" mode="scaleToFill" />
            <text>登录/注册</text>
          </navigator>
        </view>
      </view>

      <view class="center">
        <view style="display: flex; justify-content: space-around">
          <view>
            <view>收藏</view>
            <view class="num">{{ num.collect }}</view>
          </view>
          <view>
            <view>优惠券</view>
            <view class="num">{{ num.coupon }}</view>
          </view>
          <view>
            <view>足迹</view>
            <view class="num">{{ num.footprint }}</view>
          </view>
        </view>
        <view
          style="display: flex; justify-content: space-around; margin-top: 10px"
        >
          <navigator url="/pages/mine/details?type=1">
            <view style="width: 30px; margin: auto">
              <up-icon name="rmb-circle" size="30"></up-icon>
            </view>
            <view>待付款</view>
          </navigator>
          <navigator url="/pages/mine/details?type=2">
            <view style="width: 30px; margin: auto">
              <up-icon name="car" size="30"></up-icon>
            </view>
            <view>待收货</view>
          </navigator>
          <navigator url="/pages/mine/details?type=3">
            <view style="width: 30px; margin: auto">
              <up-icon name="chat" size="30"></up-icon>
            </view>
            <view>待评价</view>
          </navigator>
          <navigator url="/pages/mine/details?type=0">
            <view style="width: 30px; margin: auto">
              <up-icon name="order" size="30"></up-icon>
            </view>
            <view>全部订单</view>
          </navigator>
        </view>
      </view>

      <view class="footer">
        <view style="font-size: 20px; font-weight: bold; padding: 10px 20px"
          >大家在看</view
        >
        <GoodsUtils :goods="goods" :finish="finish"></GoodsUtils>
      </view>
    </view>
  </scroll-view>
</template>

<script lang="ts" setup>
import { getMineGoodsAPI } from "@/api/mine";
import GoodsUtils from "@/components/goods.vue";
import { userStore } from "@/stores/user";
import type { Goods, Page } from "@/types/global";
import { onLoad } from "@dcloudio/uni-app";
import { reactive, ref } from "vue";

const UserStore = userStore();

const num = reactive({
  collect: 10,
  coupon: 99,
  footprint: 20,
});

const goods = ref<Goods[]>([]);

const pageParams: Page = {
  page: 1,
  pageSize: 10,
};

let count = 0;

const finish = ref(false);

const getMineGoods = async () => {
  if (finish.value) return;

  const res = await getMineGoodsAPI(pageParams);

  goods.value.push(...res.result.items);

  if (pageParams.page! <= res.result.pages) {
    pageParams.page!++;
    count = pageParams.page! - 1;
  } else {
    finish.value = true;
  }
};

onLoad(() => {
  getMineGoods();
});

const handleScroll = () => {
  count++;
  if (count !== pageParams.page!) return;
  getMineGoods();
};
</script>

<style lang="scss" scoped>
.perCenter {
  .head {
    margin: 15px;

    navigator {
      display: flex;
    }

    image {
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }

    text {
      line-height: 100px;
      margin-left: 20px;
      font-size: 20px;
    }
  }

  .center {
    background: rgba(245, 245, 245);
    margin: 30px 15px 0 15px;
    padding: 10px;
    border-radius: 20px;
    text-align: center;

    image {
      width: 50px;
      height: 50px;
    }

    .num {
      color: red;
      font-size: 20px;
    }
  }

  .footer {
    margin-top: 30px;
    background: rgba(245, 245, 245);
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }
}
</style>
