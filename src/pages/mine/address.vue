<template>
  <view>
    <AddressUtile v-if="addressList" :addressList="addressList"></AddressUtile>
  </view>
</template>

<script lang="ts" setup>
import { getAddressListAPI } from "@/api/mine";
import AddressUtile from "@/components/address.vue";
import type { AddressList } from "@/types/global";
import { onLoad } from "@dcloudio/uni-app";
import { ref } from "vue";

const addressList = ref<AddressList[]>();

const getAddressList = async () => {
  const res = await getAddressListAPI();
  addressList.value = res.result;
};

onLoad(() => {
  getAddressList();
});
</script>

<style lang="scss" scoped></style>
