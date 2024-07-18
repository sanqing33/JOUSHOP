<template>
  <!-- 选择地址 -->
  <view
    @click="showAddress"
    style="height: 60px; background: #fff; border-radius: 15px"
  >
    <text
      v-if="!address"
      style="
        line-height: 60px;
        padding-left: 20vw;
        font-size: 18px;
        color: #606060;
      "
      >选择地址</text
    >
    <view
      v-else
      style="font-size: 18px; display: flex; justify-content: space-between"
    >
      <view>
        <view style="display: flex; margin-left: 10px; padding-top: 5px">
          <view style="width: 100px">{{ address[0].receiver }}</view>
          <view style="margin-left: 20px">{{ address[0].contact }}</view>
        </view>
        <view style="margin-left: 10px">{{ address[0].address }}</view>
      </view>
      <view style="display: flex">
        <view style="line-height: 60px">选择地址</view>
        <up-icon name="arrow-right"></up-icon>
      </view>
    </view>
  </view>
  <!-- 
  <up-popup :show="show" mode="center" @close="close">
    <scroll-view :scroll-y="true" style="width: 100vw; height: 50vh">
      <view
        style="
          border: #dcdcdc 1px solid;
          margin-bottom: 5px;
          font-size: 18px;
          color: #606060;
        "
        v-for="(item, index) in addresses"
        :key="index"
      >
        <view style="display: flex; margin-left: 10px; margin-top: 10px">
          <view style="width: 50px">{{ item.name }}</view>
          <view style="margin-left: 20px">{{ item.phone }}</view>
        </view>
        <view style="margin-left: 10px">{{ item.address }}</view>
        <view style="display: flex; margin-top: 10px">
          <up-button text="编辑"></up-button>
          <up-button text="选择" @click="checkAddress(item)"></up-button>
        </view>
      </view>
    </scroll-view>
 </up-popup> -->

  <!-- 订单商品 -->
  <view
    style="
      background: #fff;
      border-radius: 15px;
      padding: 10px;
      margin: 10px 0;
      height: calc(100vh - 60px - 65px - 40px);
    "
  >
    <scroll-view :scroll-y="true" style="height: calc(100vh - 150px - 100px)">
      <view v-for="item in goods" :key="item.id">
        <view style="display: flex; line-height: 10vw; padding: 10px 0">
          <img
            :src="item.picture"
            alt=""
            style="width: 30vw; height: 30vw; object-fit: cover"
          />
          <view style="flex: 1; margin-left: 10px">
            <up-text size="20" :text="item.name"></up-text>
            <up-text size="16" :text="item.attrsText"></up-text>

            <view style="display: flex; justify-content: space-between">
              <up-text
                color="red"
                size="20"
                mode="price"
                :text="item.price"
              ></up-text>
              <up-number-box
                style="margin-right: 20px"
                v-model="item.count"
                @change="changeCount($event, item.skuId)"
              ></up-number-box>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>

    <!-- 订单总计 -->
    <view
      style="margin-top: 20px; display: flex; justify-content: space-between"
    >
      <view>商品金额</view>
      <view>
        <up-text
          color="red"
          size="16"
          mode="price"
          :text="summary!.totalPrice"
        ></up-text>
      </view>
    </view>
    <view
      style="margin-top: 20px; display: flex; justify-content: space-between"
    >
      <view>运费</view>
      <view>
        <up-text
          color="black"
          size="16"
          mode="price"
          :text="summary!.postFee"
        ></up-text>
      </view>
    </view>
  </view>

  <!-- 提交订单 -->
  <view
    style="
      height: 65px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 0 20px;
      background: #fff;
    "
  >
    <up-text
      color="red"
      size="22"
      mode="price"
      :text="summary!.totalPayPrice"
    ></up-text>
    <view style="width: 35vw">
      <up-button
        @click="submitOrder"
        type="primary"
        shape="circle"
        text="提交订单"
        color="linear-gradient(120deg, #f6d365 0%, #fda085 100%)"
      ></up-button>
    </view>
  </view>

  <!-- 支付弹窗 -->
  <up-popup
    v-if="orderResult"
    :show="showPay"
    mode="bottom"
    @open="showPay = true"
    @close="showPay = false"
  >
    <view class="pay">
      <view>
        <text>订单号</text><text>{{ orderResult?.id }}</text>
      </view>
      <view>
        <text>订单创建时间</text><text>{{ orderResult?.createTime }}</text>
      </view>
      <view>
        <text>订单失效时间</text><text>{{ orderResult?.payLatestTime }}</text>
      </view>
      <view>
        <text>商品总数</text><text>{{ orderResult?.totalNum }} 件</text>
      </view>
      <view>
        <text>商品金额</text><text>¥{{ orderResult?.totalMoney }}</text>
      </view>
      <view>
        <text>运费</text><text>¥{{ orderResult?.postFee }}</text>
      </view>
      <view style="margin-bottom: 20px">
        <text>订单合计</text><text>¥{{ orderResult?.payMoney }}</text>
      </view>
      <up-button
        @click="buy(orderResult!.id)"
        type="primary"
        shape="circle"
        text="支付"
        color="linear-gradient(120deg, #f6d365 0%, #fda085 100%)"
      ></up-button>
    </view>
  </up-popup>
</template>

<script lang="ts" setup>
import { putCartAPI } from "@/api/details";
import { getAddressListAPI } from "@/api/mine";
import {
  getBuyNowOrderAPI,
  getPayOrderListAPI,
  postOrderAPI,
  postPayOrderAPI,
} from "@/api/order";
import type { AddressList } from "@/types/global";
import type { Goods, PostOrder, PostOrderResult, Summary } from "@/types/order";
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";

const goods = ref<Goods[]>();

const address = ref<AddressList[]>();

const summary = ref<Summary>();

const getOrderList = async (type?: string, skuId?: string, count?: number) => {
  let res;
  if (type === "buy") {
    address.value = (await getAddressListAPI()).result;
    res = await getBuyNowOrderAPI(skuId!, count!);
  } else {
    res = await getPayOrderListAPI();
    address.value = res.result.userAddresses;
  }
  goods.value = res.result.goods;

  /*  address.value = res.result.userAddresses.filter(
    (item) => item.isDefault === 1
  ); */
  summary.value = res.result.summary;
};

onLoad((option?: any) => {
  getOrderList(option?.type, option?.skuId, option?.count);
});

const changeCount = async (e: any, skuId: string) => {
  await putCartAPI(skuId, e.value);
  getOrderList();
};

const orderResult = ref<PostOrderResult>();

const submitOrder = async () => {
  const data: PostOrder = {
    goods: goods.value!.map((item) => {
      return {
        skuId: item.skuId,
        count: item.count,
      };
    }),
    addressId: address.value![0].id,
    deliveryTimeType: 1,
    buyerMessage: "",
    payType: 1,
    payChannel: 1,
  };

  const res = await postOrderAPI(data);

  orderResult.value = res.result;

  showPay.value = true;
};

const showPay = ref(false);

const buy = (id: string) => {
  postPayOrderAPI(orderResult.value!.id);
  uni.showToast({
    title: "支付成功",
    icon: "success",
  });
  uni.navigateTo({
    url: `/pages/order/detail?id=${id}&type=1`,
  });
};
</script>

<style lang="scss" scoped>
body {
  background: rgba(220, 220, 220, 0.5);
}

.pay {
  margin: 20px;
  font-size: 16px;

  view {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;

    &:nth-child(5),
    &:nth-child(6),
    &:nth-child(7) {
      text:last-child {
        color: #ff0000;
      }
    }
  }
}
</style>
