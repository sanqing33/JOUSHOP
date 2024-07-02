<template>
	<view class="perCenter">
		<view class="head">
			<navigator url="/pages/mine/login">
				<view style="display: flex; padding: 5px 20px">
					<image src="../../static/mine/default_icon.png" mode="" style="width: 100px; height: 100px"></image>
					<view style="margin: auto 10px">登录/注册</view>
				</view>
			</navigator>
		</view>

		<view class="center">
			<view style="display: flex; justify-content: space-around">
				<view>
					<view>收藏</view>
					<view class="num">{{ num.collect }}</view>
				</view>
				<view>
					<view>优惠券</view>
					<view class="num">{{ num.coupon }}</view>
				</view>
				<view>
					<view>足迹</view>
					<view class="num">{{ num.footprint }}</view>
				</view>
			</view>
			<view style="display: flex; justify-content: space-around; margin-top: 10px">
				<navigator url="/pages/mine/details?type=1">
					<view style="width: 30px; margin: auto">
						<up-icon name="rmb-circle" size="30"></up-icon>
					</view>
					<view>待付款</view>
				</navigator>
				<navigator url="/pages/mine/details?type=2">
					<view style="width: 30px; margin: auto">
						<up-icon name="car" size="30"></up-icon>
					</view>
					<view>待收货</view>
				</navigator>
				<navigator url="/pages/mine/details?type=3">
					<view style="width: 30px; margin: auto">
						<up-icon name="chat" size="30"></up-icon>
					</view>
					<view>待评价</view>
				</navigator>
				<navigator url="/pages/mine/details?type=0">
					<view style="width: 30px; margin: auto">
						<up-icon name="order" size="30"></up-icon>
					</view>
					<view>全部订单</view>
				</navigator>
			</view>
		</view>

		<view class="footer">
			<view style="font-size: 20px; font-weight: bold; padding: 10px 20px">大家在看</view>
			<view style="display: flex; flex-wrap: wrap">
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
		</view>
	</view>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';

const num = reactive({
	collect: 10,
	coupon: 99,
	footprint: 20
});

const goods = reactive([
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
</script>

<style lang="scss" scoped>
.perCenter {
	.head {
		display: flex;
		justify-content: space-between;
		margin-top: 10px;
	}

	.center {
		background: rgba(245, 245, 245);
		margin: 30px 15px 0 15px;
		padding: 10px;
		border-radius: 20px;
		text-align: center;

		image {
			width: 50px;
			height: 50px;
		}

		.num {
			color: red;
			font-size: 20px;
		}
	}

	.footer {
		margin-top: 30px;
		background: rgba(245, 245, 245);
		border-top-left-radius: 20px;
		border-top-right-radius: 20px;

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
	}
}
</style>
