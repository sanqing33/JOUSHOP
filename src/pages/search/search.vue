<template>
	<!-- 搜索框 -->
	<view style="width: 90vw; margin: 5px auto">
		<up-search placeholder="日照香炉生紫烟" v-model="keyword" height="40"></up-search>
	</view>

	<!-- 导航栏 -->
	<up-tabs
		:list="list1"
		@click="click"
		:scrollable="false"
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
	>
		<template #right>
			<view style="display: flex; margin-right: 25px; font-size: 15px; color: #606266" @tap="$u.toast('插槽被点击')">
				筛选
				<up-icon name="grid" color="#606266" size="21" bold></up-icon>
			</view>
		</template>
	</up-tabs>

	<!-- 商品 -->
	<scroll-view scroll-y="true" style="height: calc(100vh - 106px)">
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
	</scroll-view>
</template>

<script lang="ts" setup>
import { onLoad } from '@dcloudio/uni-app';
import { ref, reactive } from 'vue';

const list1 = reactive([{ name: '推荐' }, { name: '销量' }, { name: '价格' }]);

const keyword = ref('');

onLoad((option) => {
	console.log(option.keyword);
	keyword.value = option.keyword || '';
});

const click = (item: any) => {
	switch (item.name) {
		case '推荐':
			goods.value = goods1;
			break;
		case '销量':
			goods.value = goods2;
			break;
		default:
			goods.value = [];
	}
};

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
body {
	overflow: hidden;
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
