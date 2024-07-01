<template>
	<scroll-view scroll-y="true" style="height: calc(100vh - 94px)">
		<up-swiper height="300" :list="swiper" indicator indicatorMode="line" circular></up-swiper>

		<view class="goods-price">
			<view style="color: red; font-weight: bold">
				<text>￥</text>
				<text style="font-size: 25px">{{ price }}</text>
			</view>
			<view>已售 {{ sold }}+</view>
		</view>

		<view class="goods-title">{{ title }}</view>

		<view class="goods-evaluate">
			<view class="head">
				<view>
					<text style="font-size: 18px; font-weight: bold">评价</text>
					<text style="font-size: 14px">({{ evaluate.count }})</text>
				</view>

				<view style="display: flex; color: #808080">
					全部
					<up-icon name="arrow-right" style="transform: translateY(1px)"></up-icon>
				</view>
			</view>

			<view class="content" v-for="item in evaluate.content.slice(0, 2)" :key="item.id">
				<view style="display: flex; justify-content: space-between">
					<view style="display: flex">
						<image :src="item.avatar" mode=""></image>
						<view style="margin: auto 10px">
							<view>{{ item.name }}</view>
							<uni-rate allow-half active-color="red" :value="item.star" />
						</view>
					</view>
					<view style="width: 100px; display: flex; text-align: center; align-items: center; font-size: 14px">{{ Date(item.time) }}</view>
				</view>

				<view style="margin-top: 10px">{{ item.content }}</view>
			</view>
		</view>

		<view class="goods-store">
			<view style="display: flex; justify-content: space-between">
				<image style="height: 80px; width: 80px" :src="store.coverUrl" mode="aspectFill"></image>
				<view style="margin-left: 15px">
					<view style="font-weight: bold; font-size: 20px">{{ store.name }}</view>
					<view style="color: #808080; transform: translate(10px, 5px)">
						<view>{{ store.focus }}人关注</view>
						<view>共{{ store.products }}件商品</view>
					</view>
				</view>
			</view>
			<view style="margin: auto 0">
				<button type="warn" plain="true" style="font-size: 15px; border-radius: 20px">进店逛逛</button>
			</view>
		</view>

		<view class="goods-others">
			<view style="font-size: 18px; font-weight: bold; margin-left: 10px; padding-top: 5px">店铺其他商品</view>
			<view style="display: flex; flex-wrap: wrap; margin: 0 5px">
				<view v-for="item in others" :key="item.id" style="margin-top: 10px; width: calc((100vw - 40px) / 3); margin: 5px">
					<view style="height: 160px">
						<image :src="item.coverUrl" mode="" style="width: 100%; height: 28vw"></image>
						<view style="margin-left: 5px">
							<view>{{ item.name }}</view>
							<view style="color: red; font-size: 18px">￥{{ item.price }}</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="goods-intro">
			<view style="font-size: 18px; font-weight: bold">商品介绍</view>
			<view>
				<image src="../../static/index/kunkun.jpg" mode="" style="width: 100%"></image>
				<text>鸽鸽真棒</text>
			</view>
		</view>
	</scroll-view>

	<view style="height: 50px; display: flex; background: white">
		<view style="display: flex; height: 100%; flex: 1; justify-content: space-around">
			<up-icon name="home" label="店铺" labelPos="bottom" size="25"></up-icon>
			<up-icon name="kefu-ermai" label="客服" labelPos="bottom" size="25"></up-icon>
			<up-icon name="star" label="收藏" labelPos="bottom" size="25"></up-icon>
		</view>
		<view style="display: flex; align-items: center">
			<up-button
				style="margin-right: 5px; width: 125px"
				@click="select('shoppingcar')"
				text="加入购物车"
				shape="circle"
				color="linear-gradient(120deg, #f6d365 0%, #fda085 100%)"
			></up-button>
			<up-button
				style="margin-right: 5px; width: 125px"
				@click="select('buy')"
				text="立即购买"
				shape="circle"
				color="linear-gradient(120deg, #f6d365 0%, #fda085 100%)"
			></up-button>
		</view>
	</view>

	<!-- 加入购物车/立即购买 -->
	<up-popup :show="buyShow" mode="bottom" @close="close">
		<scroll-view scroll-y="true" style="height: 50vh">
			<view style="padding: 20px; display: flex">
				<img :src="img" alt="" style="width: 35vw; height: 35vw; object-fit: cover; border-radius: 15px" />
				<view style="margin: auto 30px; color: red">
					<text>￥</text>
					<text style="font-size: 25px">{{ price }}</text>
				</view>
			</view>
			<view style="display: flex; height: 20vh">
				<text style="width: 80px; text-align: center">规格</text>
				<up-radio-group v-model="value">
					<up-radio
						style="margin-left: 10px"
						iconColor="transparent"
						inactiveColor="transparent"
						:customStyle="{ marginBottom: '8px' }"
						v-for="(item, index) in option"
						:key="index"
						:label="item.name"
						:name="item.name"
						@change="radioChange"
					></up-radio>
				</up-radio-group>
			</view>
		</scroll-view>
		<view style="display: flex; justify-content: space-between">
			<text style="width: 80px; text-align: center">数量</text>
			<up-number-box style="margin-right: 30px" v-model="count" @change=""></up-number-box>
		</view>
		<view>
			<up-button
				v-if="selectType === 'shoppingcar'"
				style="margin: 10px auto; width: 90vw"
				@click="shoppingcar"
				text="加入购物车"
				shape="circle"
				color="linear-gradient(120deg, #f6d365 0%, #fda085 100%)"
			></up-button>
			<up-button
				v-if="selectType === 'buy'"
				style="margin: 10px auto; width: 90vw"
				@click="buy"
				text="立即购买"
				shape="circle"
				color="linear-gradient(120deg, #f6d365 0%, #fda085 100%)"
			></up-button>
		</view>
	</up-popup>
</template>

<script lang="ts" setup>
import { reactive, ref, computed } from 'vue';

const img = ref('https://api.btstu.cn/sjbz/api.php');

const title = ref('鸽鸽下的蛋');

const price = ref(99.99);

const freight = ref(0.0);

const sold = ref(999);

const evaluate = reactive({
	count: 99,
	content: [
		{
			id: 1,
			name: 'ikun',
			avatar: '../../static/index/kktx.webp',
			star: 2.5,
			content: '鸽鸽的蛋真好吃！',
			time: '2023-03-09 12:00:00'
		},
		{
			id: 2,
			name: 'kunkun',
			avatar: '../../static/index/kktx2.webp',
			star: 2.5,
			content: '姬霓太美！',
			time: '2023-06-09 18:00:00'
		}
	]
});

const swiper = ref(['https://cdn.uviewui.com/uview/swiper/swiper3.png', 'https://cdn.uviewui.com/uview/swiper/swiper2.png', 'https://cdn.uviewui.com/uview/swiper/swiper1.png']);

const store = reactive({
	coverUrl: '../../static/index/swiper/背带裤.jpg',
	name: '坤坤之家',
	focus: 999,
	products: 9999
});

const others = reactive([
	{ id: 1, coverUrl: '../../static/index/kktx.webp', name: '鸽鸽的蛋1', price: 98.0 },
	{ id: 2, coverUrl: '../../static/index/kktx.webp', name: '鸽鸽的蛋2', price: 128.88 },
	{ id: 3, coverUrl: '../../static/index/kktx.webp', name: '鸽鸽的蛋3', price: 328.0 },
	{ id: 4, coverUrl: '../../static/index/kktx.webp', name: '鸽鸽的蛋4', price: 648.0 },
	{ id: 5, coverUrl: '../../static/index/kktx.webp', name: '鸽鸽的蛋5', price: 6666.66 },
	{ id: 6, coverUrl: '../../static/index/kktx.webp', name: '鸽鸽的蛋6', price: 99999.99 }
]);

const buyShow = ref(false);

const selectType = ref();

const select = (a: string) => {
	selectType.value = a;
	buyShow.value = true;
	console.log(selectType.value);
};

const value = ref('紫色');

const count = ref(1);

const shoppingcar = () => {};

const buy = () => {
	uni.navigateTo({
		url: `/pages/order/order?store=${store.name}&freight=${freight.value}&value=${value.value}&count=${count.value}&title=${title.value}&img=${img.value}&price=${price.value}`
	});
};

const close = () => {
	buyShow.value = false;
};

const option = reactive([
	{
		name: '紫色',
		value: 'purple',
		disabled: false
	},
	{
		name: '蓝色',
		value: 'blue',
		disabled: false
	},
	{
		name: '绿色',
		value: 'green',
		disabled: false
	}
]);

const radioChange = (n) => {
	value.value = n;
};
</script>

<style lang="scss" scoped>
body {
	background: rgb(245, 245, 245);
}

.goods-swiper {
	height: 400px;

	image {
		width: 100%;
		height: 100%;
	}
}

.goods-price {
	padding: 10px;
	background: #ffffff;
	height: 40px;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.goods-title {
	padding: 5px;
	background: #ffffff;
	font-size: 25px;
}

.goods-evaluate {
	margin: 10px 0;
	padding: 10px;
	background: #ffffff;
	border-radius: 15px;

	.head {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.content {
		margin-top: 10px;

		image {
			width: 50px;
			height: 50px;
			border-radius: 50%;
		}
	}
}

.goods-store {
	margin: 10px;
	padding: 10px;
	background: #ffffff;
	border-radius: 15px;
	display: flex;
	justify-content: space-between;
}

.goods-others {
	background: #ffffff;
	border-radius: 15px;
}

.goods-intro {
	margin: 10px 0;
	padding: 10px;
	background: #ffffff;
	border-radius: 15px;
}
</style>
