<template>
	<view class="my-settle">
		<label class="radio" @click="changeAllState">
			<radio :checked="fullChecked" color="#c00000" /><text>全选</text>
		</label>
		<view class="ammount">
			合计：<text class="ammount-text">￥{{ checkedPrice }}</text>
		</view>
		<view class="settle-btn" @click="settle">
			结算({{ checkedInfo }})
		</view>
	</view>
</template>

<script lang="ts">
	import { mapGetters, mapActions, mapState } from 'vuex'
	import { orderCreate, reqPayment, checkOrder } from '@/apis/market'
	export default {
		name:"mySettle",
		data() {
			return {
				second: 3,
				timer: null
			};
		},
		computed: {
			...mapGetters('m_cart', ['checkedInfo', 'checkedPrice', 'fullChecked']),
			...mapState('m_cart', ['address', 'token', 'cart'])
		},
		methods: {
			changeAllState() {
				this.updateAllState(!this.fullChecked)
			},
			settle() {
				if (!this.checkedInfo) {
					return uni.showToast({
						title: '请选择要结算的商品',
						icon: 'none'
					})
				}
				if (!this.address.userName) {
					return uni.showToast({
						title: '请选择收获地址',
						icon: 'none'
					})
				}
				if (!this.token) {
					return this.navigateLogin(this.second)
				}
				this.payOrder()
			},
			navigateLogin(n) {
				uni.showToast({
					title: `请登录后再结算，${n}秒后跳转登录`,
					icon: 'none',
					duration: 1500,
					mask: true
				})
				this.timer = setInterval(() => {
					n--
					if (n <= 0) {
						clearInterval(this.timer)
						uni.switchTab({
							url: '/pages/my/my',
							success: () => {
								this.updateRedirectInfo({
									openType: 'switchTab',
									from: '/pages/cart/cart'
								})
							}
						})
						return
					}
					uni.showToast({
						title: `请登录后再结算，${n}秒后跳转登录`,
						icon: 'none',
						duration: 1500,
						mask: true
					})
				}, 1000)
			},
			payOrder() {
				// 创建订单
				const orderInfo = {
					order_price: 0.01,
					consignee_addr: this.address.cityName,
					goods: this.cart.filter(x => x.goods_state).map(x => {
						return {
							goods_id: x.goods_id,
							goods_number: x.goods_count,
							goods_price: x.goods_price
						}
					})
				}
				orderCreate(orderInfo).then(res => {
					// 订单预支付
					const order_number = res.message.order_number
					reqPayment({
						order_number
					}).then(res2 => {
						const payInfo = res2.message.pay
						const params = {
							...payInfo
						}
						console.log(params)
						// 微信支付
						uni.requestPayment({
							provider: 'wxpay',
							...params,
							success: (res3) => {
								// 查询支付结果
								checkOrder({
									order_number
								}).then(res4 => {
									uni.showToast({
										title: '订单支付成功',
										icon: 'success'
									})
								}).catch(e => {
									uni.showToast({
										title: '订单未支付',
										icon: 'none'
									})
								})
							},
							fail: (res) => {
								console.log(res)
								uni.showToast({
									title: '订单未支付',
									icon: 'none'
								})
							}
						})
					})
				})
			},
			...mapActions('m_cart', ['updateAllState', 'updateRedirectInfo'])
		}
	}
</script>

<style lang="less">
.my-settle {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 50px;
	background-color: white;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 14px;
	padding-left: 5px;
	.radio {
		display: flex;
		align-items: center;
	}
	.ammount {
		color: #c00000;
		font-weight: bold;
		.ammount-text {
			
		}
	}
	.settle-btn {
		background-color: #c00000;
		height: 50px;
		padding: 0 10px;
		line-height: 50px;
		text-align: center;
		color: white;
		min-width: 100px;
	}
}
</style>