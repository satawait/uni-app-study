<template>
	<view class="search">
		<uni-search-bar @input="input" radius="100" cancelButton="none" placeholder="搜索" :focus="true"></uni-search-bar>
	</view>
	<view class="sugg-list">
		<view class="sugg-item" v-for="(item, index) in searchResults" :key="index" @click="goToDetail(item)">
			<view class="goods-name">
				{{ item.goods_name }}
			</view>
			<uni-icons type="forward" size="16"></uni-icons>
		</view>
	</view>
</template>

<script lang="ts">
	import { search } from '@/apis/market'
	export default {
		data() {
			return {
				timer: null,
				keyword: '',
				searchResults: []
			};
		},
		methods: {
			input(e) {
				clearTimeout((this.timer))
				this.timer = setTimeout(() => {
					this.keyword = e
					this.getSearchList()
				}, 500)
			},
			getSearchList() {
				if (!this.keyword) {
					this.searchResults = []
					return
				}
				search({
					query: this.keyword
				}).then(res => {
					this.searchResults = res.message
				})
			},
			goToDetail(item) {
				uni.navigateTo({
					url: `/subpkg/goodsDetail/goodsDetail?goods_id=${item.goods_id}`
				})
			}
		}
	}
</script>

<style lang="less">
.search {
	position: sticky;
	top: 0;
	z-index: 9999;
}
.sugg-list {
	padding: 0 5px;
	.sugg-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 12px;
		padding: 13px 0;
		border-bottom: 1px solid #efefef;
		.goods-name {
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}
}
</style>
