<template>
	<view class="goods-item">
		<view class="goods-item-left">
			<image :src="item.goods_small_logo || defaultPic" class="goods-pic"></image>
		</view>
		<view class="goods-item-right">
			<view class="goods-name">
				{{ item.goods_name }}
			</view>
			<view class="goods-info-box">
				<view class="goods-price">
					￥{{ toFixed(item.goods_price) }}
				</view>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	export default {
		name:"myGoods",
		data() {
			return {
				defaultPic: 'http://image5.suning.cn/uimg/b2c/newcatentries/0000000000-000000000193373779_1_400x400.jpg'
			};
		},
		methods: {
			toFixed(price) {
				return Number(price).toFixed(2)
			}
		},
		props: {
			item: {
				type: Object,
				default: {}
			}
		}
	}
</script>

<style lang="less">
	.goods-item {
		display: flex;
		padding: 10px 5px;
		border-bottom: 1px solid #f0f0f0;
		.goods-item-left {
			margin-right: 5px;
			.goods-pic {
				width: 100px;
				height: 100px;
				display: block;
			}
		}
		.goods-item-right {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.goods-name {
				font-size: 13px;
			}
			.goods-info-box {
				.goods-price {
					color: #c00000;
					font-size: 16px;
				}
			}
		}
	}
</style>