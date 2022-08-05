<template>
	<view class="goods-list">
		<view v-for="(item, index) in goodsList" :key="index" @click="goToDetail(item)">
			<myGoods :item="item"></myGoods>
		</view>
	</view>
</template>

<script lang="ts">
	import { getGoodsData } from '@/apis/market'
	export default {
		data() {
			return {
				queryObj: {
					query: '',
					cid: '',
					pagesize: 10,
					pagenum: 1
				},
				goodsList: [],
				total: 0
			};
		},
		onLoad(options) {
			this.queryObj.query = options.query || ''
			this.queryObj.cid = options.cid || ''
			this.getData()
		},
		methods: {
			getData(cb?: Function) {
				getGoodsData(this.queryObj).then(res => {
					this.goodsList = [...this.goodsList, ...res.message.goods]
					this.total = res.message.total
					cb && cb()
				})
			},
			goToDetail(item) {
				uni.navigateTo({
					url: `/subpkg/goodsDetail/goodsDetail?goods_id=${item.goods_id}`
				})
			}
		},
		onReachBottom() {
			if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total) {
				return
			}
			this.queryObj.pagenum = this.queryObj.pagenum + 1
			this.getData()
		},
		onPullDownRefresh() {
			this.queryObj.pagenum = 1
			this.total = 0
			this.goodsList = []
			this.getData(() => {
				uni.stopPullDownRefresh()
			})
		}
	}
</script>

<style lang="less">
</style>
