<template>
	<view class="cate">
		<mySearch @goToSearch="goToSearch"></mySearch>
		<view class="scroll-view-scroller">
			<scroll-view scroll-y="true" :style="`height: ${scrollHeight}px;`" class="left-scroll-view">
				<block v-for="(item, i) in cateList" :key="i">
					<view class="left-scroll-view-item" :class="{'active': i === active}"  @click="changeActive(i)">{{ item.cat_name }}</view>
				</block>
			</scroll-view>
			<scroll-view scroll-y="true" :style="`height: ${scrollHeight}px;`" :scroll-top="scrollTop">
				<view class="cate-lv2" v-for="(item, i) in cateLevel2" :key="i">
					<view class="cate-lv2-title">/{{ item.cat_name }}</view>
					<view class="cate-lv3-list">
						<view class="cate-lv3-item" v-for="(item2, i2) in item.children" :key="i2" @click="goToList(item2)">
							<image :src="item2.cat_icon" mode=""></image>
							<text>{{ item2.cat_name }}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script lang="ts">
	import { getCateData } from '@/apis/market'
	export default {
		data() {
			return {
				scrollHeight: 0,
				cateList: [],
				active: 0,
				cateLevel2: [],
				scrollTop: 0
			};
		},
		onLoad() {
			this.scrollHeight = uni.getSystemInfoSync().windowHeight - 50
			this.getData()
		},
		methods: {
			getData() {
				getCateData().then(res => {
					this.cateList = res.message
					this.cateLevel2 = this.cateList[0].children
				})
			},
			changeActive(i) {
				this.active = i
				this.cateLevel2 = this.cateList[i].children
				this.$nextTick(function() {
					this.scrollTop = this.scrollTop ? 0 : 1
				});
				
			},
			goToList(item) {
				uni.navigateTo({
					url: `/subpkg/goodsList/goodsList?cid=${item.cat_id}`
				})
			},
			goToSearch() {
				uni.navigateTo({
					url: '/subpkg/search/search'
				})
			}
		}
	}
</script>

<style lang="less">
.scroll-view-scroller {
	display: flex;
	.left-scroll-view {
		width: 120px;
		.left-scroll-view-item {
			background-color: #f7f7f7;
			line-height: 60px;
			text-align: center;
			font-size: 12px;
			&.active {
				background-color: #fff;
				position: relative;
				&::before {
					content: ' ';
					display: block;
					width: 3px;
					height: 30px;
					background-color: #c00000;
					position: absolute;
					top: 50%;
					left: 0;
					transform: translateY(-50%);
				}
			}
		}
	}
	.cate-lv2 {
		.cate-lv2-title {
			font-size: 12px;
			font-weight: bold;
			text-align: center;
			padding: 15px 0;
		}
	}
	.cate-lv3-list {
		display: flex;
		flex-wrap: wrap;
		.cate-lv3-item {
			width: 33.33%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			margin-bottom: 10px;
			image {
				height: 60px;
				width: 60px;
			}
			text {
				font-size: 12px;
			}
		}
	}
}
</style>
