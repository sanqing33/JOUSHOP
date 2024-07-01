<template>
	<!-- 搜索框 -->
	<view style="width: 90vw; margin: 0 auto; margin-top: 5px">
		<up-search
			@search="search"
			@custom="search"
			@change="change"
			placeholder="轻舟已过万重山"
			v-model="keyword"
			searchIcon="scan"
			@clickIcon="scan"
			height="40"
			animation="true"
		></up-search>
	</view>

	<!-- 轮播图 -->
	<view style="width: 95vw; margin: 0 auto; margin-top: 5px">
		<up-swiper radius="25" height="200" :list="swiper" indicator indicatorMode="line" circular></up-swiper>
	</view>

	<!-- 首页分类 -->
	<view style="width: 90vw; margin: 10px auto 0 auto">
		<view class="classification">
			<view class="cf-box" v-for="item in classification" :key="item.id">
				<navigator :url="item.href" open-type="switchTab">
					<image class="icon" :src="'../../static/index/classification/' + item.title + '.png'" mode=""></image>
					<view class="title">{{ item.title }}</view>
				</navigator>
			</view>
		</view>
		<up-tabs
			@click="categoryClick"
			:list="categroy"
			lineWidth="30"
			lineColor="#f56c6c"
			:activeStyle="{
				color: '#303133',
				fontWeight: 'bold',
				transform: 'scale(1.05)'
			}"
			:inactiveStyle="{
				color: '#606266',
				transform: 'scale(1)'
			}"
			itemStyle="padding-left: 15px; padding-right: 15px; height: 34px;"
		></up-tabs>
	</view>

	<!-- 商品 -->
	<view style="margin-top: 10px; display: flex; flex-wrap: wrap">
		<view class="content" v-for="(item, index) in goods" :key="index">
			<navigator url="/pages/details/details">
				<image :src="item.image" mode="aspectFill"></image>
				<view style="margin-left: 10px; height: 42px">{{ item.title }}</view>
				<view style="color: red; margin-left: 5px; font-size: 16px">
					<text>￥</text>
					<text>{{ item.price }}</text>
				</view>
				<view style="margin: 0 5px 3px 0; text-align: right">
					<text style="font-size: 12px; color: rgb(128, 128, 128)">{{ item.shop }}</text>
				</view>
			</navigator>
		</view>
	</view>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

const keyword = ref('轻舟已过万重山');

const change = () => {
	console.log('输入框值变化：', keyword.value);
};

const search = () => {
	console.log('搜索关键字：', keyword.value);
	uni.navigateTo({
		url: '../search/search?keyword=' + keyword.value
	});
};

const scan = () => {
	uni.scanCode({
		success: function (res) {
			console.log('条码类型：' + res.scanType);
			console.log('条码内容：' + res.result);
		}
	});
};

const swiper = ref(['https://cdn.uviewui.com/uview/swiper/swiper3.png', 'https://cdn.uviewui.com/uview/swiper/swiper2.png', 'https://cdn.uviewui.com/uview/swiper/swiper1.png']);

const categroy = reactive([
	{ name: '精选' },
	{ name: '热卖', badge: { isDot: true } },
	{ name: '数码' },
	{ name: '家电' },
	{ name: '居家' },
	{ name: '美食' },
	{ name: '穿搭' },
	{ name: '洗护' }
]);

const categoryClick = (item: any) => {
	switch (item.name) {
		case '精选':
			goods.value = goods1;
			break;
		case '热卖':
			goods.value = goods2;
			break;
		default:
			goods.value = [];
	}
};

const classification = [
	{ id: 1, title: '坤坤专卖', href: '' },
	{ id: 2, title: '超市', href: '' },
	{ id: 3, title: '百亿补贴', href: '' },
	{ id: 4, title: '拍卖', href: '' },
	{ id: 5, title: '淘二手', href: '' },
	{ id: 6, title: '送药上门', href: '' },
	{ id: 7, title: '充值中心', href: '' },
	{ id: 8, title: '直播活动', href: '' },
	{ id: 9, title: '分类', href: '/pages/categroy/categroy' },
	{ id: 10, title: '个人中心', href: '/pages/mine/mine' }
];

const goods1 = reactive([
	{
		price: 35,
		title: '北国风光，千里冰封，万里雪飘',
		shop: '李白杜甫白居易旗舰店',
		image: 'https://b0.bdstatic.com/2bb0d5086b1010e82cf1b1edbb15820e.jpg@h_1280'
	},
	{
		price: 75,
		title: '望长城内外，惟余莽莽',
		shop: '李白杜甫白居易旗舰店',
		image: 'https://b0.bdstatic.com/2bb0d5086b1010e82cf1b1edbb15820e.jpg@h_1280'
	},
	{
		price: 385,
		title: '大河上下，顿失滔滔11111111111111111',
		shop: '李白杜甫白居易旗舰店',
		image: 'https://b0.bdstatic.com/2bb0d5086b1010e82cf1b1edbb15820e.jpg@h_1280'
	},
	{
		price: 784,
		title: '欲与天公试比高',
		shop: '李白杜甫白居易旗舰店',
		image: 'https://b0.bdstatic.com/2bb0d5086b1010e82cf1b1edbb15820e.jpg@h_1280'
	},
	{
		price: 7891,
		title: '须晴日，看红装素裹，分外妖娆',
		shop: '李白杜甫白居易旗舰店',
		image: 'https://b0.bdstatic.com/2bb0d5086b1010e82cf1b1edbb15820e.jpg@h_1280'
	},
	{
		price: 2341,
		shop: '李白杜甫白居易旗舰店',
		title: '江山如此多娇，引无数英雄竞折腰',
		image: 'https://b0.bdstatic.com/2bb0d5086b1010e82cf1b1edbb15820e.jpg@h_1280'
	},
	{
		price: 661,
		shop: '李白杜甫白居易旗舰店',
		title: '惜秦皇汉武，略输文采',
		image: 'https://b0.bdstatic.com/2bb0d5086b1010e82cf1b1edbb15820e.jpg@h_1280'
	},
	{
		price: 1654,
		title: '唐宗宋祖，稍逊风骚',
		shop: '李白杜甫白居易旗舰店',
		image: 'https://b0.bdstatic.com/2bb0d5086b1010e82cf1b1edbb15820e.jpg@h_1280'
	},
	{
		price: 1678,
		title: '一代天骄，成吉思汗',
		shop: '李白杜甫白居易旗舰店',
		image: 'https://b0.bdstatic.com/2bb0d5086b1010e82cf1b1edbb15820e.jpg@h_1280'
	},
	{
		price: 924,
		title: '只识弯弓射大雕',
		shop: '李白杜甫白居易旗舰店',
		image: 'https://b0.bdstatic.com/2bb0d5086b1010e82cf1b1edbb15820e.jpg@h_1280'
	},
	{
		price: 8243,
		title: '俱往矣，数风流人物，还看今朝',
		shop: '李白杜甫白居易旗舰店',
		image: 'https://b0.bdstatic.com/2bb0d5086b1010e82cf1b1edbb15820e.jpg@h_1280'
	}
]);

const goods2 = reactive([
	{
		price: 99999,
		title: '北国风光，千里冰封，万里雪飘1111',
		shop: '李白杜甫白居易旗舰店',
		image: 'https://b0.bdstatic.com/2bb0d5086b1010e82cf1b1edbb15820e.jpg@h_1280'
	},
	{
		price: 35,
		title: '北国风光，千里冰封，万里雪飘222',
		shop: '李白杜甫白居易旗舰店',
		image: 'https://b0.bdstatic.com/2bb0d5086b1010e82cf1b1edbb15820e.jpg@h_1280'
	}
]);

const goods = ref(goods1);
</script>

<style lang="scss" scoped>
.classification {
	margin-top: 30px;
	width: 90vw;
	transform: translateX(5vw);

	.cf-box {
		display: inline-block;
		width: 16vw;
		height: 20vw;
		margin: 1vw;

		.icon {
			height: 10vw;
			width: 10vw;
			display: flex;
			justify-content: center;
			margin: 1vw 0;
			transform: translateX(3vw);
		}

		.title {
			font-size: 13px;
			display: flex;
			justify-content: center;
		}
	}
}

.content {
	border-radius: 10px;
	background: rgb(248, 248, 255);
	border: 1px #a9a9a9 solid;
	margin: 5px;
	width: calc(50% - 12px);

	image {
		width: 100%;
		height: 200px;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
	}
}
</style>
