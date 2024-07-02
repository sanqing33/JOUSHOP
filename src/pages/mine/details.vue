<template>
	<up-subsection @change="select" fontSize="16" :list="list" activeColor="rgb(187, 148, 102)" :current="type"></up-subsection>
	<scroll-view scroll-y="true" style="height: calc(100vh - 78px); background: rgb(238, 238, 239)">
		<view style="margin-bottom: 5px; padding: 5px 10px; background: #fff; border-radius: 20px" v-for="(item, index) in selectGoods" :key="index">
			<view style="display: flex">
				<up-text size="18" :text="item.store"></up-text>
				<text style="text-align: right; padding: 5px">{{ item.state }}</text>
			</view>

			<view style="display: flex; line-height: 15vw; padding: 10px 0">
				<img :src="item.img" alt="" style="width: 30vw; height: 30vw; object-fit: cover; border-radius: 15px" />
				<view style="flex: 1; margin-left: 10px">
					<up-text size="20" :text="item.title"></up-text>
					<up-text size="16" :text="item.value"></up-text>
				</view>
				<view>
					<up-text color="red" size="20" mode="price" :text="item.price * item.count"></up-text>
					<up-text size="18" :text="'共' + item.count + '件'"></up-text>
				</view>
			</view>
		</view>
	</scroll-view>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';
import { reactive } from '@vue/runtime-core';

const type = ref();

onLoad((option) => {
	type.value = option.type;
	select(parseInt(option.type));
});

const list = ref([
	{ id: 0, name: '全部订单' },
	{ id: 1, name: '待付款' },
	{ id: 2, name: '待收货' },
	{ id: 3, name: '待评价' }
]);

const goods = reactive([
	{
		store: '店铺名称1',
		title: '商品名称',
		value: '商品规格',
		price: 100.0,
		img: 'https://api.btstu.cn/sjbz/api.php',
		count: 1,
		state: '已成交'
	},
	{
		store: '店铺名称2',
		title: '商品名称',
		value: '商品规格',
		price: 100.0,
		img: 'https://api.btstu.cn/sjbz/api.php',
		count: 2,
		state: '待付款'
	},
	{
		store: '店铺名称3',
		title: '商品名称',
		value: '商品规格',
		price: 100.0,
		img: 'https://api.btstu.cn/sjbz/api.php',
		count: 2,
		state: '待收货'
	},
	{
		store: '店铺名称4',
		title: '商品名称',
		value: '商品规格',
		price: 100.0,
		img: 'https://api.btstu.cn/sjbz/api.php',
		count: 2,
		state: '待评价'
	},
	{
		store: '店铺名称5',
		title: '商品名称',
		value: '商品规格',
		price: 100.0,
		img: 'https://api.btstu.cn/sjbz/api.php',
		count: 2,
		state: '待评价'
	},
	{
		store: '店铺名称6',
		title: '商品名称',
		value: '商品规格',
		price: 100.0,
		img: 'https://api.btstu.cn/sjbz/api.php',
		count: 2,
		state: '已成交'
	}
]);

const selectGoods = ref();

const select = (index: number) => {
	type.value = index;
	switch (index) {
		case 0:
			selectGoods.value = goods;
			break;
		case 1:
			selectGoods.value = goods.filter((item) => item.state === '待付款');
			break;
		case 2:
			selectGoods.value = goods.filter((item) => item.state === '待收货');
			break;
		case 3:
			selectGoods.value = goods.filter((item) => item.state === '待评价');
	}
};
</script>

<style lang="scss" scoped></style>
