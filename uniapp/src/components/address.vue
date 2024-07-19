<template>
  <view>
    <view
      style="
        padding: 10px 20px;
        margin-top: 5px;
        border-radius: 10px;
        display: flex;
        justify-content: space-between;
        background: #fff;
      "
      v-for="(item, index) in address"
      :key="index"
      class="address-item"
    >
      <view>
        <view style="display: flex">
          <text style="width: 100px">{{ item.receiver }}</text>
          <text>{{ item.contact }}</text>
          <view
            v-if="addressList.length > 1"
            style="margin-left: 30px; transform: translateY(-4px)"
          >
            <up-tag
              v-if="item.isDefault === 1"
              text="默认"
              bgColor="#fff"
              borderColor="#fff"
              color="#000"
            >
            </up-tag>
          </view>
        </view>
        <view style="margin-top: 10px">{{ item.address }}</view>
      </view>

      <view
        style="
          margin: auto 20px;
          background: #fff;
          padding: 5px;
          border-radius: 50%;
        "
        v-if="addressList.length > 1"
        @click="clickAddress(item.id)"
      >
        <up-icon
          @click="showAddressChange = true"
          name="edit-pen"
          color="#000"
          size="28"
        ></up-icon>
      </view>

      <view v-else style="margin: auto 0; width: 28px">
        <up-tag text="默认" bgColor="#fff" borderColor="#fff" color="#000">
        </up-tag>
      </view>
    </view>
  </view>

  <up-popup
    :show="showAddressChange"
    @close="showAddressChange = false"
    @open="showAddressChange = true"
    :closeable="true"
    mode="center"
    customStyle="width:100vw;padding:50px"
  >
    <up-form
      labelPosition="left"
      :model="addressChange"
      :rules="rules"
      ref="changeRef"
      labelWidth="75px"
      labelAlign="center"
    >
      <up-form-item
        label="收货人"
        prop="addressChange.receiver"
        borderBottom
        ref="changeRef"
      >
        <input v-model="addressChange.receiver" placeholder="收货人姓名" />
      </up-form-item>
      <up-form-item
        label="手机号"
        prop="addressChange.receiver"
        borderBottom
        ref="changeRef"
      >
        <input v-model="addressChange.contact" placeholder="收货人手机号" />
      </up-form-item>
      <up-form-item
        label="所在地区"
        prop="addressChange.receiver"
        borderBottom
        ref="changeRef"
      >
        <input
          v-model="addressChange.fullLocation"
          placeholder="收货人所在地区"
        />
      </up-form-item>
      <up-form-item
        label="详细地址"
        prop="addressChange.receiver"
        borderBottom
        ref="changeRef"
      >
        <input
          v-model="addressChange.address"
          placeholder="街道、小区、门牌号"
        />
      </up-form-item>
      <up-form-item
        label="设为默认"
        prop="addressChange.receiver"
        borderBottom
        ref="changeRef"
      >
        <input v-model="addressChange.isDefault" placeholder="默认" />
      </up-form-item>
    </up-form>
    <view style="width: 50vw; margin: 30px auto">
      <up-button
        color="rgb(237, 222, 205)"
        text="提交"
        @click="submitChange"
      ></up-button>
    </view>
  </up-popup>
</template>

<script lang="ts" setup>
import { getAddressListAPI, updateAddressAPI } from "@/api/mine";
import type { AddressList } from "@/types/global";
import { ref } from "vue";

const props = defineProps({
  addressList: {
    type: Array as () => AddressList[],
    default: () => [],
  },
});

const address = ref<AddressList[]>(props.addressList);

const showAddressChange = ref(false);

const addressChange = ref<AddressList>({
  id: "",
  receiver: "",
  contact: "",
  fullLocation: "",
  address: "",
  isDefault: 0,
});

const rules = {};

const clickAddress = (id: string) => {
  addressChange.value = props.addressList.filter((a) => a.id === id)[0];
  console.log(addressChange.value);
};

const submitChange = async () => {
  await updateAddressAPI(addressChange.value);
  const res = await getAddressListAPI();
  address.value = res.result;
  showAddressChange.value = false;
};
</script>

<style lang="scss" scoped></style>
