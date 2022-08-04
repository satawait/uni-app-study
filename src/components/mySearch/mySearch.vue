<template>
	<view class="my-search-container" :style="`background-color: ${bgColor}`" @click="goToSearch">
		<view class="my-search-box" :style="`border-radius: ${radius}px`">
			<uni-icons type="search" size="17"></uni-icons>
			<text class="placeholder">搜索</text>
		</view>
	</view>
</template>

<script lang="ts">
	export default {
		name:"mySearch",
		data() {
			return {
				
			};
		},
		props: {
			bgColor: {
				type: String,
				default: '#c00000'
			},
			radius: {
				type: Number,
				default: 18
			}
		},
		methods: {
			goToSearch() {
				this.$emit('goToSearch')
			}
		}
	}
</script>

<style lang="less">
	.my-search-container {
		height: 50px;
		display: flex;
		align-items: center;
		padding: 0 10px;
		.my-search-box {
			height: 36px;
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			background-color: #fff;
			.placeholder {
				font-size: 15px;
				margin-left: 5px;
			}
		}
	}
</style>