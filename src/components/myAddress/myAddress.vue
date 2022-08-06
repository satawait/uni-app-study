<template>
	<view class="my-address">
		<view class="address" v-if="!address.userName">
			<button type="primary" size="mini" class="address-btn" @click="chooseAddress">请选择收获地址+</button>
		</view>
		<view class="address-info" v-else @click="chooseAddress">
			<view class="row1">
				<view class="row1-left">
					<view class="user-name">
						收货人：{{ address.userName }}
					</view>	
				</view>
				<view class="row1-right">
					<view class="phone">
						电话：{{ address.telNumber }}
					</view>
					<uni-icons type="forward" size="16"></uni-icons>
				</view>
			</view>
			<view class="row2">
				<view class="row2-left">
					收货地址：
				</view>
				<view class="row2-right">
					{{ `${address.provinceName}${address.cityName}${address.countyName}${address.detailInfo}` }}
				</view>
			</view>
		</view>
		<image src="/static/cart_border@2x.png" class="address-image"></image>
	</view>
</template>

<script lang="ts">
	import { mapActions, mapState } from 'vuex'
	export default {
		name:"myAddress",
		data() {
			return {
			};
		},
		computed: {
			...mapState('m_cart', ['address'])
		},
		methods: {
			chooseAddress() {
				// uni.getSetting({
				// 	success: (result)=>{
				// 		console.log(result)
				// 		//2 获取权限状态 当属性名比较怪异时，都要使用[]形式来获取属性值
				// 		const scopeAddress = result.authSetting['scope.address']
				// 		if(scopeAddress ==true ||scopeAddress ==undefined){
				uni.chooseAddress({
					success: (res)=>{
						console.log(res)
						this.saveAddress(res)
					},
					fail(res) {
						console.log(res)
					}
				})
				// 		}
				//    },
				//    fail: (res) => {
				//    	console.log(res)
				//    }
				// })
			},
			...mapActions('m_cart', ['saveAddress'])
		}
	}
</script>

<style lang="less">
	.address {
		height: 90px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.address-info {
		font-size: 12px;
		height: 90px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 0 5px;
		.row1 {
			display: flex;
			justify-content: space-between;
			.row1-right {
				display: flex;
				justify-content: space-between;
			}
		}
		.row2 {
			display: flex;
			align-items: center;
			margin-top: 10px;
			.row2-left {
				white-space: nowrap;
			}
			.row2-right {
				
			}
		}
	}
.address-image {
	display: block;
	width: 100%;
	height: 5px;
}
</style>