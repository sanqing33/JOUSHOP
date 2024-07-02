<template>
	<view class="shoppingCar">
		<view class="head">
			<view style="font-size: 22px">购物车</view>
			<view style="transform: translateY(3px)">管理</view>
		</view>

		<scroll-view scroll-y="true" style="height: calc(100vh - 109px)">
			<view v-for="(item, index) in goods" :key="index" style="background: #fff; border-radius: 15px; padding: 10px">
				<up-text size="20" :text="item.store"></up-text>
				<view style="display: flex; line-height: 10vw; padding: 10px 0">
					<img :src="item.img" alt="" style="width: 30vw; height: 30vw; object-fit: cover" />
					<view style="flex: 1; margin-left: 10px">
						<up-text size="20" :text="item.title"></up-text>
						<up-text size="16" :text="item.value"></up-text>

						<view style="display: flex; justify-content: space-between">
							<up-text color="red" size="20" mode="price" :text="item.price"></up-text>
							<up-number-box style="margin-right: 20px" v-model="item.count" @change="change"></up-number-box>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>

		<view class="footer">
			<checkbox-group @change="change" style="transform: translateY(-1px); padding: 5px 20px">
				<checkbox value="checkAll" class="round">全选</checkbox>
			</checkbox-group>

			<view style="display: flex; transform: translateX(30px); padding: 5px 20px">
				<view>合计：</view>
				<up-text color="red" mode="price" :text="prices"></up-text>
			</view>

			<view @click="buy" style="background: red; color: white; padding: 5px 20px; border-radius: 20px">结算</view>
		</view>
	</view>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

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
		count: 1,
		state: '待付款'
	},
	{
		store: '店铺名称3',
		title: '商品名称',
		value: '商品规格',
		price: 100.0,
		img: 'https://api.btstu.cn/sjbz/api.php',
		count: 1,
		state: '待收货'
	},
	{
		store: '店铺名称4',
		title: '商品名称',
		value: '商品规格',
		price: 100.0,
		img: 'https://api.btstu.cn/sjbz/api.php',
		count: 1,
		state: '待评价'
	},
	{
		store: '店铺名称5',
		title: '商品名称',
		value: '商品规格',
		price: 100.0,
		img: 'https://api.btstu.cn/sjbz/api.php',
		count: 1,
		state: '待评价'
	},
	{
		store: '店铺名称6',
		title: '商品名称',
		value: '商品规格',
		price: 100.0,
		img: 'https://api.btstu.cn/sjbz/api.php',
		count: 1,
		state: '已成交'
	}
]);

const prices = ref(0.0);

const change = () => {
	prices.value = 0.0;
	goods.forEach((item) => {
		prices.value += item.price * item.count; // 计算总价
	});
};

const buy = () => {
	store.commit('setGoods', goods);
	uni.navigateTo({
		url: '/pages/order/order?type=shoppingcar'
	});
};
</script>

<style lang="scss" scoped>
.shoppingCar {
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
