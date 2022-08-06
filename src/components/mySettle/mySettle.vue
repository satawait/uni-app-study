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
	export default {
		name:"mySettle",
		data() {
			return {
				
			};
		},
		computed: {
			...mapGetters('m_cart', ['checkedInfo', 'checkedPrice', 'fullChecked']),
			...mapState('m_cart', ['address', 'auth'])
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
				if (!this.auth) {
					return uni.showToast({
						title: '请先登录',
						icon: 'none'
					})
				}
			},
			...mapActions('m_cart', ['updateAllState'])
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