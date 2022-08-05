<template>
	<view class="goods-detail" v-if="goodsDetail.goods_name">
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item, index) in goodsDetail.pics" :key="index">
				<image :src="item.pics_big" @click="preview(index)"></image>
			</swiper-item>
		</swiper>
		<view class="goods-info-box">
			<view class="goods-price">
				￥{{ goodsDetail.goods_price }}
			</view>
			<view class="goods-info">
				<view class="goods-name">
					{{ goodsDetail.goods_name }}
				</view>
				<view class="goods-favi">
					<uni-icons type="star" size="18" color="gray"></uni-icons>
					<text>收藏</text>
				</view>
			</view>
			<view class="goods-yf">
				快递：免运费
			</view>
		</view>
		<view class="goods-detail">
			<rich-text :nodes="goodsDetail.goods_introduce"></rich-text>
		</view>
		<view class="goods-nav">
			<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup"  @click="onClick" @buttonClick="buttonClick"></uni-goods-nav>
		</view>
	</view>
</template>

<script lang="ts">
	import { getGoodsDetail } from '@/apis/market'
	import { mapState, mapActions, mapGetters } from 'vuex'
	import { Cart } from '@/store/modules/cart/types'
	export default {
		data() {
			return {
				goodsId: '',
				goodsDetail: {},
				options: [{
					icon: 'shop',
					text: '店铺'
				}, {
					icon: 'cart',
					text: '购物车',
					info: 0
				}],
				buttonGroup: [{
				  text: '加入购物车',
				  backgroundColor: '#ff0000',
				  color: '#fff'
				},
				{
				  text: '立即购买',
				  backgroundColor: '#ffa200',
				  color: '#fff'
				}
				]
			};
		},
		computed: {
			...mapGetters('m_cart', ['info'])
		},
		watch: {
			info: {
				handler: function(val) {
					const findResults = this.options.find(x => x.text === '购物车')
					console.log(findResults)
					findResults && (findResults.info = val)
				},
				 immediate: true
			}
		},
		onLoad(options) {
			this.goodsId = options.goods_id
			this.getData()
		},
		methods: {
			getData() {
				getGoodsDetail({
					goods_id: this.goodsId
				}).then(res => {
					const goodsDetail = res.message
					goodsDetail.goods_introduce = goodsDetail.goods_introduce.replace(/<img /g, '<img style="display: block;" ')	
					this.goodsDetail = goodsDetail
				})
			},
			preview(i) {
				uni.previewImage({
					urls: this.goodsDetail.pics.map(item => item.pics_big),
					current: i
				})
			},
			onClick (e) {
				if (e.content.text === '购物车') {
					uni.switchTab({
						url: '/pages/cart/cart'
					})
				}
		  },
		  buttonClick (e) {
				console.log(e)
				if (e.content.text === '加入购物车') {
					const goods = {
						goods_id: this.goodsDetail.goods_id,
						goods_name: this.goodsDetail.goods_name,
						goods_count: 1,
						goods_small_logo: this.goodsDetail.goods_small_logo,
						goods_state: true,
						goods_price: this.goodsDetail.goods_price
						
					}
					this.addCart(goods)
				}
		  },
		  ...mapActions('m_cart', ['addCart'])
		}
	}
</script>

<style lang="less">
.goods-detail {
	padding-bottom: 50px;
}
swiper {
	height: 750rpx;
	image {
		width: 100%;
		height: 100%;
	}
}
.goods-info-box {
	padding: 10px;
	padding-right: 0;
	.goods-price {
		color: #c00000;
		font-size: 18px;
		margin: 10px 0;
	}
	.goods-info {
		display: flex;
		justify-content: space-between;
		.goods-name {
			font-size: 13px;
			margin-right: 10px;
		}
		.goods-favi {
			width: 120px;
			font-size: 12px;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			border-left: 1px solid #efefef;
			color: gray;
		}
	}
	.goods-yf {
		font-size: 12px;
		color: gray;
		margin: 10px 0;
	}
}
.goods-nav {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
}
</style>
