<template>
	<view class="my">
		<myLogin v-if="!token"></myLogin>
		<myUserInfo v-else></myUserInfo>
	</view>
</template>

<script lang="ts">
	import { mapState } from 'vuex'
	import useInfo from '@/composables/useInfo'
	export default {
		data() {
			return {
				
			};
		},
		computed: {
			...mapState('m_cart', ['token'])
		}
	}
</script>
<script lang="ts" setup>
	useInfo()
</script>

<style lang="less">
page, .my {
	height: 100%;
}
</style>
