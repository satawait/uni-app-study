<template>
	<view class="my">
		<myLogin v-if="!auth"></myLogin>
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
			...mapState('m_cart', ['auth'])
		}
	}
</script>
<script lang="ts" setup>
	useInfo()
</script>

<style>

</style>
