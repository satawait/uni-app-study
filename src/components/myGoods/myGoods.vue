<template>
	<view class="goods-item">
		<view class="goods-item-left">
			<radio v-if="showRadio" :checked="item.goods_state" color="#c00000" @click="checkRadio"></radio>
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
				<uni-number-box v-if="showNums" :min="1" :value="count" @blur="blurChange" @change="changeNums"></uni-number-box>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	export default {
		name:"myGoods",
		data() {
			return {
				count: 1,
				defaultPic: 'http://image5.suning.cn/uimg/b2c/newcatentries/0000000000-000000000193373779_1_400x400.jpg'
			};
		},
		watch: {
			item: {
				handler: function (val) {
					if (val) {
						this.count = val?.goods_count || 1
					}
				},
				immediate: true
			}
		},
		methods: {
			toFixed(price) {
				return Number(price).toFixed(2)
			},
			checkRadio() {
				this.$emit('checkRadio', this.item)
			},
			blurChange(e) {
				let value = e.detail.value
				if (isNaN(value)) {
					value = 1
					this.$emit('changeNums', {
						id: this.item.goods_id,
						num: value
					})
				}
			},
			changeNums(e) {
				this.$emit('changeNums', {
					id: this.item.goods_id,
					num: e
				})
			}
		},
		props: {
			item: {
				type: Object,
				default: () => {
					return {}
				}
			},
			showRadio: {
				type: Boolean,
				default: false
			},
			showNums: {
				type: Boolean,
				default: false
			}
		}
	}
</script>

<style lang="less">
	.goods-item {
		width: 750rpx;
		box-sizing: border-box;
		display: flex;
		padding: 10px 5px;
		border-bottom: 1px solid #f0f0f0;
		.goods-item-left {
			margin-right: 5px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.goods-pic {
				width: 100px;
				height: 100px;
				display: block;
			}
		}
		.goods-item-right {
			display: flex;
			flex: 1;
			flex-direction: column;
			justify-content: space-between;
			.goods-name {
				font-size: 13px;
			}
			.goods-info-box {
				display: flex;
				justify-content: space-between;
				align-items: center;
				.goods-price {
					color: #c00000;
					font-size: 16px;
				}
			}
		}
	}
</style>