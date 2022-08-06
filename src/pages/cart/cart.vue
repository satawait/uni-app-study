<template>
	<view class="empty" v-if="!info">
		<image src="../../static/logo.png" class="empty-img"></image>
		<text class="empty-tip">空空如也~</text>
	</view>
	<view class="cart" v-else>
		<myAddress></myAddress>
		<view class="cart-title">
			<uni-icons type="shop" size="18"></uni-icons>
			<text class="cart-title-text">购物车</text>
		</view>
		<view class="cart-list">
			<uni-swipe-action>
				<view class="cart-item" v-for="(item, index) in cart" :key="index">
					<uni-swipe-action-item :right-options="options" @click="deleteCart(item)">
						<myGoods :item="item" :showRadio="true" :showNums="true" @checkRadio="checkRadio" @changeNums="changeNums"></myGoods>
					</uni-swipe-action-item>
				</view>
			</uni-swipe-action>
		</view>
		<mySettle></mySettle>
	</view>
</template>

<script lang="ts">
	import { mapState, mapActions, mapGetters } from 'vuex'
	import useInfo from '@/composables/useInfo'
	export default {
		data() {
			return {
				options:[
					{
						text: '删除',
						style: {
							backgroundColor: '#c00000'
						}
					}
				]
			};
		},
		computed: {
			...mapState('m_cart', ['cart']),
			...mapGetters('m_cart', ['info'])
		},
		methods: {
			checkRadio(item) {
				this.changeCartState(item)
			},
			changeNums(obj) {
				this.changeCartNums(obj)
			},
			deleteCart(item) {
				this.deleteCart(item)
			},
			...mapActions('m_cart', ['changeCartState', 'changeCartNums', 'deleteCart'])
		}
	}
	
</script>
<script lang="ts" setup>
	useInfo()
</script>

<style lang="less">
.empty {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 150px;
	.empty-img {
		width: 90px;
		height: 90px;
	}
	.empty-tip {
		font-size: 12px;
		color: gray;
		margin-top: 15px;
	}
}
.cart {
	padding-bottom: 50px;
}
.cart-title {
	height: 40px;
	display: flex;
	align-items: center;
	padding-left: 5px;
	border-bottom: 1px solid #efefef;
	.cart-title-text {
		font-size: 14px;
		margin-left: 10px;
	}
}
</style>
