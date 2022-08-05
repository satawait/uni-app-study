<template>
	<view class="search">
		<uni-search-bar @input="input" radius="100" cancelButton="none" placeholder="搜索" :focus="true"></uni-search-bar>
	</view>
	<view v-if="searchResults.length" class="sugg-list">
		<view class="sugg-item" v-for="(item, index) in searchResults" :key="index" @click="goToDetail(item)">
			<view class="goods-name">
				{{ item.goods_name }}
			</view>
			<uni-icons type="forward" size="16"></uni-icons>
		</view>
	</view>
	<view v-else class="history-box">
		<view class="history-title">
			<text>搜索历史</text>
			<uni-icons type="trash" size="17" @click="removeHistory"></uni-icons>
		</view>
		<view class="history-list">
			<uni-tag :text="item" v-for="(item, index) in histories" :key="index" @click="goToList(item)"></uni-tag>
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
				searchResults: [],
				historyList: []
			};
		},
		computed: {
			histories() {
				return [...this.historyList].reverse()
			}
		},
		onLoad() {
			this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
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
					this.saveSearchHistory()
				})
			},
			goToDetail(item) {
				uni.navigateTo({
					url: `/subpkg/goodsDetail/goodsDetail?goods_id=${item.goods_id}`
				})
			},
			saveSearchHistory() {
				const historyList = new Set(this.historyList)
				historyList.delete(this.keyword)
				historyList.add(this.keyword)
				this.historyList = Array.from(historyList)
				uni.setStorageSync('kw', JSON.stringify(this.historyList))
			},
			removeHistory() {
				this.historyList = []
				uni.setStorageSync('kw', '[]')
			},
			goToList(kw) {
				uni.navigateTo({
					url: `/subpkg/goodsList/goodsList?query=${kw}`
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
	.uni-searchbar {
		background-color: #c00000;
	}
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
.history-box {
	padding: 0 5px;
	.history-title {
		display: flex;
		justify-content: space-between;
		height: 40px;
		align-items: center;
		font-size: 13px;
		border-bottom: 1px solid #efefef;
	}
	.history-list {
		display: flex;
		flex-wrap: wrap;
	}
}
.uni-tag {
	margin-top: 5px;
	margin-right: 5px;
	display: flex;
	background-color: #efefef!important;
	border-color: #efefef!important;
	color: #000!important;
}
</style>
