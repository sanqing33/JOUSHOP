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

      <!-- 店铺其他商品 -->
      <view class="goods-others">
        <view
          style="
            font-size: 18px;
            font-weight: bold;
            margin-left: 10px;
            padding-top: 5px;
          "
          >店铺其他商品</view
        >
        <view style="display: flex; flex-wrap: wrap; margin: 0 5px">
          <view
            v-for="item in others"
            :key="item.id"
            style="
              margin-top: 10px;
              width: calc((100vw - 40px) / 3);
              margin: 5px;
            "
          >
            <view style="height: 160px">
              <image
                :src="item.coverUrl"
                mode="aspectFill"
                style="width: 100%; height: 28vw"
              ></image>
              <view style="margin-left: 5px">
                <view>{{ item.name }}</view>
                <view style="color: red; font-size: 18px"
                  >￥{{ item.price }}</view
                >
              </view>
            </view>
          </view>
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
            @click="select('shoppingcar')"
            text="加入购物车"
            shape="circle"
            color="linear-gradient(120deg, #f6d365 0%, #fda085 100%)"
          ></up-button>
        </view>
        <view style="margin-right: 5px; width: 125px">
          <up-button
            @click="select('buy')"
            text="立即购买"
            shape="circle"
            color="linear-gradient(120deg, #f6d365 0%, #fda085 100%)"
          ></up-button>
        </view>
      </view>
    </view>

    <!-- 加入购物车/立即购买 弹窗 -->
    <up-popup :show="buyShow" mode="bottom" @close="close">
      <scroll-view :scroll-y="true" style="height: 50vh">
        <view style="padding: 20px; display: flex">
          <img
            :src="img"
            alt=""
            style="
              width: 35vw;
              height: 35vw;
              object-fit: cover;
              border-radius: 15px;
            "
          />
          <view style="margin: auto 30px; color: red">
            <text>￥</text>
            <text style="font-size: 25px">{{ price }}</text>
          </view>
        </view>
        <view style="display: flex; height: 20vh">
          <text style="width: 80px; text-align: center">规格</text>
          <up-radio-group v-model="value">
            <up-radio
              style="margin-left: 10px"
              iconColor="transparent"
              inactiveColor="transparent"
              :customStyle="{ marginBottom: '8px' }"
              v-for="(item, index) in option"
              :key="index"
              :label="item.name"
              :name="item.name"
              @change="radioChange"
            ></up-radio>
          </up-radio-group>
        </view>
      </scroll-view>
      <view style="display: flex; justify-content: space-between">
        <text style="width: 80px; text-align: center">数量</text>
        <up-number-box
          style="margin-right: 30px"
          v-model="count"
          @change=""
        ></up-number-box>
      </view>
      <view style="margin: 10px auto; width: 90vw">
        <up-button
          v-if="selectType === 'shoppingcar'"
          @click="shoppingcar"
          text="加入购物车"
          shape="circle"
          color="linear-gradient(120deg, #f6d365 0%, #fda085 100%)"
        ></up-button>
        <up-button
          v-if="selectType === 'buy'"
          @click="buy"
          text="立即购买"
          shape="circle"
          color="linear-gradient(120deg, #f6d365 0%, #fda085 100%)"
        ></up-button>
      </view>
    </up-popup>
  </view>
</template>

<script lang="ts" setup>
import { getGoodsDetailAPI } from "@/api/details";
import Goods from "@/components/goods.vue";
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
};

onLoad((option?: AnyObject) => {
  loading.value = true;
  goodsId.value = option?.goods_id;
  getGoodsDetail();
});

const img = ref("https://api.btstu.cn/sjbz/api.php");

const title = ref("鸽鸽下的蛋");

const price = ref(99.99);

const freight = ref(0.0);

const sold = ref(999);

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

const swiper = ref([
  "https://cdn.uviewui.com/uview/swiper/swiper3.png",
  "https://cdn.uviewui.com/uview/swiper/swiper2.png",
  "https://cdn.uviewui.com/uview/swiper/swiper1.png",
]);

const store = reactive({
  coverUrl: "../../static/index/swiper/背带裤.jpg",
  name: "坤坤之家",
  focus: 999,
  products: 9999,
});

const others = reactive([
  {
    id: 1,
    coverUrl: "../../static/index/kktx.webp",
    name: "鸽鸽的蛋1",
    price: 98.0,
  },
  {
    id: 2,
    coverUrl: "../../static/index/kktx.webp",
    name: "鸽鸽的蛋2",
    price: 128.88,
  },
  {
    id: 3,
    coverUrl: "../../static/index/kktx.webp",
    name: "鸽鸽的蛋3",
    price: 328.0,
  },
  {
    id: 4,
    coverUrl: "../../static/index/kktx.webp",
    name: "鸽鸽的蛋4",
    price: 648.0,
  },
  {
    id: 5,
    coverUrl: "../../static/index/kktx.webp",
    name: "鸽鸽的蛋5",
    price: 6666.66,
  },
  {
    id: 6,
    coverUrl: "../../static/index/kktx.webp",
    name: "鸽鸽的蛋6",
    price: 99999.99,
  },
]);

const buyShow = ref(false);

const selectType = ref();

const select = (a: string) => {
  selectType.value = a;
  buyShow.value = true;
  console.log(selectType.value);
};

const value = ref("紫色");

const count = ref(1);

const shoppingcar = () => {};

const buy = () => {
  uni.navigateTo({
    url: `/pages/order/order?type=buy&store=${store.name}&freight=${freight.value}&value=${value.value}&count=${count.value}&title=${title.value}&img=${img.value}&price=${price.value}`,
  });
};

const close = () => {
  buyShow.value = false;
};

const option = reactive([
  {
    name: "紫色",
    value: "purple",
    disabled: false,
  },
  {
    name: "蓝色",
    value: "blue",
    disabled: false,
  },
  {
    name: "绿色",
    value: "green",
    disabled: false,
  },
]);

const radioChange = (n: any) => {
  value.value = n;
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
