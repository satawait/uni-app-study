<template>
	<view class="home">
		<view class="search-box">
			<mySearch @goToSearch="goToSearch"></mySearch>
		</view>
		<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" circular="true">
			<swiper-item v-for="(item, index) in swiperList" :key="index">
				<navigator class="swiper-item" :url="`/subpkg/goodsDetail/goodsDetail?good_id=${item.good_id}`">
					<image :src="item.image_src"></image>
				</navigator>
			</swiper-item>
		</swiper>
		<view class="nav-list">
			<view class="nav-item" v-for="(item, index) in naviList" :key="index" @click="navClick(item)">
				<image :src="item.image_src" class="nav-img"></image>
			</view>
		</view>
		<view class="floor-list">
			<view class="floor-item" v-for="(item, index) in floorList" :key="index">
				<image :src="item.floor_title.image_src" class="floor-title"></image>
				<view class="floor-image-box">
					<navigator class="left-image-box" :url="item.product_list[0].url">
						<image :src="item.product_list[0].image_src" :style="`width: ${item.product_list[0].image_width}rpx`" mode="widthFix"></image>
					</navigator>
					<view class="right-image-box">
						<navigator v-for="(imageItem, i2) in item.product_list.slice(1)" :key="i2" class="right-image-item" :url="imageItem.url">
							<image :src="imageItem.image_src" class="image" :style="`width: ${imageItem.image_width}rpx`" mode="widthFix"></image>
						</navigator>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	import useInfo from '@/composables/useInfo'
	import { getSwiperData, getNavData, getFloorData } from '@/apis/market'
	export default {
		data() {
			return {
				swiperList: [],
				naviList: [],
				floorList: []
			};
		},
		onLoad() {
			this.getData()
		},
		methods: {
			getData() {
				getSwiperData().then(res => {
					this.swiperList = res.message
				})
				getNavData().then(res => {
					this.naviList = res.message
				})
				getFloorData().then(res => {
					res.message.forEach(floor => {
						floor.product_list.forEach(prod => {
							prod.url = `/subpkg/goodsList/goodsList?${prod.navigator_url.split('?')[1]}`
						})
					})
					this.floorList = res.message
				})
			},
			navClick(item) {
				switch (item.name){
					case '分类':
					uni.switchTab({
						url: '/pages/cate/cate'
					})
						break;
					default:
						break;
				}
			},
			goToSearch() {
				uni.navigateTo({
					url: '/subpkg/search/search'
				})
			}
		}
	}
</script>
<script lang="ts" setup>
	useInfo()
</script>

<style lang="less">
	.search-box {
		position: sticky;
		top: 0;
		z-index: 999;
	}
.swiper {
	height: 330rpx;
	.swiper-item {
		height: 100%;
		image {
			width: 100%;
			height: 100%;
		}
	}
}
.nav-list {
	display: flex;
	justify-content: space-around;
	margin: 15rpx 0;
	.nav-img {
		width: 128rpx;
		height: 140rpx;
	}
}
.floor-list {
	.floor-item {
		.floor-title {
			width: 100%;
			height: 60rpx;
		}
	}
	.floor-image-box {
		display: flex;
		padding-left: 10rpx;
		.right-image-box {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
		}
	}
}
</style>
