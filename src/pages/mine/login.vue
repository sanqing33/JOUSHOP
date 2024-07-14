<template>
  <view class="login">
    <view style="text-align: center">
      <image
        src="../../static/logo_transparent.png"
        style="width: 120px; height: 120px; margin-top: 10vh"
      ></image>
      <view style="font-size: 1.4em">JOU SHOP</view>
    </view>

    <view class="input">
      <view class="login-check">
        <view v-if="!login_check">
          <input
            style="background: #fff"
            type="text"
            v-model="form.phone"
            placeholder="请输入手机号"
          />
          <input
            style="background: #fff"
            type="text"
            v-model="form.password"
            password
            placeholder="请输入密码"
          />
          <button
            style="margin-top: 50px; background-color: #28bb9c"
            @click="login('user')"
          >
            用户登录
          </button>
          <button
            style="background-color: #c0c0c0; margin-top: 20px"
            @click="change_login_check"
          >
            店铺管理员登录
          </button>
        </view>

        <view v-else>
          <input
            style="background: #fff"
            type="text"
            v-model="form.phone"
            placeholder="请输入店铺管理员手机号"
          />
          <button
            style="margin-top: 102px; background-color: #28bb9c"
            @click="login('admin')"
          >
            店铺管理员登录
          </button>
          <button
            style="background-color: #c0c0c0; margin-top: 20px"
            @click="change_login_check"
          >
            用户登录
          </button>
        </view>
      </view>

      <view class="clause">
        <checkbox-group @change="check">
          <checkbox value="clause"
            >阅读并同意《服务条款》和《joushop隐私协议》</checkbox
          >
        </checkbox-group>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { loginAdminAPI, loginUserAPI } from "@/api/mine";
import { userInfoStore } from "@/stores/user";
import { UserInfo } from "@/types/global";
import { reactive, ref } from "vue";

const clause = ref(false);

const check = (e) => {
  clause.value = e.detail.value.length > 0 ? true : false;
};

const login_check = ref(false);

const change_login_check = () => {
  login_check.value = !login_check.value;
};

const form = reactive({
  phone: "",
  password: "",
});

const login = async (type: string) => {
  if (clause.value !== true)
    return uni.showToast({ title: "请先阅读并同意服务条款", icon: "none" });

  if (form.phone === "")
    return uni.showToast({ title: "请填写手机号", icon: "none" });

  const userInfo = ref<UserInfo>();

  if (type === "user") {
    if (form.password === "")
      return uni.showToast({ title: "请填写密码", icon: "none" });
    if (form.password.length < 6)
      return uni.showToast({ title: "密码长度不能小于6位", icon: "none" });
    if (form.phone.length < 11)
      return uni.showToast({ title: "用户名长度不能小于11位", icon: "none" });
    const res = await loginUserAPI(form.phone, form.password);
    userInfo.value = res.result;
  } else if (type === "admin") {
    const res = await loginAdminAPI(form.phone);
    userInfo.value = res.result;
  }

  const setUserInfoStore = userInfoStore();
  setUserInfoStore.setUserInfo(userInfo.value!);
};
</script>

<style lang="scss" scoped>
body {
  background-image: linear-gradient(
    150deg,
    rgb(237, 222, 205) 0%,
    rgb(187, 148, 102) 100%
  );
}

.login {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.input {
  display: flex;
  flex-direction: column;
  margin-top: 10vh;

  .login-check {
    display: flex;
    justify-content: center;
    position: relative;

    view {
      position: absolute;
    }

    button {
      width: 60vw;
      height: 40px;
      font-size: 16px;
      border-radius: 20px;
      color: #fff;
    }

    input {
      width: 80vw;
      height: 40px;
      font-size: 16px;
      border-radius: 20px;
      border: 1px solid #ddd;
      padding-left: 15px;
      margin-top: 20px;
      margin: 10px auto;
    }
  }
}

.clause {
  position: absolute;
  bottom: 40px;
  width: 100%;
  font-size: 12px;
  color: #999;
  text-align: center;
}
</style>
