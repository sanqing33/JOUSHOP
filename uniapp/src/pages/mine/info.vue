<template>
  <!-- 头像和昵称 -->
  <view style="display: flex; width: 65vw; margin: 20px auto">
    <up-avatar
      :src="userInfo?.avatar"
      :size="100"
      @click="updateAvatar"
    ></up-avatar>
    <view
      style="
        display: flex;
        flex-direction: column;
        flex: 1;
        margin-left: 20px;
        justify-content: center;
        font-size: 20px;
        line-height: 20px;
      "
    >
      <text>{{ userInfo?.nickname }}</text>
      <text style="color: #808080; font-size: 16px; margin-top: 5px">
        用户名： {{ userInfo?.account }}
      </text>
    </view>
  </view>

  <!-- 个人信息 -->
  <view class="info">
    <view> <text>昵称</text>{{ userInfo?.nickname || "未设置" }} </view>
    <up-line color="#A9A9A9"></up-line>
    <view> <text>用户名</text>{{ userInfo?.account }} </view>
    <up-line color="#A9A9A9"></up-line>
    <view> <text>手机号</text>{{ userInfo?.mobile }} </view>
    <up-line color="#A9A9A9"></up-line>
    <view> <text>性别</text>{{ userInfo?.gender || "未设置" }} </view>
    <up-line color="#A9A9A9"></up-line>
    <view> <text>生日</text>{{ userInfo?.birthday || "未设置" }} </view>
  </view>

  <!-- 修改信息按钮 -->
  <view style="margin: 30px auto; width: 50vw">
    <up-button @click="changeInfo" text="编辑资料"></up-button>
  </view>

  <!-- 修改信息弹窗 -->
  <up-popup
    :show="change"
    @close="change = false"
    @open="change = true"
    mode="center"
    :round="10"
    customStyle="width: 80vw;padding:20px;display: flex;flex-direction: column;justify-content: space-around;"
  >
    <up-form
      labelPosition="left"
      :model="changeData"
      :rules="rules"
      ref="changeRef"
      labelWidth="75px"
      labelAlign="center"
    >
      <up-form-item
        label="昵称"
        prop="changeData.nickname"
        borderBottom
        ref="changeRef"
      >
        <input v-model="changeData.nickname" placeholder="请输入昵称" />
      </up-form-item>
      <up-form-item
        label="性别"
        prop="changeData.gender"
        borderBottom
        ref="changeRef"
      >
        <picker
          :show="showGander"
          :value="index"
          :range="ganderList"
          @change="selectGander"
        >
          <view @click="showGander = true">
            <input
              v-model="changeData.gender"
              disabled
              placeholder="请选择性别"
            />
          </view>
        </picker>
      </up-form-item>
      <up-form-item
        label="生日"
        prop="changeData.birthday"
        borderBottom
        ref="changeRef"
      >
        <picker mode="date" start="1990" end="2030" @change="selectBirthday">
          <view class="uni-input">{{ changeData.birthday }}</view>
        </picker>
      </up-form-item>
    </up-form>
    <view style="margin-top: 30px; width: 50vw; margin: 0 auto">
      <up-button
        color="rgb(237, 222, 205)"
        text="提交"
        @click="submitChange"
      ></up-button>
    </view>
  </up-popup>

  <!-- 收货地址 -->
  <view
    style="
      width: 80vw;
      background: #f5f5f5;
      margin: 0 auto;
      padding: 20px;
      border-radius: 10px;
    "
  >
    <AddressUtile
      :addressList="addressList.filter((item) => item.isDefault === 1)"
    ></AddressUtile>
    <navigator
      url="/pages/mine/address"
      style="width: 50vw; margin: 20px auto 0 auto"
    >
      <up-button text="管理收货地址"></up-button>
    </navigator>
  </view>
</template>

<script lang="ts" setup>
import {
  getAddressListAPI,
  getUserInfoAPI,
  updateUserInfoAPI,
} from "@/api/mine";
import AddressUtile from "@/components/address.vue";
import { userStore } from "@/stores/user";
import type { UserInfo } from "@/types/global";
import { onLoad } from "@dcloudio/uni-app";
import dayjs from "dayjs";
import { ref } from "vue";

const userInfo = ref<UserInfo>();

const User = userStore();

const getUserInfo = async () => {
  const res = await getUserInfoAPI();
  userInfo.value = { ...res.result, ...User.userInfo };
};

onLoad(() => {
  getUserInfo();
});

const updateAvatar = () => {
  uni.chooseImage({
    count: 1,
    mediaType: ["image"],
    success: (chooseImageRes) => {
      const tempFilePaths = chooseImageRes.tempFilePaths;
      uni.uploadFile({
        url: "/member/profile/avatar",
        filePath: tempFilePaths[0],
        name: "file",
        formData: {
          user: "test",
        },
        success: (uploadFileRes) => {
          console.log(uploadFileRes.data);
        },
      });
    },
  });
};

const change = ref(false);

const changeData = ref<UserInfo>({
  nickname: "",
  gender: "",
  birthday: "",
});

const changeInfo = () => {
  change.value = true;
  changeData.value.nickname = JSON.parse(
    JSON.stringify(userInfo.value?.nickname)
  );
  changeData.value.gender = JSON.parse(JSON.stringify(userInfo.value?.gender));
  changeData.value.birthday = JSON.parse(
    JSON.stringify(userInfo.value?.birthday)
  );
};

const rules = {};

const changeRef = ref();

const showGander = ref(false);

const ganderList = ["保密", "男", "女"];

const index = ref(0);

const selectGander = (e: any) => {
  changeData.value.gender = ganderList[e.detail.value];
  showGander.value = false;
};

const date = dayjs().format("YYYY-MM-DD");

const selectBirthday = (e: any) => {
  changeData.value.birthday = e.detail.value;
};

const submitChange = async () => {
  const res = await updateUserInfoAPI(changeData.value);
  User.setUserInfo(res.result!);
  userInfo.value = User.userInfo;
  change.value = false;
};

const addressList = ref();

const getAddressList = async () => {
  const res = await getAddressListAPI();
  addressList.value = res.result;
};

onLoad(() => {
  getAddressList();
});
</script>

<style lang="scss" scoped>
.info {
  margin: 0 30px;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 10px;

  view {
    margin: 20px 0;
  }

  text {
    display: inline-block;
    width: 75px;
    text-align: center;
    margin-right: 10px;
  }
}
</style>
