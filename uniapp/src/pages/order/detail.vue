<template>
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

  <view v-else style="padding: 10px">
    <scroll-view
      :scroll-y="true"
      style="background: rgb(238, 238, 239); border-radius: 10px"
    >
      <view class="order-detail">
        <view style="display: flex; border: none">
          <image
            style="height: 130px"
            :src="orderDetail?.skus[0].image"
            mode="aspectFill"
          />
          <view
            style="
              margin-left: 20px;
              display: flex;
              flex-direction: column;
              justify-content: space-around;
              border: none;
            "
          >
            <view style="font-size: 18px; font-weight: bold; border: none">
              {{ orderDetail?.skus[0].name }}
            </view>
            <view style="font-size: 14px; color: #808080; border: none">
              {{ orderDetail?.skus[0].properties[0].propertyValueName }}
            </view>
          </view>
        </view>
        <view>
          <text>订单号</text>
          <text>{{ orderDetail?.id }}</text>
        </view>
        <view>
          <text>收货人</text>
          <text>{{ orderDetail?.receiverContact }}</text>
        </view>
        <view>
          <text>收货地址</text>
          <text>{{ orderDetail?.receiverAddress }}</text>
        </view>
        <view>
          <text>收货人手机号</text>
          <text>{{ orderDetail?.receiverMobile }}</text>
        </view>
        <view>
          <text>下单时间</text>
          <text>{{ orderDetail?.createTime }}</text>
        </view>
        <view>
          <text>付款时间</text>
          <text>{{ orderDetail?.payTime }}</text>
        </view>
        <view>
          <text>支付方式</text>
          <text>{{ orderDetail?.payType }}</text>
        </view>
        <view>
          <text>单价</text>
          <text>¥{{ orderDetail?.skus[0].realPay }}</text>
        </view>
        <view>
          <text>数量合计</text>
          <text>{{ orderDetail?.totalNum }}件</text>
        </view>
        <view>
          <text>金额合计</text>
          <text>¥{{ orderDetail?.totalMoney }}</text>
        </view>
        <view>
          <text>运费</text>
          <text>¥{{ orderDetail?.postFee }}</text>
        </view>
        <view>
          <text>实付金额</text>
          <text>¥{{ orderDetail?.payMoney }}</text>
        </view>
        <view>
          <text>发货时间</text>
          <text>{{ orderDetail?.consignTime }}</text>
        </view>
        <view>
          <text>预计到货时间</text>
          <text>{{ orderDetail?.arrivalEstimatedTime }}</text>
        </view>
      </view>
    </scroll-view>

    <view
      v-if="type === '1'"
      style="
        position: absolute;
        bottom: 10px;
        width: 60vw;
        left: 50%;
        transform: translateX(-50%);
        border: none;
      "
    >
      <up-button
        text="返回首页"
        shape="circle"
        color="linear-gradient(120deg, #f6d365 0%, #fda085 100%)"
        @click="back()"
      ></up-button>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { getOrderDetailAPI } from "@/api/order";
import type { OrderDetail } from "@/types/order";
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";

const loading = ref<boolean>(true);

const orderDetail = ref<OrderDetail>();

let type = "0";

onLoad(async (options: any) => {
  type = options.type;
  const res = await getOrderDetailAPI(options.id);
  orderDetail.value = res.result;
  loading.value = false;
  console.log(res.result);
});

const back = () => {
  uni.switchTab({
    url: "/pages/home/index",
  });
};
</script>

<style lang="scss" scoped>
.order-detail {
  margin: 20px;

  view {
    display: flex;
    border-top: solid 1px #808080;
    padding: 10px 0;
    justify-content: space-between;

    text:first-child {
      display: block;
      width: 175px;
    }

    &:nth-child(9),
    &:nth-child(11),
    &:nth-child(12),
    &:nth-child(13) {
      text:last-child {
        color: #ff0000;
      }
    }
  }
}
</style>
