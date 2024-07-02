<template>
	<view class="login">
		<view style="text-align: center">
			<image src="../../static/logo_transparent.png" style="width: 120px; height: 120px; margin-top: 10vh"></image>
			<view style="font-size: 1.4em">JOU SHOP</view>
		</view>

		<view class="input">
			<view class="login-check">
				<view v-if="login_check" style="top: 125px">
					<button style="background-color: #28bb9c" @click="login">手机号快捷登录</button>
					<button style="background-color: #c0c0c0; margin-top: 20px" @click="change_login_check">用户名密码登录</button>
				</view>

				<view v-else>
					<input type="text" v-model="form.username" placeholder="请输入用户名/手机号" />
					<input type="text" v-model="form.password" password placeholder="请输入密码" />
					<button style="margin-top: 20px; background-color: #28bb9c" @click="login">登录</button>
					<button style="background-color: #c0c0c0; margin-top: 20px" @click="change_login_check">手机号快捷登录</button>
				</view>
			</view>

			<view class="clause">
				<checkbox-group @change="check">
					<checkbox value="clause">阅读并同意《服务条款》和《joushop隐私协议》</checkbox>
				</checkbox-group>
			</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';

const clause = ref(false);

const check = (e) => {
	clause.value = e.detail.value.length > 0 ? true : false;
};

const login_check = ref(false);

const change_login_check = () => {
	login_check.value = !login_check.value;
};

const form = reactive({
	username: '',
	password: ''
});

const login = () => {
	if (clause.value !== true) return uni.showToast({ title: '请先阅读并同意服务条款', icon: 'none' });

	if (login_check.value === true) {
		console.log('手机号快捷登录');
	} else {
		if (form.username === '' || form.password === '') return uni.showToast({ title: '请填写用户名和密码', icon: 'none' });
		if (form.password.length < 6) return uni.showToast({ title: '密码长度不能小于6位', icon: 'none' });
		if (form.username.length < 11) return uni.showToast({ title: '用户名长度不能小于11位', icon: 'none' });
		console.log('用户名密码登录', form);
	}
};
</script>

<style lang="scss" scoped>
body {
	background-image: linear-gradient(150deg, rgb(237, 222, 205) 0%, rgb(187, 148, 102) 100%);
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
			width: 80vw;
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
