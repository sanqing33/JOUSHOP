<template>
	<view class="classification">
		<view style="background: #fff; border-bottom: 1px #d3d3d3 solid">
			<view class="search">
				<uni-icons class="search-icon" type="search" size="30" @click="search"></uni-icons>
				<input class="search-input" confirm-type="搜索" placeholder="请输入要搜索的商品..." v-model="search_input" />
			</view>
		</view>

		<view class="categories">
			<scroll-view style="width: 100px; background-color: #f6f6f6; overflow: hidden" scroll-y>
				<view v-for="(item, index) in first_categories" :key="item.id" class="item" :class="{ active: index === first_check }">
					<text class="name" @click="first_change(index)">{{ item.name }}</text>
				</view>
			</scroll-view>

			<scroll-view style="background-color: #fff; overflow: hidden" scroll-y>
				<view style="margin: 0 15px" v-for="item in first_categories[first_check].second_categories" :key="item.id">
					<view style="padding: 8px 0; font-weight: bold">
						<text>{{ item.name }}</text>
					</view>
					<view style="display: flex; flex-wrap: wrap">
						<navigator style="margin: 10px auto" v-for="goods in item.section" :key="goods" hover-class="none" :url="'../search/search?keyword=' + goods.name">
							<image style="width: 75px; height: 75px" :src="goods.coverUrl"></image>
							<view style="font-size: 14px">{{ goods.name }}</view>
						</navigator>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';

const search_input = ref('');

const search = () => {
	console.log(search_input.value);
};

const first_check = ref(0);

const first_change = (index: number) => {
	first_check.value = index;
};

const first_categories = reactive([
	{
		id: 1,
		name: '数码家电',
		second_categories: [
			{
				id: 1,
				name: '手机',
				section: [
					{ id: 1, name: '华为', coverUrl: 'https://img0.baidu.com/it/u=3618643909,4148621576&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=800' },
					{ id: 2, name: '苹果', coverUrl: 'https://img0.baidu.com/it/u=3618643909,4148621576&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=800' },
					{ id: 3, name: '小米', coverUrl: 'https://img0.baidu.com/it/u=3618643909,4148621576&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=800' },
					{ id: 4, name: 'oppo', coverUrl: 'https://img0.baidu.com/it/u=3618643909,4148621576&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=800' },
					{ id: 5, name: 'vivo', coverUrl: 'https://img0.baidu.com/it/u=3618643909,4148621576&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=800' },
					{ id: 6, name: '一加', coverUrl: 'https://img0.baidu.com/it/u=3618643909,4148621576&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=800' }
				]
			},
			{
				id: 2,
				name: '相机',
				section: [
					{ id: 1, name: '华为', coverUrl: 'https://img0.baidu.com/it/u=3618643909,4148621576&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=800' },
					{ id: 2, name: '苹果', coverUrl: 'https://img0.baidu.com/it/u=3618643909,4148621576&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=800' },
					{ id: 3, name: '小米', coverUrl: 'https://img0.baidu.com/it/u=3618643909,4148621576&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=800' },
					{ id: 4, name: 'oppo', coverUrl: 'https://img0.baidu.com/it/u=3618643909,4148621576&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=800' },
					{ id: 5, name: 'vivo', coverUrl: 'https://img0.baidu.com/it/u=3618643909,4148621576&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=800' },
					{ id: 6, name: '一加', coverUrl: 'https://img0.baidu.com/it/u=3618643909,4148621576&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=800' }
				]
			},
			{
				id: 3,
				name: '电视',
				section: [
					{ id: 1, name: '华为', coverUrl: 'https://img0.baidu.com/it/u=3618643909,4148621576&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=800' },
					{ id: 2, name: '苹果', coverUrl: 'https://img0.baidu.com/it/u=3618643909,4148621576&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=800' },
					{ id: 3, name: '小米', coverUrl: 'https://img0.baidu.com/it/u=3618643909,4148621576&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=800' },
					{ id: 4, name: 'oppo', coverUrl: 'https://img0.baidu.com/it/u=3618643909,4148621576&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=800' },
					{ id: 5, name: 'vivo', coverUrl: 'https://img0.baidu.com/it/u=3618643909,4148621576&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=800' },
					{ id: 6, name: '一加', coverUrl: 'https://img0.baidu.com/it/u=3618643909,4148621576&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=800' }
				]
			},
			{
				id: 4,
				name: '电脑',
				section: [
					{ id: 1, name: '华为', coverUrl: 'https://img0.baidu.com/it/u=3618643909,4148621576&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=800' },
					{ id: 2, name: '苹果', coverUrl: 'https://img0.baidu.com/it/u=3618643909,4148621576&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=800' },
					{ id: 3, name: '小米', coverUrl: 'https://img0.baidu.com/it/u=3618643909,4148621576&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=800' },
					{ id: 4, name: 'oppo', coverUrl: 'https://img0.baidu.com/it/u=3618643909,4148621576&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=800' },
					{ id: 5, name: 'vivo', coverUrl: 'https://img0.baidu.com/it/u=3618643909,4148621576&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=800' },
					{ id: 6, name: '一加', coverUrl: 'https://img0.baidu.com/it/u=3618643909,4148621576&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=800' }
				]
			},
			{ id: 5, name: '外设' }
		]
	},
	{
		id: 2,
		name: '服装鞋帽',
		second_categories: [
			{ id: 1, name: '上衣' },
			{ id: 2, name: '裤子' },
			{ id: 3, name: '鞋子' },
			{ id: 4, name: '帽子' },
			{ id: 5, name: '内衣' }
		]
	},
	{ id: 3, name: '日用百货' },
	{ id: 4, name: '办公用品' },
	{ id: 5, name: '体育用品' }
]);
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
				content: '';
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
