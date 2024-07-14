<template>
  <view class="classification">
    <view style="background: #fff; border-bottom: 1px #d3d3d3 solid">
      <view class="search">
        <uni-icons
          class="search-icon"
          type="search"
          size="30"
          @click="search"
        ></uni-icons>
        <input
          class="search-input"
          confirm-type="搜索"
          placeholder="请输入要搜索的商品..."
          v-model="search_input"
        />
      </view>
    </view>

    <view class="categories">
      <scroll-view
        style="width: 100px; background-color: #f6f6f6; overflow: hidden"
        scroll-y
      >
        <view
          v-for="(item, index) in first_categories"
          :key="item.id"
          class="item"
          :class="{ active: index === first_check }"
        >
          <text class="name" @click="first_change(index)">{{ item.name }}</text>
        </view>
      </scroll-view>

      <scroll-view style="background-color: #fff; overflow: hidden" scroll-y>
        <view
          style="margin: 0 15px"
          v-for="item in second_categories"
          :key="item.id"
        >
          <view style="padding: 8px 0; font-weight: bold">
            <text>{{ item.name }}</text>
          </view>
          <view style="display: flex; flex-wrap: wrap">
            <navigator
              style="
                margin: 10px calc((100vw - 75px * 3 - 80px - 30px) / 6);
                width: 75px;
              "
              v-for="goods in item.goods"
              :key="goods"
              hover-class="none"
              :url="'../search/search?keyword=' + goods.name"
            >
              <image
                style="height: 75px; width: 75px"
                :src="goods.picture"
              ></image>
              <view style="font-size: 14px; height: 36px; overflow: hidden">{{
                goods.name
              }}</view>
              <view style="font-size: 12px; color: red; text-align: right"
                >¥{{ goods.price }}</view
              >
            </navigator>
          </view>
        </view>
      </scroll-view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { getFirstCategoriesAPI } from "@/api/categroy";
import type { firstCategroy } from "@/types/categroy";
import { onLoad } from "@dcloudio/uni-app";
import { computed, ref } from "vue";

const search_input = ref("");

const search = () => {
  console.log(search_input.value);
};

const first_check = ref(0);

const first_change = (index: number) => {
  first_check.value = index;
};

const first_categories = ref<firstCategroy[]>([]);

const getFirstCategories = async () => {
  const res = await getFirstCategoriesAPI();
  first_categories.value = res.result;
};

onLoad(() => {
  getFirstCategories();
});

const second_categories = computed(() => {
  return first_categories.value[first_check.value].children;
});
</script>

<style lang="scss">
page {
  height: 100%;
}
</style>

<style lang="scss" scoped>
.classification {
  height: 100%;
  display: flex;
  flex-direction: column;

  .search {
    display: flex;
    border-radius: 20px;
    margin: 10px 15px;
    height: 30px;
    border: 1px solid #a9a9a9;

    .search-icon {
      margin: 0 5px;
    }

    .search-input {
      transform: translateY(2px);
    }
  }

  .categories {
    min-height: 400px;
    display: flex;

    .item {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 50px;
      font-size: 14px;
      color: #595c63;
      position: relative;
    }
    .active {
      background-color: #fff;
      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        width: 5px;
        height: 100%;
        background-color: rgb(228, 209, 187);
      }
    }
  }
}
</style>
