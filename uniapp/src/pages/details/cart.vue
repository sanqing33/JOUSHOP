<template>
  <view class="cart">
    <view class="head">
      <view style="font-size: 22px">购物车</view>
      <view style="display: flex; transform: translateY(3px)">
        <view
          @click="deleteCart('all')"
          style="
            margin-right: 20px;
            padding: 5px 10px;
            background: #fff;
            border-radius: 10px;
          "
        >
          清空
        </view>
        <view
          @click="manage"
          style="padding: 5px 10px; background: #fff; border-radius: 10px"
        >
          管理
        </view>
      </view>
    </view>

    <scroll-view :scroll-y="true" style="height: calc(100vh - 109px)">
      <view
        v-for="(item, index) in goods"
        :key="index"
        style="
          background: #fff;
          border-radius: 15px;
          padding: 5px;
          margin-bottom: 10px;
        "
      >
        <view style="display: flex; line-height: 10vw; padding: 10px 0">
          <img
            :src="item.picture"
            alt=""
            style="width: 30vw; height: 30vw; object-fit: cover"
          />
          <view style="flex: 1; margin-left: 10px">
            <view style="display: flex">
              <view
                style="
                  flex: 1;
                  font-size: 20px;
                  font-weight: bold;
                  line-height: 1.2;
                  height: 45px;
                "
              >
                {{ item.attrsText }}
              </view>
              <view
                @click="deleteCart('one', item.skuId)"
                v-if="showDelete"
                style="transform: translateY(-5px)"
              >
                <up-icon
                  name="close-circle"
                  color="#ff0000"
                  size="28"
                ></up-icon>
              </view>
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
              {{ item.name }}
            </view>
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

    <view class="footer">
      <checkbox-group
        @change="checkAll"
        style="transform: translateY(-1px); padding: 5px 20px"
      >
        <checkbox value="checkAll" class="round">全选</checkbox>
      </checkbox-group>

      <view
        style="display: flex; transform: translateX(30px); padding: 5px 20px"
      >
        <view>合计：</view>
        <up-text color="red" mode="price" :text="prices"></up-text>
      </view>

      <navigator
        url="/pages/order/order"
        open-type="navigate"
        hover-class="navigator-hover"
      >
        <view
          style="
            background: red;
            color: white;
            padding: 5px 20px;
            border-radius: 20px;
          "
          >结算
        </view>
      </navigator>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { deleteCartAPI, getCartListAPI, putCartAPI } from "@/api/details";
import type { CartItem } from "@/types/global";
import { onShow } from "@dcloudio/uni-app";
import { ref } from "vue";

const goods = ref<CartItem[]>();

const getCartList = async () => {
  const res = await getCartListAPI();
  goods.value = res.result;
};

onShow(() => {
  getCartList();
});

const prices = ref(0);

const checkAll = (e: any) => {
  prices.value = 0;
  if (e.detail.value.includes("checkAll")) {
    goods.value!.forEach((item) => {
      prices.value += item.price * item.count;
    });
  }
};

const changeCount = async (e: any, skuId: string) => {
  console.log(skuId, e.value);
  await putCartAPI(skuId, e.value);
  getCartList();
  checkAll({ detail: { value: ["checkAll"] } });
};

const showDelete = ref(false);

const manage = () => {
  showDelete.value = !showDelete.value;
};

const deleteCart = async (type: string, skuId?: string) => {
  let deleteId: string[] = [];
  if (type === "one") {
    deleteId.push(skuId!);
  } else if (type === "all") {
    goods.value!.forEach((item) => {
      deleteId.push(item.skuId);
    });
  }

  await deleteCartAPI(deleteId);
  getCartList();
};
</script>

<style lang="scss" scoped>
.cart {
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.head {
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
}

.content {
  background: rgba(255, 255, 255, 0.75);
  width: 100%;
  height: 100vh;
}

.footer {
  position: absolute;
  width: 100%;
  bottom: 0;
  padding: 10px 0;
  background: white;
  display: flex;
  justify-content: space-around;
}
</style>
