<template>
	<view class="cart">
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
	</view>
</template>

<script lang="ts">
	import { mapState, mapActions} from 'vuex'
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
			...mapState('m_cart', ['cart'])
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
