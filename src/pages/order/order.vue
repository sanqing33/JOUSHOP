<template>
	<scroll-view scroll-y="true" style="height: calc(100vh - 109px)">
		<view @click="showAddress" style="height: 60px; background: #fff; border-radius: 15px">
			<text v-if="!address" style="line-height: 60px; padding-left: 20vw; font-size: 18px; color: #606060">选择地址</text>
			<view v-else style="font-size: 18px">
				<view style="display: flex; margin-left: 10px; padding-top: 5px">
					<view style="width: 50px">{{ address.name }}</view>
					<view style="margin-left: 20px">{{ address.phone }}</view>
				</view>
				<view style="margin-left: 10px">{{ address.address }}</view>
			</view>
		</view>

		<up-popup :show="show" mode="center" @close="close">
			<scroll-view scroll-y="true" style="width: 100vw; height: 50vh">
				<view style="border: #dcdcdc 1px solid; margin-bottom: 5px; font-size: 18px; color: #606060" v-for="(item, index) in addresses" :key="index">
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
		</up-popup>

		<up-divider lineColor="#000"></up-divider>

		<view style="background: #fff; border-radius: 15px; padding: 10px">
			<up-text size="20" :text="goods.store"></up-text>
			<view style="display: flex; line-height: 10vw; padding: 10px 0">
				<img :src="goods.img" alt="" style="width: 30vw; height: 30vw; object-fit: cover" />
				<view style="flex: 1; margin-left: 10px">
					<up-text size="20" :text="goods.title"></up-text>
					<up-text size="16" :text="goods.value"></up-text>

					<view style="display: flex; justify-content: space-between">
						<up-text color="red" size="20" mode="price" :text="goods.price"></up-text>
						<up-number-box style="margin-right: 20px" v-model="goods.count" @change=""></up-number-box>
					</view>
				</view>
			</view>
			<view style="margin-top: 20px; display: flex; justify-content: space-between">
				<view>商品金额</view>
				<view>
					<up-text color="red" size="16" mode="price" :text="goods.price * goods.count"></up-text>
				</view>
			</view>
			<view style="margin-top: 20px; display: flex; justify-content: space-between">
				<view>运费</view>
				<view>
					<up-text color="black" size="16" mode="price" :text="goods.freight"></up-text>
				</view>
			</view>
		</view>
	</scroll-view>

	<view style="height: 65px; display: flex; justify-content: space-around; align-items: center; padding: 0 20px; background: #fff">
		<up-text color="red" size="22" mode="price" :text="goods.price * goods.count"></up-text>
		<view style="width: 35vw">
			<up-button type="primary" shape="circle" text="提交订单"></up-button>
		</view>
	</view>
</template>

<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app';
import { reactive, ref } from 'vue';

const goods = ref();

onLoad((option) => {
	goods.value = option;
	console.log(goods.value);
});

const addresses = reactive([
	{
		name: '张三',
		phone: '13812345678',
		address: '北京市朝阳区'
	},
	{
		name: '李四',
		phone: '13812345678',
		address: '北京市朝阳区'
	},
	{
		name: '张三',
		phone: '13812345678',
		address: '北京市朝阳区'
	},
	{
		name: '李四',
		phone: '13812345678',
		address: '北京市朝阳区'
	}
]);

const show = ref(false);

const address = ref();

const showAddress = () => {
	show.value = true;
};
const close = () => {
	show.value = false;
};
const checkAddress = (item: any) => {
	address.value = item;
	show.value = false;
	console.log(address.value);
};
</script>

<style lang="scss" scoped>
body {
	background: rgba(220, 220, 220, 0.5);
}
</style>
